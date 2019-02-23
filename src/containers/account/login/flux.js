import { createActions, createAction, handleActions } from 'redux-actions'
import { config } from '../../../config'

const { api_url } = process.env.NODE_ENV === 'production' ? config['prod'] : config['dev']
const loginState = {
	token: null,
	error: null,
	status: false,
	loggedIn: false,
	user: {}
}

/**
 * All default constant's
 */
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR_CLEAR = 'LOGIN_ERROR_CLEAR'

/**
 * All Action creators
 */
const { login, loginSuccess, loginFail, logoutFail } = createActions(LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_FAIL)
export const loginErrorClear = createAction(LOGIN_ERROR_CLEAR)
const logout = createAction(LOGOUT)
export const loginAction = (data) => {
	return (dispatch, state, { axios, localforage }) => {
		if (!state().login.status) {
			dispatch(login())
			return axios
				.post(`${api_url}/auth/login`, data)
				.then((res) => {
					const { status } = res
					if (status === 200) {
						return localforage
							.setItem('auth_login_token', res.data.token)
							.then(() => {
								return dispatch(loginSuccess(res))
							})
							.catch((err) => {
								return dispatch(loginFail(res.data.data.response))
							})
					} else {
						return dispatch(loginFail(res.data.data.response))
					}
				})
				.catch((err) => {
					return dispatch(loginFail(err.response))
				})
		} else {
			return false
		}
	}
}
export const logoutAction = () => {
	return (dispatch, state, { localforage }) => {
		if (state().login.loggedIn) {
			try {
				return localforage.removeItem('auth_login_token').then(() => {
					return dispatch(logout())
				})
			} catch (e) {
				return dispatch(logoutFail(e.message))
			}
		}
	}
}

/**
 * All Action creators reducer's
 */
export const loginReducer = handleActions(
	{
		LOGIN: (state, action) => ({
			...state,
			status: true
		}),
		LOGIN_SUCCESS: (state, action) => ({
			...state,
			status: false,
			loggedIn: true,
			user: action.payload.data.user,
			token: action.payload.data.token
		}),
		LOGIN_FAIL: (state, action) => ({
			status: false,
			loggedIn: false,
			token: null,
			error: action.payload.data.message
		}),
		LOGOUT_FAIL: (state, action) => ({
			...state,
			error: action.payload.data.message
		}),
		LOGOUT: (state, action) => {
			return {
				...state,
				loggedIn: false,
				status: false,
				user: {},
				token: null,
				error: null
			}
		},
		LOGIN_ERROR_CLEAR: (state, action) => ({
			...state,
			error: null,
			token: null
		})
	},
	loginState
)

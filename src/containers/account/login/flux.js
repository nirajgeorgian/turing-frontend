import { createActions, handleActions } from 'redux-actions'
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
export const { login, loginSuccess, loginFail, logoutFail, loginErrorClear, logout } = createActions(
	LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_FAIL,
	LOGIN_ERROR_CLEAR,
	LOGOUT
)
export const loginAction = (data) => {
	return (dispatch, state, { simpleAxios, localforage }) => {
		if (!state().login.status) {
			dispatch(login())
			return simpleAxios
				.post('auth/login', data)
				.then((res) => {
					const { status } = res
					if (status === 200) {
						return localforage
							.setItem('auth_login_token', res.data.customer.token)
							.then(() => {
								return dispatch(loginSuccess(res))
							})
							.catch((err) => {
								return dispatch(loginFail({ data: { message: err.message } }))
							})
					} else {
						return dispatch(loginFail(res))
					}
				})
				.catch((err) => {
					return dispatch(loginFail(err.response))
				})
		} else {
			return dispatch(loginFail({ data: { message: 'Login Error. Please Refresh and try again' } }))
		}
	}
}
export const logoutAction = () => {
	return (dispatch, state, { localforage }) => {
		if (state().login.loggedIn) {
			try {
				localforage.removeItem('auth_login_token').then(() => {
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
		LOGIN: (state) => ({
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
			...state,
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

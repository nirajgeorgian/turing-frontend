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
export const loginAction = (values) => {
	return async (dispatch, state, { simpleAxios, localforage }) => {
		if (!state().login.status) {
			dispatch(login())
			const { status, data } = await simpleAxios.post('auth/login', values)
			if (status === 200) {
				await localforage.setItem('auth_login_token', data.customer.token)
				dispatch(loginSuccess({ data }))
			} else {
				dispatch(loginFail({ data }))
			}
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

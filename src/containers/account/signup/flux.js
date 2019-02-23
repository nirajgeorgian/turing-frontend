import { createActions, createAction, handleActions } from 'redux-actions'
import { config } from '../../../config'

const { api_url, api_version } = process.env.NODE_ENV === 'production' ? config['prod'] : config['dev']
const signupState = {
	signedUp: false,
	user: null,
	error: null,
	status: false
}

/**
 * All default constant's
 */
export const SIGNUP = 'SIGNUP'
export const SIGNUP_FAIL = 'SIGNUP_FAIL'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_ERROR_CLEAR = 'SIGNUP_ERROR_CLEAR'

/**
 * All Action creators
 */
const { signup, signupSuccess, signupFail } = createActions(SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL)
export const signupErrorClear = createAction(SIGNUP_ERROR_CLEAR)
export const signupAction = (data) => {
	return (dispatch, state, { axios }) => {
		if (!state().signup.state) {
			dispatch(signup())
			return axios
				.post(`${api_url}/${api_version}/auth/signup`, data)
				.then((res) => {
					if (res.status === 201) {
						return dispatch(signupSuccess(res))
					} else {
						return dispatch(signupFail(res))
					}
				})
				.catch((err) => {
					return dispatch(signupFail(err.response))
				})
		} else {
			return false
		}
	}
}

/**
 * All Action creators reducer's
 */
export const signupReducer = handleActions(
	{
		SIGNUP: (state, action) => ({
			...state,
			status: true
		}),
		SIGNUP_SUCCESS: (state, action) => ({
			...state,
			status: false,
			signedUp: true,
			user: action.payload.data.email,
			error: null
		}),
		SIGNUP_FAIL: (state, action) => ({
			...state,
			status: false,
			signedUp: false,
			error: action.payload.data.message
		}),
		SIGNUP_ERROR_CLEAR: (state, action) => ({
			...state,
			error: null,
			signedUp: false,
			user: null
		})
	},
	signupState
)

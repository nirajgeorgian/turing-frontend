import { createActions, handleActions } from 'redux-actions'
const searchState = {
	status: false,
	product: null,
	error: null
}

/**
 * All default constant's
 */
export const SEARCH = 'SEARCH'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAIL = 'SEARCH_FAIL'

/**
 * All Action creators
 */
export const { search, searchSuccess, searchFail } = createActions(SEARCH, SEARCH_SUCCESS, SEARCH_FAIL)
export const searchAction = (searchTerm) => {
	return async (dispatch, _, { simpleAxios }) => {
		dispatch(search())
		const { status, data } = await simpleAxios.get(`search?term=${searchTerm}`)
		if (status === 200) {
			dispatch(searchSuccess({ data }))
		} else {
			dispatch(searchSuccess({ data: { message: 'Server failed to search ...' } }))
		}
	}
}

/**
 * All Action creators reducer's
 */
export const searchReducer = handleActions(
	{
		SEARCH: (state) => ({
			...state,
			status: true
		}),
		SEARCH_ERROR: (state, action) => ({
			...state,
			status: false,
			error: action.payload.data.message
		}),
		SEARCH_SUCCESS: (state, action) => ({
			...state,
			product: action.payload.data.product
		})
	},
	searchState
)

import { createActions, createAction, handleActions } from 'redux-actions'

let productsPath = 'products'
let homeState = {
	products: [],
	error: null,
	status: false,
	pageNo: 0
}

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_FAIL = 'FETCH_PRODUCTS_FAIL'
export const FETCH_ERROR_CLEAR = 'FETCH_ERROR_CLEAR'

const { fetchProducts, fetchProductsSuccess, fetchProductsFail } = createActions(
	FETCH_PRODUCTS,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_PRODUCTS_FAIL
)

export const homeErrorClear = createAction(FETCH_ERROR_CLEAR)
export const homeAction = (page_no) => {
	return async (dispatch, state, { simpleAxios }) => {
		if (!state().home.status) {
			dispatch(fetchProducts())
			const { status, data } = await simpleAxios.get(`${productsPath}?page=${page_no}`)
			if (status === 200) {
				dispatch(fetchProductsSuccess(data.data.products))
			} else {
				dispatch(fetchProductsFail(data))
			}
		} else {
			return false
		}
	}
}

export const homeReducer = handleActions(
	{
		FETCH_PRODUCTS: (state, action) => ({
			...state,
			status: true
		}),
		FETCH_PRODUCTS_SUCCESS: (state, action) => {
			return {
				...state,
				status: false,
				products: action.payload
			}
		},
		FETCH_PRODUCTS_FAIL: (state, action) => {
			return {
				...state,
				error: action.payload.data.message,
				products: [],
				status: false
			}
		}
	},
	homeState
)

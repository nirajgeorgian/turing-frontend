import { createActions, createAction, handleActions } from 'redux-actions'
import { config } from '../../config'

const { api_url, api_version } = process.env.NODE_ENV === 'production' ? config['prod'] : config['dev']
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
export const homeAction = () => {
	return (dispatch, state, { axios }) => {
		if (!state().home.status) {
			dispatch(fetchProducts())
			return axios
				.get(`${api_url}/${api_version}/${productsPath}`)
				.then((res) => {
					let { status } = res
					if (status === 200) {
						return dispatch(fetchProductsSuccess(res.data.products))
					} else {
						return dispatch(fetchProductsFail(res.data.data.response))
					}
				})
				.catch((err) => {
					return dispatch(fetchProductsFail(err.response))
				})
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

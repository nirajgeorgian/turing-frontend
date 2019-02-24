import { createActions, handleActions } from 'redux-actions'

let productPath = ''
let prodcuctState = {
	productId: null,
	error: null,
	status: false,
	productDetail: {}
}

export const FETCH_PRODUCT = 'FETCH_PRODUCT'
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS'
export const FETCH_PRODUCT_FAIL = 'FETCH_PRODUCT_FAIL'

const { fetchProduct, fetchProductSuccess, fetchProductFail } = createActions(
	FETCH_PRODUCT,
	FETCH_PRODUCT_SUCCESS,
	FETCH_PRODUCT_FAIL
)

export const productAction = (productId) => {
	return async (dispatch, state, { simpleAxios }) => {
		if (!state().product.status) {
			dispatch(fetchProduct())
			const { status, data } = await simpleAxios.get()
			if (status === 200) {
				dispatch(fetchProductSuccess(data.data))
			} else {
				dispatch(fetchProductFail(data))
			}
		} else {
			return false
		}
	}
}

export const productReducer = handleActions({
	FETCH_PRODUCT: (state, action) => ({
		...state,
		status: true
	}),
	FETCH_PRODUCT_SUCCESS: (state, action) => {
		return {
			...state,
			status: false,
			productDetail: action.payload
		}
	},
	FETCH_PRODUCT_FAIL: (state, action) => {
		return {
			...state,
			error: action.payload.data.message,
			productDetail: {},
			status: false
		}
	},
	prodcuctState
})

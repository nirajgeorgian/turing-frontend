import { createActions, handleActions } from 'redux-actions'

const cartState = {
	cart: [],
	profile: {},
	stats: false,
	error: null
}

/**
 * All default constant's
 */
export const CART = 'CART'
export const CART_ITEM_UPDATE = 'CART_ITEM_UPDATE'
export const CART_ITEM_DELETE = 'CART_ITEM_DELETE'
export const CART_ITEM_FETCH = 'CART_ITEM_FETCH'
export const CART_ERROR = 'CART_ERROR'
export const CART_ERROR_CLEAR = 'CART_ERROR_CLEAR'

/**
 * All Action creators
 */
export const { cart, cartItemUpdate, cartItemDelete, cartItemFetch, cartError, cartErrorClear } = createActions(
	CART,
	CART_ITEM_UPDATE,
	CART_ITEM_DELETE,
	CART_ITEM_FETCH,
	CART_ERROR,
	CART_ERROR_CLEAR
)
export const getCartAction = () => {
	return async (dispatch, state, { localforage, authAxios }) => {
		if (state().login.loggedIn) {
			dispatch(cart())
			const token = await localforage.getItem('auth_login_token')
			return authAxios(token)
				.get('cart')
				.then((res) => {
					const { status, data } = res
					if (status === 200) {
						return dispatch(cartItemFetch({ data }))
					} else {
						return dispatch(cartError({ data }))
					}
				})
				.catch((err) => {
					return dispatch(cartError(err.response))
				})
		} else {
			return dispatch(cartError({ data: { message: 'Please login to view your cart' } }))
		}
	}
}
export const addToCartAction = (values) => {
	values.buy_now = 'false'
	values.attribute = ''
	values.quantity = 1
	return async (dispatch, state, { localforage, authAxios }) => {
		if (state().login.loggedIn) {
			dispatch(cart())
			const token = await localforage.getItem('auth_login_token')
			return authAxios(token)
				.post(`cart/${values.product_id}`, values)
				.then((res) => {
					const { status, data } = res
					if (status === 200) {
						return dispatch(cartItemUpdate({ data }))
					} else {
						return dispatch(cartError({ data }))
					}
				})
				.catch((err) => {
					return dispatch(cartError(err.response))
				})
		} else {
			return dispatch(cartError({ data: { message: 'Please login to view your cart' } }))
		}
	}
}
export const removeCartAction = (values) => {
	return async (dispatch, state, { localforage, authAxios }) => {
		if (state().login.loggedIn) {
			dispatch(cart())
			const token = await localforage.getItem('auth_login_token')
			return authAxios(token)
				.delete(`cart/${values.product_id}`, { data: values })
				.then((res) => {
					const { status, data } = res
					if (status === 200) {
						return dispatch(cartItemUpdate({ data }))
					} else {
						return dispatch(cartError({ data }))
					}
				})
				.catch((err) => {
					return dispatch(cartError(err.response))
				})
		} else {
			return dispatch(cartError({ data: { message: 'Please login to view your cart' } }))
		}
	}
}
export const incrementCartAction = (values) => {
	values.quantity = values.quantity + 1
	return async (dispatch, state, { localforage, authAxios }) => {
		if (state().login.loggedIn) {
			dispatch(cart())
			const token = await localforage.getItem('auth_login_token')
			return authAxios(token)
				.put(`cart/${values.product_id}`, values)
				.then((res) => {
					const { status, data } = res
					if (status === 200) {
						return dispatch(cartItemUpdate({ data }))
					} else {
						return dispatch(cartError({ data }))
					}
				})
				.catch((err) => {
					return dispatch(cartError(err.response))
				})
		} else {
			return dispatch(cartError({ data: { message: 'Please login to view your cart' } }))
		}
	}
}
export const decrementCartAction = (values) => {
	values.quantity = values.quantity - 1
	return async (dispatch, state, { localforage, authAxios }) => {
		if (state().login.loggedIn) {
			dispatch(cart())
			const token = await localforage.getItem('auth_login_token')
			return authAxios(token)
				.put(`cart/${values.product_id}`, values)
				.then((res) => {
					const { status, data } = res
					if (status === 200) {
						return dispatch(cartItemUpdate({ data }))
					} else {
						return dispatch(cartError({ data }))
					}
				})
				.catch((err) => {
					return dispatch(cartError(err.response))
				})
		} else {
			return dispatch(cartError({ data: { message: 'Please login to view your cart' } }))
		}
	}
}

/**
 * All Action creators reducer's
 */
export const cartReducer = handleActions(
	{
		CART: (state, action) => ({
			...state,
			status: true
		}),
		CART_ERROR: (state, action) => ({
			...state,
			error: action.payload.data.message
		}),
		CART_ITEM_FETCH: (state, action) => ({
			...state,
			status: false,
			cart: action.payload.data.cart
		}),
		CART_ITEM_UPDATE: (state, action) => ({
			...state,
			cart: action.payload.data.cart
		}),
		CART_ITEM_DELETE: (state, action) => ({
			...state,
			cart: action.payload.data.cart
		}),
		CART_ERROR_CLEAR: (state, action) => ({
			...state,
			error: null
		})
	},
	cartState
)

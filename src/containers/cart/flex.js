import { createActions, handleActions } from 'redux-actions'
import { config } from '../../config'

const { api_url, api_version } = process.env.NODE_ENV === 'production' ? config['prod'] : config['dev']
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
	return (dispatch, state, { axios, localforage, simpleAxios }) => {
		if (state().login.loggedIn) {
			dispatch(cart())
			const data = simpleAxios('cart')
			return data
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
console.log('dodo')
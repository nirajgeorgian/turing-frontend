import { createStore, applyMiddleware, combineReducers } from 'redux'
import axios from 'axios'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import localforage from 'localforage'
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { config } from './config'

/**
 * import all reducer's
 */
import { loginReducer } from './containers/account/login/flux'
import { signupReducer } from './containers/account/signup/flux'

import { homeReducer } from './containers/homepage/products/flux'
import { cartReducer } from './containers/cart/flux'
import { productReducer } from './containers/productdetail/flux'
// import { homeReducer } from './containers/homepage/flux'

/**
 * [API_URL, API_VERSION]
 * @type {[url and version]}
 */
const { api_url, api_version } = process.env.NODE_ENV === 'production' ? config['prod'] : config['dev']

/**
 * [Root Reducer]
 * @type {Reducer}
 */
const rootReducer = combineReducers({
	home: homeReducer,
	login: loginReducer,
	signup: signupReducer,
	cart: cartReducer,
	product: productReducer
})

/**
 * [persist-state description]
 * @type {Configuration}
 */
const persistConfig = {
	key: 'dododuck@123',
	storage: localforage,
	blacklist: ['home', 'product'],
	stateReconciler: autoMergeLevel2
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

/**
 * [Thunk utilities]
 * @type {[Axios Instance]}
 */
const API_URL = `${api_url}/${api_version}/`
const simpleAxios = axios.create({
	baseURL: API_URL,
	timeout: 1000,
	headers: { 'Content-Type': 'application/json' }
})
const authAxios = (token) =>
	axios.create({
		baseURL: API_URL,
		timeout: 1000,
		headers: {
			'Content-Type': 'application/json',
			Authorization: token
		}
	})

const store = () => {
	let store = createStore(
		persistedReducer,
		composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ localforage, simpleAxios, authAxios }), logger))
	)
	let persistor = persistStore(store)
	return { store, persistor }
}

export default store()

import { createStore, applyMiddleware, combineReducers } from 'redux'
import axios from 'axios'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import localforage from 'localforage'
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

/**
 * import all reducer's
 */
import { loginReducer } from './containers/account/login/flux'
import { signupReducer } from './containers/account/signup/flux'

/**
 * [Root Reducer]
 * @type {Reducer}
 */
const rootReducer = combineReducers({
	login: loginReducer,
	signup: signupReducer
})

/**
 * [persist-state description]
 * @type {Configuration}
 */
const persistConfig = {
	key: 'dododuck@123',
	storage: localforage,
	blacklist: [],
	stateReconciler: autoMergeLevel2
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = () => {
	let store = createStore(
		persistedReducer,
		composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ axios, localforage }), logger))
	)
	let persistor = persistStore(store)
	return { store, persistor }
}

export default store()

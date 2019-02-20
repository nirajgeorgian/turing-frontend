import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'
import App from './App'
import store from './store'
import Loading from './components/loading'
import * as serviceWorker from './serviceWorker'

render(
	<Provider store={store.store}>
		<PersistGate loading={<Loading size={100} />} persistor={store.persistor}>
			<Router>
				<App />
			</Router>
		</PersistGate>
	</Provider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
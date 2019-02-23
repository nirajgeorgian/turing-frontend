import Loadable from 'react-loadable'
import Loading from '../components/loading'

export const LoadableHome = Loadable({
	loader: () => import('../containers/homepage'),
	loading: Loading,
	delay: 200
})

export const LoadableLogin = Loadable({
	loader: () => import('../containers/account/login'),
	loading: Loading,
	delay: 200
})

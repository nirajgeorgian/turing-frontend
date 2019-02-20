import Loadable from 'react-loadable'
import Loading from '../components/loading'

export const LoadableHome = Loadable({
	loader: () => import('../containers/homepage'),
	loading: Loading,
	delay: 200
})


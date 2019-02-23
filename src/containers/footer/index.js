import React, { Component } from 'react'

class AppFooter extends Component {
	render() {
		return (
			<footer className="page-footer font-small cyan darken-3">
				<div className="footer-copyright text-center py-3">
					© 2018 Copyright:
					<a href="https://mdbootstrap.com/education/bootstrap/" title="Ecommerce">
						{' '}
						Ecommerce
					</a>
				</div>
			</footer>
		)
	}
}

export default AppFooter

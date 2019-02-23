import React, { PureComponent } from 'react'

class AppFooter extends PureComponent {
	render() {
		return (
			<footer className="footer text-muted text-center mt-auto py-3">
				<div className="container">
					<p>© 2018 Copyright: Ecommerce</p>
					<ul className="list-inline">
						<li className="list-inline-item">
							<a href="/privacy">Privacy</a>
						</li>
						<li className="list-inline-item">
							<a href="/terms">Terms</a>
						</li>
						<li className="list-inline-item">
							<a href="/supprt">Support</a>
						</li>
					</ul>
				</div>
			</footer>
		)
	}
}

export default AppFooter

import React from 'react'
import PropTypes from 'prop-types'

import AltButton from '../../components/UIs/button'

const CartItems = ({ cart, onDelete, onIncrease, onDecrease }) => {
	if (cart.length > 0) {
		return cart.map((item, index) => (
			<div key={index}>
				<li className="list-group-item d-flex justify-content-between lh-condensed">
					<div>
						<h6 className="my-0">{item.product.name}</h6>
						<small className="text-muted">
							{item.product.description.length > 150
								? item.product.description.substring(0, 150) + ' ...'
								: item.product.description}
						</small>
					</div>
					<div>
						<h6 className="text-muted">${item.product.price}</h6>
						Quan: <strong>{item.quantity}</strong>
					</div>
				</li>
				<div className="list-group-item d-flex justify-content-between lh-condensed">
					<AltButton color="danger" size="sm" onClick={() => onDelete(item)}>
						Remove Item
					</AltButton>
					<AltButton color="primary" size="sm" onClick={() => onIncrease(item)}>
						Add Another
					</AltButton>
					<AltButton color="primary" size="sm" onClick={() => onDecrease(item)}>
						Remove One
					</AltButton>
				</div>
				<hr className="mb-3" />
			</div>
		))
	} else {
		return null
	}
}

const { array, func } = PropTypes
CartItems.propTypes = {
	cart: array.isRequired,
	onDelete: func.isRequired
}

export default CartItems

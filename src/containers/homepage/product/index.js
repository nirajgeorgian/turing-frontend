import React from 'react'

const Item = ({ name, ...props }) => {
	return <div>{name}</div>
}

export default Item

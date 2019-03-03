import { createActions, handleActions } from 'redux-actions'

let filterState = {
	department: '',
	category: ''
}

export const SET_DEPARTMENT = 'SET_DEPARTMENT'
export const SET_CATEGORY = 'SET_CATEGORY'

export const { setDepartment, setCategory } = createActions(SET_DEPARTMENT, SET_CATEGORY)

export const filterReducer = handleActions(
	{
		SET_DEPARTMENT: (state, action) => ({
			...state,
			department: action.payload.data
		}),
		SET_CATEGORY: (state, action) => ({
			...state,
			category: action.payload.data
		})
	},
	filterState
)

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { dataReducer } from './reducers/dataReducer'

const rootReducer = combineReducers({
    data: dataReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))
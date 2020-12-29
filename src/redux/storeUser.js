import {createStore} from 'redux'
import userReducer from './User/userReducer'

const storeUser = createStore(userReducer)

export default storeUser
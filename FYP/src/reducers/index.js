import {combineReducers} from 'redux'
import cartItems from './cartItems'
import billItems from './billItems'
import seatingInformation from './seatingInformation'
import prefix from './prefix'
import user from './user'

export default combineReducers({
    cartItems,
    billItems,
    seatingInformation,
    prefix,
    user
})
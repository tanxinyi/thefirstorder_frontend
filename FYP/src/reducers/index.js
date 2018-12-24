import {combineReducers} from 'redux'
import cartItems from './cartItems'
import billItems from './billItems'
import seatingInformation from './seatingInformation'

export default combineReducers({
    cartItems,
    billItems,
    seatingInformation
})
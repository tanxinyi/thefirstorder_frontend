let info = {
    seatingTable: {},
    restaurant: {},
    menu: {},
    orderId: '',
    orderSummaryId: ''
}

const seatingInformation = (state = info, action) => {
    switch(action.type){
        case 'UPDATE_SEATING_TABLE':
            state.seatingTable = action.payload
            return state
        case 'UPDATE_RESTAURANT':
            state.restaurant = action.payload
            return state
        case 'UPDATE_MENU':
            state.menu = action.payload
            return state
        case 'UPDATE_ORDER_ID':
            state.orderId = action.payload
            return state
        case 'UPDATE_ORDER_SUMMARY_ID':
            state.orderSummaryId = action.payload
            return state
    }
    return state
}

export default seatingInformation
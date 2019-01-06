const cartItems = (state = [], action) =>{
    switch(action.type){
        case 'ADD_TO_CART':
            return [...state, action.payload]
        case 'REMOVE_FROM_CART':
            return state.filter(cartItem => cartItem.id !== action.payload.id)
        case 'CLEAR_CART':
            return []
        case 'INCREASE_QUANTITY':
            var newState = []
            for(var i = 0; i < state.length; i++ ){
                var cartItem = state[i];
                if(cartItem.id == action.payload.id){
                    cartItem.customerOrderQuantity = cartItem.customerOrderQuantity + 1;
                }
                newState = [...newState, cartItem]
            }
            return newState
        case 'DECREASE_QUANTITY':
            var newState = []
            for(var i = 0; i < state.length; i++ ){
                var cartItem = state[i];
                if(cartItem.id == action.payload.id){
                    var test = cartItem.customerOrderQuantity - 1;
                    if(test < 1) test = 1;
                    cartItem.customerOrderQuantity = test;
                }
                newState = [...newState, cartItem]
            }
            return newState
    }
    return state
}

export default cartItems
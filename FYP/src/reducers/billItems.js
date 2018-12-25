const billItems = (state = [], action) =>{
    switch(action.type){
        case 'ADD_TO_BILL':
            return state.concat(action.payload)
    }
    return state
}

export default billItems
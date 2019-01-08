const user = (state = {}, action) =>{
    switch(action.type){
        case 'LOG_IN':
            return action.payload
        case 'LOG_OUT':
            return {}
    }
    return state
}

export default user
const initState = {
    login : false,
    token : null
}

const userReducer = (state = initState, action) => {
    const token = action.token;
    switch(action.type){
        case 'LOGIN' : 
            return {...state,login: true,token : token}
        case 'LOGOUT':
            return {...state,login: false,token: null}
        default: return state;
    }
}

export default userReducer;
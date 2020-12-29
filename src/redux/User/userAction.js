export const login = (token) => {
    return {
        token: token,
        type : 'LOGIN'
    }
}

export const logout = () => {
    return {
        type : 'LOGOUT'
    }
}
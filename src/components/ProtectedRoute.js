import React from 'react'
import {Redirect, Route} from 'react-router-dom'
function ProtectedRoute({login, component : Component, ...rest}) {

    return (
            <Route 
                {...rest}
                render={() => login ? 
                    (<Component/>) : 
                    (<Redirect to="/login"/>)
                }
            />
    )
}

export default ProtectedRoute

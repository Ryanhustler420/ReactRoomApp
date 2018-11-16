import  React  from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../../../services/auth-service';


const LoggedInRoute = (props) => {

    const {component:Component, ...rest} = props;

    return (
        <Route {...rest} render={(props) => 
            
            authService.isAuthenticated() ?
                <Redirect to={{pathname: '/rentals'}}  /> 
            :
                <Component {...rest} {...props}/>
        }/>
    )
}

export default LoggedInRoute;
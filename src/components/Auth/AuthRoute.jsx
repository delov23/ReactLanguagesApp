import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserConsumer } from '../contexts/userContext';
import handleError from '../../utils/handleError';

const AuthRoute = ({ isLoggedIn, ...propsClone }) => {
        if (!isLoggedIn) {
            handleError('Please, log in!');
            return <Redirect to="/login" />
        }

        return <Route {...propsClone} />
}

const AuthRouteWithCtx = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn }) => {
                    return <AuthRoute {...props} isLoggedIn={isLoggedIn} />
                }
            }
        </UserConsumer>
    )
}

export default AuthRouteWithCtx;
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserConsumer } from '../contexts/userContext';
import handleSuccess from '../../utils/handleSuccess';

const AnonymousRoute = ({ isLoggedIn, ...propsClone }) => {
        if (isLoggedIn) {
            handleSuccess('Logged in!');
            return <Redirect to="/" />
        }

        return <Route {...propsClone} />
}

const AnonymousRouteWithCtx = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn }) => {
                    return <AnonymousRoute {...props} isLoggedIn={isLoggedIn} />
                }
            }
        </UserConsumer>
    )
}

export default AnonymousRouteWithCtx;
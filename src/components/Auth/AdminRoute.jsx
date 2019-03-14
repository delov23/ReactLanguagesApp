import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserConsumer } from '../contexts/userContext';
import handleError from '../../utils/handleError';

const AdminRoute = ({ isLoggedIn, isAdmin, ...propsClone }) => {
        if (!isLoggedIn) {
            handleError('Please, log in!');
            return <Redirect to="/login" />
        } else if (isAdmin === false) {
            handleError('This is adminitrator-only content!');
            return <Redirect to="/" />
        }


        return <Route {...propsClone} />
}

const AdminRouteWithCtx = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn, isAdmin }) => {
                    return <AdminRoute {...props} isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
                }
            }
        </UserConsumer>
    )
}

export default AdminRouteWithCtx;
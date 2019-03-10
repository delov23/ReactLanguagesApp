import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { UserConsumer } from '../contexts/userContext';

const Navigation = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success nav-tabs">
            <Link className="navbar-brand" to="/">
                <img src="https://static.thenounproject.com/png/987-200.png" alt="Logo" width="50px" />
                <span className="navbar-brand-text">Lingo</span>
            </Link>
            {
                props.isLoggedIn
                ? <Fragment>
                    <div className="mr-auto">
                            <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/about">About us</Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="ml-auto">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="#">Profile</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="#">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </Fragment>
                : <div className="ml-auto">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/register">Sign up</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/login">Log in</Link>
                        </li>
                    </ul>
                </div>
            }
        </nav>
    )
}

const NavigationWithCtx = (props) => {
    return (
        <UserConsumer>
            {
                (user) => {
                    console.log(user)
                    return <Navigation {...props} isLoggedIn={!!user.isLoggedIn} />
                }
            }
        </UserConsumer>
    )
}

export default NavigationWithCtx;
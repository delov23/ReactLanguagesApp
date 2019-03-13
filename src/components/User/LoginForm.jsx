import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../data/data';
import handleError from '../../utils/handleError';
import { UserConsumer } from '../contexts/userContext';
import handleSuccess from '../../utils/handleSuccess';

class LoginForm extends Component {
    state = {
        username: '',
        password: '',
        done: false
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { username, password } = this.state;
        api.loginUser(username, password)
        .then((res) => {
            if (res.message !== 'User successfully logged in!') {
                throw new Error(res.message);
            } else {
                sessionStorage.setItem('token', 'jwt ' + res.token);
                sessionStorage.setItem('isAdmin', res.role === 'Admin');
                sessionStorage.setItem('userId', res.userId);
                this.setState({
                    done: true
                });
                this.props.updateUser({
                    isLoggedIn: true,
                    token: 'jwt ' + res.token,
                    isAdmin: res.role === 'Admin',
                    userId: res.userId
                });
            }
        })
        .catch(handleError);
    }

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    render () {
        if (this.state.done) {
            handleSuccess('Logged in!');
            return <Redirect to="/" />
        }

        return (
            <main className="container">
                <img src="https://www.slurp-ramen.com/wp-content/uploads/2017/06/hello.png" alt="Hello" width="40%" style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px', display: 'block'}} />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="username" className="col-form-label-lg">Username</label>
                            <input onChange={this.handleChange} value={this.state.username} type="text" className="form-control col-form-label-lg" id="username" name="username" placeholder="Username" required />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="password" className="col-form-label-lg">Password</label>
                            <input onChange={this.handleChange} value={this.state.password} type="password" className="form-control col-form-label-lg" id="password" name="password" placeholder="Password" required />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-lg btn-block btn-outline-primary">Sign in</button>
                </form>
            </main>
        )
    }
}

const LoginFormWithCtx = (props) => {
    return (
        <UserConsumer>
            {
                (user) => (
                    <LoginForm
                        {...props}
                        isLoggedIn={!!user.isLoggedIn}
                        updateUser={user.updateUser}
                    />
                )
            }
        </UserConsumer>
    )
}

export default LoginFormWithCtx;
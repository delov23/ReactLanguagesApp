import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../data/data';
import handleError from '../../utils/handleError'
import { UserConsumer } from '../contexts/userContext';

class RegisterForm extends Component {
    state = {
        username: '',
        password: '',
        repeatPassword: '',
        firstName: '',
        lastName: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { username, password, repeatPassword, firstName, lastName } = this.state;
        if (password !== repeatPassword) {
            handleError('Passwords must match');
            return;
        }
        api.registerUser(username, password, firstName, lastName)
        .then((res) => {
            if (res.message !== 'User successfully created and logged in!') {
                handleError(res.message);
            } else {
                sessionStorage.setItem('token', 'jwt ' + res.token);
                sessionStorage.setItem('isAdmin', res.role === 'Admin');
                sessionStorage.setItem('userId', res.userId);
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
        return (
            <main className="container">
                <img src="https://www.slurp-ramen.com/wp-content/uploads/2017/06/hello.png" alt="Hello" width="40%" style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px', display: 'block'}} />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="firstName" className="col-form-label-lg">First Name</label>
                            <input onChange={this.handleChange} value={this.state.firstName} type="text" className="form-control col-form-label-lg" id="firstName" name="firstName" placeholder="First Name" required />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="lastName" className="col-form-label-lg">Last Name</label>
                            <input onChange={this.handleChange} value={this.state.lastName} type="text" className="form-control col-form-label-lg" id="lastName" name="lastName" placeholder="Last Name" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username" className="col-form-label-lg">Username</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text col-form-label-lg">@</span>
                            </div>
                            <input onChange={this.handleChange} value={this.state.username} type="username" className="form-control col-form-label-lg" id="username" name="username" placeholder="Username" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="password" className="col-form-label-lg">Password</label>
                            <input onChange={this.handleChange} value={this.state.password} type="password" className="form-control col-form-label-lg" id="password" name="password" placeholder="*****" required />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="repeatPassword" className="col-form-label-lg">Repeat Password</label>
                            <input onChange={this.handleChange} value={this.state.repeatPassword} type="password" className="form-control col-form-label-lg" id="repeatPassword" name="repeatPassword" placeholder="*****" required />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-lg btn-block btn-outline-primary">Sign in</button>
                </form>
            </main>
        )
    }
}

const RegisterFormWithCtx = (props) => {
    return (
        <UserConsumer>
            {
                (user) => (
                    <RegisterForm
                        {...props}
                        isLoggedIn={!!user.isLoggedIn}
                        updateUser={user.updateUser}
                    />
                )
            }
        </UserConsumer>
    )
}

export default RegisterFormWithCtx;
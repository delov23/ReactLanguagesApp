import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import api from '../../data/data';
import handleError from '../../utils/handleError';

class Profile extends Component {
    state = {
        unAuth: false,
        isLoading: true,
        user: null
    }

    componentDidMount() {
        api.getProfile(sessionStorage.getItem('userId'), sessionStorage.getItem('token'))
            .then((res) => {
                if (res.message !== 'User found') {
                    throw new Error(res.message);
                }
                this.setState({
                    user: res.user,
                    isLoading: false
                });
            })
            .catch((err) => {
                handleError(err);
                this.setState({
                    unAuth: true,
                    isLoading: false
                })
            })
    }

    render() {
        if (this.state.isLoading) {
            return <div className="loader"></div>
        } else if (this.state.unAuth) {
            return <Redirect to="/logout" />
        }

        let { user } = this.state;

        return (
            <main className="container">
                <div className="row bg-danger">
                    <div className="col-md-4"><img src="https://cafetalk.com/resources/images/icon/tag/language.png" alt="" width="100%" style={{marginTop: '5%', marginBottom: '5%'}} /></div>
                    <div className="col-md-4 bg-primary">
                        <h1 className="text-center">User information:</h1>
                        <hr />
                        <h2>Name: {user.name}</h2>
                        <h2>@{user.username}</h2>
                    </div>
                    <div className="col-md-4 bg-secondary">
                        <h1 className="text-center">Courses:</h1>
                        <hr />
                        {
                            user.courses.map((course) => {
                                return (
                                    <Link key={course._id} style={{textDecoration: 'none'}} to={'/course/lessons/' + course._id}>
                                       <img className="row-margin" src={course.flag} alt="" width="32%" />
                                       <span> </span>
                                    </Link>
                                );
                            })
                        }
                    </div>
                </div>
            </main>
        )
    }
}

export default Profile;
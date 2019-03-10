import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CoursesHome extends Component {
    state = {
        courses: []
    }

    componentDidMount() {
        fetch('http://localhost:9999/course/all', {
            method: 'GET',
            headers: {
                'Authorization': this.props.user.token,
                'Content-Type': 'application/json'
            }
        })
            .then(raw => raw.json())
            .then(res => {
                this.setState({
                    courses: res.courses
                })
            });
    }
    
    render () {
        return (
            <main className="container">
            {
                this.state.courses.length > 0
                ? 
                <div className="card-deck">
                {
                    this.state.courses.map((course) =>(
                            <div className="card">
                                <img className="card-img-top" alt="Cannot Get Flag" src={course.flag} />
                                <div className="card-body">
                                    <h4 className="card-title text-center">{course.language}</h4>
                                    {
                                        this.props.isAdmin
                                        ?
                                        <Link to={'/course/lessons/' + course._id} className="btn btn-sm btn-block btn-warning">
                                            <h5 className="text-center">{this.props.isAdmin ? 'Remove a lesson' : 'Remove a lesson'}</h5>
                                        </Link>
                                        :
                                        <Link to={'/course/lessons/' + course._id} className="btn btn-sm btn-block btn-success">
                                            <h5 className="text-center">{this.props.isAdmin ? 'Remove a lesson' : 'Enroll now'}</h5>
                                        </Link>
                                    }
                                </div>
                            </div>
                        )
                    )
                }
                </div>
                : 
                <h1>Getting courses...</h1>
            }
            </main>
        )
    }
}

export default CoursesHome;
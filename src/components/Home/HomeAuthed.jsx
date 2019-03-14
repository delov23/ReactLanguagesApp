import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CourseCard from '../Lesson/CourseCard';
import handleError from '../../utils/handleError';
import api from '../../data/data';

class CoursesHome extends Component {
    state = {
        courses3: [],
        isLoading: true,
        unAuth: false
    }

    componentDidMount() {
        api.getAllCourses(sessionStorage.getItem('token'))
            .then(res => {
                let courses3 = [];
                let temp = [];
                for (const course of res.courses) {
                    if (temp.length === 3) {
                        courses3.push(temp);
                        temp = [course];
                    } else {
                        temp.push(course);        
                    }
                }
                if (temp.length > 0)
                courses3.push(temp);
                this.setState({
                    courses3,
                    isLoading: false
                });
            })
            .catch(err => {
                console.error(err);
                handleError('Please, log in to browse the courses.');
                this.setState({
                    isLoading: false,
                    unAuth: true
                });
            });
    }
    
    render () {
        if (this.state.isLoading) {
            return <div className="loader"></div>
        } else if (this.state.unAuth) {
            return <Redirect to="/logout" />
        }
        return (
            <main className="container">
                <h1 className="text-center">Browse the available courses: </h1>
                {
                    this.state.courses3.length > 0   
                    ?
                    this.state.courses3.map((courses) =>(
                        <div className="card-deck">
                        {
                            courses.map((course) => (
                                <CourseCard isAdmin={this.props.isAdmin} course={course} />
                            ))
                        }
                        </div>
                        )
                    )
                    : <h2 className="text-center">No courses added yet.</h2> 
                }
            </main>
        )
    }
}

export default CoursesHome;
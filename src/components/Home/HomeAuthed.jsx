import React, { Component } from 'react';
import CourseCard from '../Lesson/CourseCard';
import handleError from '../../utils/handleError';
import api from '../../data/data';

class CoursesHome extends Component {
    state = {
        courses3: [],
        isLoading: true
    }

    componentDidMount() {
        api.getAllCourses(this.props.token)
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
                    courses3: [],
                    isLoading: false
                });
            });
    }
    
    render () {
        if (this.state.isLoading) {
            return (<h1>Getting courses...</h1>)
        }
        return (
            <main className="container">
                {
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
                }
            </main>
        )
    }
}

export default CoursesHome;
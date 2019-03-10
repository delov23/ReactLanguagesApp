import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CoursesHome extends Component {
    state = {
        courses: [
        {flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/2000px-Flag_of_Bulgaria.svg.png', language: 'BG A1', _id: '1'}, 
        {flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/2000px-Flag_of_Bulgaria.svg.png', language: 'BG A2', _id: '2'},
        {flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/2000px-Flag_of_Bulgaria.svg.png', language: 'BG B1', _id: '3'}]
    }
    
    render () {
        return (
            <main className="container">
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
            </main>
        )
    }
}

export default CoursesHome;
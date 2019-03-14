import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import api from '../../data/data';
import handleError from '../../utils/handleError';
import { UserConsumer } from '../contexts/userContext';

class PreviewLesson extends Component {
    state = {
        isLoading: true,
        lessons: [],
        unAuth: false
    }

    componentDidMount () {
        let courseId = this.props.match.params.id;
        api.getLessonsByCourse(courseId, sessionStorage.getItem('token'))
            .then((res) => {
                if (res.message !== 'Fetched lessons successfully.') {
                    throw new Error('Not authorized!');
                }
                this.setState({
                    isLoading: false,
                    lessons: res.lessons
                })
            })
            .catch((e) => {
                handleError(e);
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

        return (
            <main className="container bg-light" style={{paddingBottom: '20px'}}>
                <h1 className="text-dark text-center">Topics</h1>
                <br />
                {
                    this.state.lessons.length > 0
                    ?
                    this.state.lessons.map((lesson) => {
                        return (
                            <div className="row row-margin">
                                <div className="col">
                                    <Link to={'/lesson/preview/' + lesson._id} className="btn btn-block btn-lg btn-dark text-left">
                                        <img className="img-thumbnail prepend" src={lesson.image} width="50px" alt="Thumbnail" />
                                        {lesson.title}
                                    </Link>
                                </div>
                                {
                                    this.props.isAdmin
                                    ? 
                                    <div className="col-md-2">
                                        <Link to={'/lesson/remove/' + lesson._id} style={{height: '100%', 'font-size': '150%'}} className="btn btn-lg btn-block btn-danger">
                                            Remove
                                        </Link>
                                    </div>
                                    : null
                                }
                            </div>
                        )
                    })
                    : <h2 className="text-center">No topics to this course yet.</h2>
                }
            </main>
        )
    }
}

const PreviewLessonWithCtx = (props) => {
    return (
        <UserConsumer>
            {
                (user) => {
                    return <PreviewLesson {...props} isAdmin={!!user.isAdmin} />
                }
            }
        </UserConsumer>
    )
}


export default PreviewLessonWithCtx;
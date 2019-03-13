import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../data/data';
import handleError from '../../utils/handleError';
import handleLessonComplete from '../../utils/handleLessonComplete';
import { UserConsumer } from '../contexts/userContext';
import Vocabulary from './LessonStages/Vocabulary';
import Grammar from './LessonStages/Grammar';
import Test from './LessonStages/Test';

class PreviewLessons extends Component {
    state = {
        isLoading: true,
        lesson: null,
        unAuth: false,
        stage: 1,
        completed: false
    }

    componentDidMount () {
        let lessonId = this.props.match.params.id;
        api.getLesson(lessonId, sessionStorage.getItem('token'))
            .then((res) => {    
                if (res.message !== 'Fetched lesson successfully.') {
                    throw new Error(res.message);
                }
                this.setState({
                    isLoading: false,
                    lesson: res.lesson
                });
            })
            .catch((e) => {
                handleError(e);
                this.setState({
                    isLoading: false,
                    unAuth: true
                });
            })
    }

    handleNext = () => {
        this.setState((prevState) => {
            return {
                stage: prevState.stage + 1
            }
        })
    }

    handleDone = () => {
        api.addCourseToUser(this.state.lesson.course._id, sessionStorage.getItem('userId'), sessionStorage.getItem('token'))
        .then((res) => {
                handleLessonComplete();
                this.setState({
                    completed: true
                });
            })
            .catch((e) => {
                handleError(e);
                this.setState({
                    unAuth: true
                });
            })
    }

    render() {
        if (this.state.isLoading) {
            return <h1>Getting lesson...</h1>
        } else if (this.state.unAuth) {
            return <Redirect to="/logout" />
        } else if (this.state.completed) {
            return <Redirect to="/" />
        }

        return (
            <main className="container">
                {
                    this.state.stage === 1
                    ? <Vocabulary words={this.state.lesson.words} courseName={this.state.lesson.course.language.split(' ')[0]} />
                    : this.state.stage === 2
                         ? <Grammar grammar={this.state.lesson.grammar} />
                         : this.state.stage === 3
                             ? <Test test={this.state.lesson.test} />
                             : this.handleDone()
                }
                <button onClick={this.handleNext} className="btn btn-outline-success btn-lg float-right" style={{marginTop: '40px'}}>Next</button>
            </main>
        )
    }
}

const PreviewLessonsWithCtx = (props) => {
    return (
        <UserConsumer>
            {
                (user) => {
                    return <PreviewLessons {...props} isAdmin={!!user.isAdmin} />
                }
            }
        </UserConsumer>
    )
}


export default PreviewLessonsWithCtx;
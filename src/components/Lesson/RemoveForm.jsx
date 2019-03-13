import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import api from '../../data/data';
import handleSuccess from '../../utils/handleSuccess';
import handleError from '../../utils/handleError';

class RemoveForm extends Component {
    state = {
        sure: false,
        isLoading: true,
    }

    componentDidMount() {
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

    handleSubmit = (ev) => {
        ev.preventDefault();
        api.removeLesson(this.props.match.params.id, sessionStorage.getItem('token'))
        .then((res) => {
            handleSuccess(res);
            this.setState({
                sure: true
            });
        })
        .catch(handleError);
    }
    
    render() {
        if (this.state.isLoading) {
            return <div className="loader"></div>
        } else if (this.state.sure) {
            return <Redirect to="/" />
        } else if (this.state.unAuth) {
            return <Redirect to="/logout" />
        }

        const { lesson } = this.state;

        return (
            <main className="container">
                <h1 className="text-center">Are you sure you want to remove this lesson?</h1>
                <div className="row">
                    <img className="image-center" src={lesson.image} width="50%" height="50%" alt="Thumbnail" />
                    <div className="col-md-6">
                        <h2><span className="text-danger">Title: </span>{lesson.title}</h2>
                        <h2><span className="text-danger">Word Count: </span>{lesson.words.length}</h2>
                        <h2><span className="text-danger">Quiz Question Count: </span>{lesson.test.length}</h2>
                        <h2><span className="text-danger">Grammar Topic: </span>{lesson.grammar[0]}</h2>
                        <h2><span className="text-danger">Course: </span><img className="rounded border" width="100px" src={lesson.course.flag} alt="Thumbnail" /></h2>
                        <h2><span className="text-danger">Preview lesson: </span><Link to={'/lesson/preview/' + lesson._id} className="btn btn-lg btn-outline-success">Preview lesson</Link></h2>
                    </div>
                </div>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <button type="submit" className="btn btn-lg btn-block btn-outline-danger">Remove lesson</button>                
                </form>
            </main>
        )
    }
};

export default RemoveForm;
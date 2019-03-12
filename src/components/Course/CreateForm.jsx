import React, { Component } from 'react';
import api from '../../data/data';
import handleSuccess from '../../utils/handleSuccess';
import handleError from '../../utils/handleError';

class Form extends Component {
    state = {
        language: '',
        flag: '',
    }

    handleChange = (ev) => {
        let { name, value } = ev.target;
        this.setState({
            [name]: value
        })   
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { language, flag } = this.state;        
        
        api.createCourse(language, flag, sessionStorage.getItem('token'))
            .then((res) => {
                if (res.message !== 'Course added!') {
                    handleError(res);
                    return;
                }
                handleSuccess(res);
                this.props.history.push('/')
            })
            .catch(handleError);
    }

    render() {
        return (
            <main className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <label htmlFor="language" className="col-form-label-lg">Language</label>
                        <input onChange={this.handleChange} type="text" id="language" className="form-control col-form-label-lg" name="language" placeholder="English" value={this.props.language} />
                    </div>
                    <div className="form-row">
                        <label htmlFor="flag" className="col-form-label-lg">Flag URL</label>
                        <input onChange={this.handleChange} type="text" id="flag" className="form-control col-form-label-lg" name="flag" placeholder="https://..." value={this.props.flag} />
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-lg btn-block btn-outline-primary">Add lesson</button>
                </form>
            </main>
        )
    }
}

export default Form;
import React, { Component, Fragment } from 'react';

class Test extends Component {
    handleAnswer = (ev) => {
        let node = ev.target;
        let correct = node.dataset.check === 'true';
        if (correct) {
            node.className = 'btn-success btn-block text-center btn';
        } else {
            node.className = 'btn-danger btn-block text-center btn';
        }
    }

    render() {
        let { test } = this.props;

        return (
            <Fragment>
                <div className="progress">
                    <div className="progress-bar-striped bg-success" role="progressbar" style={{width: '100%'}} aria-valuenow="100"
                        aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h1 className="lesson-title text-center">Test</h1>
                    {
                        test.map(({ question, a1, a2, a3, answer, _id: id }) => {
                            return (
                                <div className="question" key={id}>
                                    <div className="row row-margin">
                                        <h2>{question}</h2>
                                    </div>
                                    <div className="row row-margin">
                                        <div className="col-md">
                                            <button data-check={answer === 1} className="text-center btn btn-outline-danger btn-block" onClick={this.handleAnswer}>{a1}</button>
                                        </div>
                                        <div className="col-md">
                                            <button data-check={answer === 2} className="text-center btn btn-outline-warning btn-block" onClick={this.handleAnswer}>{a2}</button>
                                        </div>
                                        <div className="col-md">
                                            <button data-check={answer === 3} className="text-center btn btn-outline-success btn-block" onClick={this.handleAnswer}>{a3}</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }                    
            </Fragment>
        )
    }
}

export default Test;
import React, { Fragment } from 'react';

const Vocabulary = (props) => {
    return (
        <Fragment>
            <div className="progress">
                <div className="progress-bar-striped bg-danger" role="progressbar" style={{width: '33%'}} aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <h1 className="lesson-title text-center">Vocabulary</h1>
            <div className="row row-margin">
                <div className="col-md">
                    <input type="text" className="text-center col-form-label-lg form-control btn-success" disabled="disabled" value={props.courseName} />
                </div>
                <div className="col-md">
                    <input type="text" className="text-center col-form-label-lg form-control btn-primary" disabled="disabled" value="English" />
                </div>
            </div>
            {
                props.words.map((word) => {
                    return (
                        <div className="row" key={word._id}>
                            <div className="col-md">
                                <input type="text" className="text-center col-form-label-lg form-control btn-outline-success" disabled="disabled" value={word.word} />
                            </div>
                            <div className="col-md">
                                <input type="text" className="text-center col-form-label-lg form-control btn-outline-primary" disabled="disabled" value={word.translation} />
                            </div>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}

export default Vocabulary;
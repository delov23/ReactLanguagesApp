import React, { Fragment } from 'react';

const Grammar = (props) => {
    return (
        <Fragment>
            <div className="progress">
                <div className="progress-bar-striped bg-warning" role="progressbar" style={{width: '66%'}} aria-valuenow="66"
                    aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <h1 className="lesson-title text-center">Grammar</h1>
            <div className="grammarRule">
                <div className="row row-margin">
                    <div className="col-md">
                        <input type="text" className="text-center col-form-label-lg form-control btn-dark"
                            disabled="disabled"
                            value={props.grammar[0]} />
                    </div>
                </div>
                <div className="row row-margin">
                    <div className="col-md">
                <textarea type="text" className="col-form-label-lg form-control btn-outline-primary" rows="5"
                        disabled="disabled" value={props.grammar[1]}></textarea>
                    </div>
                </div>
                <div className="row row-margin">
                    <div className="col-md">
                <textarea type="text" className="col-form-label-lg form-control btn-outline-primary" rows="3"
                        disabled="disabled" value={'Example: ' + props.grammar[2]}></textarea>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Grammar;
import React, { Component } from 'react';
import handleSuccess from '../../utils/handleSuccess';

const WordInputs = (props) => {
    return (
        props.words.map((val, idx) => {
            let wordId = `word-${idx}`, translationId = `translation-${idx}`;
            return (
                <div className="form-row" key={idx}>
                    <div className="form-group col-md-6">
                        <label htmlFor={wordId} className="col-form-label-lg">Word {idx + 1}</label>
                        <input type="text" value={props.words[idx].word} className="form-control col-form-label-lg word" id={wordId} data-id={idx} name={wordId} placeholder="Word" />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor={translationId} className="col-form-label-lg">Translation {idx + 1}</label>
                        <input type="text" value={props.words[idx].translation} className="form-control col-form-label-lg translation" id={translationId} data-id={idx} name={translationId} placeholder="Translation" />
                    </div>
                    <hr />
                </div>
            )
        })
    )
}

const QuestionInputs = (props) => {
    return (
        props.questions.map((val, idx) => {
            let questionId = `q-${idx}`, oneId = `a1-${idx}`, twoId = `a2-${idx}`, threeId = `a3-${idx}`, answerId = `a-${idx}`;
            return (
                <div key={idx}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor={questionId} className="col-form-label-lg">Question {idx + 1}</label>
                            <input type="text" value={props.questions[idx].question} className="form-control col-form-label-lg question" id={questionId} data-id={idx} name={questionId} placeholder="Question" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor={answerId} className="col-form-label-lg">Answer Value {idx + 1}</label>
                            <input type="number" min="1" max="3" value={props.questions[idx].answer} className="form-control col-form-label-lg answer" id={answerId} data-id={idx} name={answerId} placeholder="Answer Value (number 1-3)" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor={oneId} className="col-form-label-lg">Option {idx + 1}.1</label>
                            <input type="text" value={props.questions[idx].a1} className="form-control col-form-label-lg a1" id={oneId} data-id={idx} name={oneId} placeholder="One" />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor={twoId} className="col-form-label-lg">Option {idx + 1}.2</label>
                            <input type="text" value={props.questions[idx].a2} className="form-control col-form-label-lg a2" id={twoId} data-id={idx} name={twoId} placeholder="Two" />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor={threeId} className="col-form-label-lg">Option {idx + 1}.3</label>
                            <input type="text" value={props.questions[idx].a3} className="form-control col-form-label-lg a3" id={threeId} data-id={idx} name={threeId} placeholder="Three" />
                        </div>
                    </div>
                    <hr />
                </div>
            )
        })
    )
}

class Form extends Component {
    state = {
        words: [{ word: "", translation: "" }],
        questions: [{ a1: "", a2: "", a3: "", question: "", answer: 0 }],
        title: "",
        image: "",
        grammar1: "",
        grammar2: "",
        grammar3: "",
        course: "",
        courses: []
    }

    handleChange = (e) => {
        if (["word", "translation"].includes(e.target.className.split(' ')[2])) {
            let words = [...this.state.words]
            words[e.target.dataset.id][e.target.className.split(' ')[2]] = e.target.value
            this.setState({ words }, () => console.log(this.state.words))
        } else if (["question", "answer", "a1", "a2", "a3"].includes(e.target.className.split(' ')[2])) {
            let questions = [...this.state.questions]
            questions[e.target.dataset.id][e.target.className.split(' ')[2]] = e.target.value
            this.setState({ questions }, () => console.log(this.state.questions))
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    addword = (e) => {
        this.setState((prevState) => ({
            words: [...prevState.words, { word: "", translation: "" }],
        }));
    }

    addquestion = (e) => {
        this.setState((prevState) => ({
            questions: [...prevState.questions, { a1: "", a2: "", a3: "", question: "", answer: 0 }],
        }));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { words, questions, title, image, grammar1, grammar2, grammar3, course } = this.state;
        let body = JSON.stringify({ words: JSON.stringify(words), title, image, grammar: [grammar1, grammar2, grammar3], course, test: JSON.stringify(questions) });
        console.log(body);
        fetch('http://localhost:9999/lesson/create', {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            }
        }).then(raw => raw.json())
            .then((res) => {
                handleSuccess(res);
                this.props.history.push('/');
            })
            .catch(console.error);
    }

    componentDidMount = () => {
        fetch('http://localhost:9999/course/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            }
        })
            .then(raw => raw.json())
            .then(res => {
                console.log(res);
                this.setState({ courses: res.courses || [] });
            })
            .catch(() => {
                this.setState({ courses: [] });
            });
    }

    render() {
        let { words, questions } = this.state
        return (
            <main className="container">
                <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
                    <div className="form-row">
                        <label htmlFor="title" className="col-form-label-lg">Title</label>
                        <input type="text" id="title" className="form-control col-form-label-lg" name="title" placeholder="Title" value={this.props.title} />
                    </div>
                    <div className="form-row">
                        <label htmlFor="image" className="col-form-label-lg">Image URL</label>
                        <input type="text" id="image" className="form-control col-form-label-lg" name="image" placeholder="https://..." value={this.props.image} />
                    </div>
                    <div className="form-row">
                        <label htmlFor="g1" className="col-form-label-lg">Grammar Topic</label>
                        <input type="text" id="g1" className="form-control col-form-label-lg" name="grammar1" placeholder="Present Simple" value={this.props.grammar1} />
                    </div>
                    <div className="form-row">
                        <label htmlFor="g2" className="col-form-label-lg">Grammar Description</label>
                        <input type="text" id="g2" className="form-control col-form-label-lg" name="grammar2" placeholder="We use the present ..." value={this.props.grammar2} />
                    </div>
                    <div className="form-row">
                        <label htmlFor="g3" className="col-form-label-lg">Grammar Example</label>
                        <input type="text" id="g3" className="form-control col-form-label-lg" name="grammar3" placeholder="I live in the ..." value={this.props.grammar3} />
                    </div>
                    <div className="form-row">
                        <label htmlFor="course" className="col-form-label-lg">Course </label>
                        <select className="form-control form-control-lg" name="course" id="course" value={this.props.course}>
                            <option value="" disabled selected required>Pick a course...</option>
                            {
                                this.state.courses.length > 0
                                    ? this.state.courses.map(course => {
                                        return <option key={course._id} value={course._id}>{course.language}</option>
                                    })
                                    : null
                            }
                        </select>
                    </div>
                    <br />
                    <button className="btn btn-lg btn-success" onClick={this.addword}>[+] Word</button>
                    <WordInputs words={words} />
                    <button className="btn btn-lg btn-success" onClick={this.addquestion}>[+] Question</button>
                    <QuestionInputs questions={questions} />
                    <button type="submit" className="btn btn-lg btn-block btn-outline-primary">Add lesson</button>
                    <br />
                </form>
            </main>
        )
    }
}

export default Form;
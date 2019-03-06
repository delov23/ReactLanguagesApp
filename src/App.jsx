import React, { Component } from 'react';
import CreateLessonForm from './CreateLessonForm/Form';
import './css/MyTheme.css';
import './css/bootstrap-grid.css';
import './css/animate.css';

class App extends Component {
	render () {
		return (
			<main className="container">
				<CreateLessonForm />
			</main>
		)
	}
}

export default App;

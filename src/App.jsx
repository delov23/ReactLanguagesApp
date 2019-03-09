import React, { Component } from 'react';
import CreateLessonForm from './CreateLessonForm/Form';
import './css/MyTheme.css';
import './css/bootstrap-grid.css';
import './css/animate.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
	render () {
		return (
			<main className="container">
				<Router>
					<Switch>
						<Route exact path="/lesson/create" component={CreateLessonForm} />
					</Switch>
				</Router>
			</main>
		)
	}
}

export default App;

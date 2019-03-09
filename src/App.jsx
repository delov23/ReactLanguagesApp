import React, { Component } from 'react';
import CreateLessonForm from './CreateLessonForm/Form';
import Home from './Home/Home';
import './css/MyTheme.css';
import './css/bootstrap-grid.css';
import './css/animate.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
	render () {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/lesson/create" component={CreateLessonForm} />
					<Route render={() => (
						<h1>Not Found</h1>
					)} />
				</Switch>
			</Router>
		)
	}
}

export default App;

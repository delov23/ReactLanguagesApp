import React, { Component, Fragment } from 'react';
import CreateLessonForm from './CreateLessonForm/Form';
import Home from './Home/Home';
import './css/MyTheme.css';
import './css/bootstrap-grid.css';
import './css/animate.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import Register from './User/RegisterForm';
import CoursesHome from './Home/HomeAuthed';

class App extends Component {
	state = {
		
	}

	render() {
		return (
			<Router>
				<Fragment>
					<Navigation />
					<Switch>
						<Route exact path="/" render={() => {
							if (!this.state.user) {
								return <Home />
							} else {
								return <CoursesHome isAdmin={!!false} />
							}
						}} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/lesson/create" component={CreateLessonForm} />
						<Route render={() => (
							<h1>Not Found</h1>
						)} />
					</Switch>
				</Fragment>
			</Router>
		)
	}
}

export default App;

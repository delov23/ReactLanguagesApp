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
		user: {
			token: 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbG92MjNAa2suZ2ciLCJ1c2VySWQiOiI1YzcxNzUzYzUxOTJiYzE3NDA2OWYyZTciLCJpYXQiOjE1NTIyMTk5OTEsImV4cCI6MTU1MjIyMzU5MX0.DmUNNVLtpevE03m13z14QGA0ZHytcysYgEUO9fTO4vg'
		},
		isAdmin: false
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
								return <CoursesHome user={this.state.user} isAdmin={this.state.isAdmin} />
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

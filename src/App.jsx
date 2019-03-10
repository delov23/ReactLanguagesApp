import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home/Home';
import CreateLessonForm from './components/Lesson/CreateForm';
import Navigation from './components/Navigation/Navigation';
import Register from './components/User/RegisterForm';
import Login from './components/User/LoginForm';
import CoursesHome from './components/Home/HomeAuthed';
import 'react-toastify/dist/ReactToastify.css';
import './css/MyTheme.css';
import './css/bootstrap-grid.css';
import './css/animate.css';

class App extends Component {
	state = {
		user: {
			token: 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbG92MjNAa2suZ2ciLCJ1c2VySWQiOiI1YzcxNzUzYzUxOTJiYzE3NDA2OWYyZTciLCJpYXQiOjE1NTIyMjgzMzIsImV4cCI6MTU1MjIzMTkzMn0.Qt5i3mvsT6fOdrhJh5_oSjP7tmZGyBB4iCouToejnYU'
		},
		isAdmin: false
	}

	render() {
		return (
			<Router>
				<Fragment>
					<ToastContainer />
					<Navigation />
					<Switch>
						<Route exact path="/" render={() => {
							if (!this.state.user) {
								return <Home />
							} else {
								return <CoursesHome user={this.state.user} isAdmin={this.state.isAdmin} />
							}
						}} />
						<Route exact path="/login" component = {Login} />
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

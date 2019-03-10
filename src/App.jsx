import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home/Home';
import CreateLessonForm from './components/Lesson/CreateForm';
import Navigation from './components/Navigation/Navigation';
import Register from './components/User/RegisterForm';
import Login from './components/User/LoginForm';
import About from './components/Home/About';
import CoursesHome from './components/Home/HomeAuthed';
import { UserProvider } from './components/contexts/userContext';
import 'react-toastify/dist/ReactToastify.css';
import './css/MyTheme.css';
import './css/bootstrap-grid.css';
import './css/animate.css';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {
				token: sessionStorage.getItem('token') || '',
				userId: sessionStorage.getItem('userId') || '',
				isLoggedIn: !!sessionStorage.getItem('userId') || false,
				isAdmin: sessionStorage.getItem('isAdmin') || '',
				updateUser: this.updateUser
			}
		};	
	}

	updateUser = (user) => {
		this.setState({ user });
	};

	render() {
		return (
			<Router>
				<Fragment>
					<UserProvider value={this.state.user}>
						<ToastContainer />
						<Navigation />
						<Switch>
							<Route exact path="/" render={() => {
								if (!this.state.user.userId) {
									return <Home />
								} else {
									return <CoursesHome token={this.state.user.token} userId={this.state.user.userId} isAdmin={this.state.user.isAdmin} />
								}
							}} />
							<Route exact path="/login" component = {Login} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/about" component={About} />
							<Route exact path="/lesson/create" component={CreateLessonForm} />
							<Route render={() => (
								<h1>Not Found</h1>
							)} />
						</Switch>
					</UserProvider>
				</Fragment>
			</Router>
		)
	}
}

export default App;

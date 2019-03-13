import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home/Home';
import CreateLessonForm from './components/Lesson/CreateForm';
import CreateCourseForm from './components/Course/CreateForm';
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
import AuthRoute from './components/Auth/AuthRoute' ;
import AdminRoute from './components/Auth/AdminRoute' ;
import AnonymousRoute from './components/Auth/AnonymousRoute';
import PreviewLessons from './components/Course/PreviewLessons';
import PreviewLesson from './components/Lesson/Lesson';
import RemoveForm from './components/Lesson/RemoveForm';
import Profile from './components/User/Profile';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {
				token: sessionStorage.getItem('token') || '',
				userId: sessionStorage.getItem('userId') || '',
				isLoggedIn: !!sessionStorage.getItem('userId') || false,
				isAdmin: sessionStorage.getItem('isAdmin') === "true" || false,
				updateUser: this.updateUser
			}
		};	
	};

	updateUser = (user) => {
		this.setState({ user });
	};

	handleLogout = () => {
		sessionStorage.clear();
		this.updateUser({
			token: '',
			userId: '',
			isLoggedIn: false,
			isAdmin: false,
			updateUser: this.updateUser
		})
		return <Redirect to="/" />
	};

	handleHomePage = () => {
		if (!this.state.user.userId) {
			return <Home />
		} else {
			return <CoursesHome token={this.state.user.token} userId={this.state.user.userId} isAdmin={this.state.user.isAdmin} />
		}
	};

	render() {
		return (
			<Router>
				<Fragment>
					<UserProvider value={this.state.user}>
						<ToastContainer />
						<Navigation />
						<Switch>
							<Route exact path="/" render={this.handleHomePage} />
							
							<AnonymousRoute exact path="/login" component={Login} />
							<AnonymousRoute exact path="/register" component={Register} />
							
							<AuthRoute exact path="/logout" render={this.handleLogout} />
							<AuthRoute exact path="/about" component={About} />
							<AuthRoute exact path="/lesson/preview/:id" component={PreviewLesson} />
							<AuthRoute exact path="/course/lessons/:id" component={PreviewLessons} />
							<AuthRoute exact path="/user/profile" component={Profile} />

							<AdminRoute exact path="/lesson/create" component={CreateLessonForm} />
							<AdminRoute exact path="/lesson/remove/:id" component={RemoveForm} />
							<AdminRoute exact path="/course/create" component={CreateCourseForm} />

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

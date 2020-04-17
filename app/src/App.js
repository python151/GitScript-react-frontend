import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'

// Navigation
import Navbar from './components/Navbar';
import Footer from './components/Footer'

// Pages
import Home from './components/Home';

// Authentication
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import User from './components/User';
import Logout from './components/Logout';

// Create, Read, Update, Delete (CRUD)
import Script from './components/Script';
import Editor from './components/Editor';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    }
  }

  render() {
      return (
      <BrowserRouter>
        <div className="App">
          <Navbar />

          <div className="widthPush">
            <Switch>
              {/* Pages */}
              <Route exact path="/" component={Home} />
              <Redirect to="/" from="/Home" />
              
              {/* Authentication */}
              <Route path="/login" component={Login} />
              <Route path="/SignUp" component={SignUp} />
              <Route path="/Dashboard" component={Dashboard} />
              <Route path="/user/:id" component={User} />
              <Route path="/logout" component={Logout} />

              {/* Create, Read, Update, Delete (CRUD) */}
              <Route path="/script/:id" component={Script} />
              <Route path="/editor/:id" component={Editor} />
              
            </Switch>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }

}

export default App;

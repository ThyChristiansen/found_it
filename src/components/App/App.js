import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';


import Footer from '../Footer/Footer'
import AboutPage from '../AboutPage/AboutPage'
import UserPage from '../UserPage/UserPage';
import BoxList from '../BoxList/BoxList';
import Box from '../Box/Box';
import BoxDetail from '../BoxDetail/BoxDetail';
import Item from '../Item/Item';
import Reader from '../Reader/Reader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import {
  HashRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';



class App extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
 
    return (
      <HashRouter>

        <div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />

            <ProtectedRoute
              path="/scanner"
              component={Reader}
            />
            <ProtectedRoute
              path="/box-list/:id"
              component={BoxList}
            />
             <ProtectedRoute
              path="/box"
              component={Box}
            />

            <ProtectedRoute
              exact path="/box-detail/:roomId/:id"
              component={BoxDetail}
            />
            <ProtectedRoute
              path="/item/:id"
              component={Item}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>

          <Footer />
        </div>
      </HashRouter>

    )
  }
}

const putReduxStateOnState = (reduxState) => ({ reduxState });

export default connect(putReduxStateOnState)(App);


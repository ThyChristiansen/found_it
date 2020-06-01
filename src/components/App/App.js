import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';


import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import AboutPage from '../AboutPage/AboutPage'
import UserPage from '../UserPage/UserPage';
import BoxList from '../BoxList/BoxList';
import Box from '../Box/Box';
import BoxDetail from '../BoxDetail/BoxDetail';
import Item from '../Item/Item';


import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import {
  HashRouter,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';

import Reader from '../Reader/Reader';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  root: {
    paddingTop: '10px',
  },
};


class App extends Component {
  state = {
    menu: false,
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  handleShowNav = () => {
    console.log('click!')
    this.setState({
      menu: !this.state.menu
    })
  }

  render() {

    let menu;
    if (this.state.menu) {
      menu = <Nav />
    }

    const { classes } = this.props;

    return (
      <HashRouter>
        <div className="nav-bar">
          <Link to="/home">
            <h1 className="nav-title" >Found it</h1>
          </Link><br />
          {/* <SearchingBar /> */}
          <span onClick={this.handleShowNav}
            className="menu"
          >Menu</span>
          <ArrowDropDownIcon
            onClick={this.handleShowNav}
            className={classes.root}
          />
          {menu}
        </div>

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
              path="/boxes/:id"
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

export default connect(putReduxStateOnState)(withStyles(styles)(App));


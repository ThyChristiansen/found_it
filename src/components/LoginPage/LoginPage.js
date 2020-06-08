import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LoginPage.css';


//-----------------------Styling----------------------------------

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { Box } from '@material-ui/core'
//-----------------------Styling----------------------------------

const useStyles = (theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  alignItemsAndJustifyContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  width: {
    width: 230,
    height: 40,

  },
  height: {
    height: 30,
  }
});

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });  
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <div className="login_header_bar">
          <h5 className="login_header">Found it</h5>
          <img
            src="images/app.png"
            alt='scanner_icon'
            className="icon_scanner"
            width="50"
            height="50"
          />
        </div>
            {this.props.errors.loginMessage && (
              <p className="alert" role="alert">
                {this.props.errors.loginMessage}
              </p>
            )}
            <div className={classes.alignItemsAndJustifyContent}>
            <Box m="auto">
            <form onSubmit={this.login}>
              <div>
                <label htmlFor="username">
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item className={classes.height}>
                        <AccountCircle />
                      </Grid>
                      <Grid item>
                        <TextField id="input-with-icon-grid"
                          label="Username"
                          value={this.state.username}
                          onChange={this.handleInputChangeFor('username')}
                          className={classes.width}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </label>
              </div>
              <div>
                <label htmlFor="password">
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item className={classes.height}>
                        <LockIcon />
                      </Grid>
                      <Grid item>
                        <TextField id="input-with-icon-grid"
                          label="Password"
                          type="password"
                          value={this.state.password}
                          onChange={this.handleInputChangeFor('password')}
                          className={classes.width}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </label>
              </div>
              <div>
                <div className={classes.alignItemsAndJustifyContent}>
                  <Grid item>
                    <input
                      className="log-in"
                      type="submit"
                      name="submit"
                      value="Log In"
                    />
                  </Grid>
                </div>
              </div>
            </form>
            <center>
              <button
                type="button"
                className="link-button"
                onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
              >
                Sign Up
          </button>
            </center>
          </Box >
        </div>
      </div>

    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(useStyles)(LoginPage));

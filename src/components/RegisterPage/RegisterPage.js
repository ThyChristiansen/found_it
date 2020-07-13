import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../LoginPage/LoginPage.css';

import GoogleLogin from 'react-google-login'

//-----------------------Styling----------------------------------

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import { Box } from '@material-ui/core'
import Swal from 'sweetalert2';

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

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    email: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
        },
      });
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 8000,
        // timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: "You just succeeded in createing a new account. Now, let's start!!"
      })

    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: response.profileObj.email,
        email: response.profileObj.email,
        password: response.profileObj.googleId,
        givenName:response.profileObj.givenName,
      },
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* Header for register page */}
        <div className="login_header_bar">
          <h5 className="login_header">Welcome to Found it</h5>

          <img
            src="images/app.png"
            alt='scanner_icon'
            className="icon_scanner"
            width="50"
            height="50"
          />
        </div>

        {this.props.errors.registrationMessage && (
          <p className="alert" role="alert" >
            {this.props.errors.registrationMessage}
          </p>
        )}
        <div className={classes.alignItemsAndJustifyContent}>
          <Box m="auto">
            <form onSubmit={this.registerUser}>
              <p>Create Account</p>
              <div>
                <label htmlFor="username">
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item className={classes.height} >
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
                <label htmlFor="email">
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item className={classes.height} >
                        <AlternateEmailIcon />
                      </Grid>
                      <Grid item>
                        <TextField id="input-with-icon-grid"
                          label="Email"
                          type="text"
                          value={this.state.email}
                          onChange={this.handleInputChangeFor('email')}
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
                      <Grid item className={classes.height} >
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
                      className="register"
                      type="submit"
                      name="submit"
                      value="Sign Up"
                    />
                  </Grid>
                </div>
                <p>________________or________________</p>
                <GoogleLogin
                  clientId="657071721957-uur1g143dko5qi1v2p33v9r1cfs4dhus.apps.googleusercontent.com"
                  buttonText="Sign up with Google"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  onClick={this.registerUser}
                />
              </div>
            </form>
            <center>
              <br />
              <br />
              <button
                type="button"
                className="link-button"
                onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
              >
                Already have an account?
          </button>
            </center>

          </Box>

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
export default connect(mapStateToProps)(withStyles(useStyles)(RegisterPage));



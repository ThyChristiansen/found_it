import React, { Component } from "react";
import { connect } from "react-redux";
import "../LoginPage/LoginPage.css";

import GoogleLogin from "react-google-login";

//-----------------------Styling----------------------------------

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { Box } from "@material-ui/core";
import Swal from "sweetalert2";

//-----------------------Styling----------------------------------

const useStyles = (theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  alignItemsAndJustifyContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  width: {
    width: 230,
    height: 40,
  },
  height: {
    height: 30,
  },
});

class RegisterPage extends Component {
  state = {
    name: "",
    password: "",
    email: "",
  };

  registerUser = (event) => {
    event.preventDefault();
    var filter = /^([a-zA-Z0-9_])+(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(this.state.email)) {
      alert("Please provide a valid email address");
    } else if (this.state.email && this.state.password && this.state.name) {
      this.props.dispatch({
        type: "REGISTER",
        payload: {
          username: this.state.email,
          password: this.state.password,
          name: this.state.name,
        },
      });
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 8000,
        // timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title:
          "You just succeeded in creating a new account. Now, let's start!!",
      });
    } else {
      this.props.dispatch({ type: "REGISTRATION_INPUT_ERROR" });
    }
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  responseGoogle = (response) => {
    // console.log(response);
    // console.log(response.profileObj);
    this.props.dispatch({
      type: "REGISTER",
      payload: {
        username: response.profileObj.email,
        password: response.profileObj.googleId,
        name: response.profileObj.name,
      },
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* Header for register page */}
        <div className="login_header_bar">
          <h5 className="login_header">Welcome to Found it</h5>
          <img
            src="images/app.png"
            alt="scanner_icon"
            className="icon_scanner"
            width="50"
            height="50"
          />
        </div>

        {this.props.errors.registrationMessage && (
          <p className="alert" role="alert">
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
                      <Grid item className={classes.height}>
                        <AlternateEmailIcon />
                      </Grid>
                      <Grid item>
                        <TextField
                          id="input-with-icon-grid"
                          className={classes.width}
                          type="text"
                          name="email"
                          label="Email"
                          value={this.state.email}
                          onChange={this.handleInputChangeFor("email")}
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
                        <TextField
                          id="input-with-icon-grid"
                          className={classes.width}
                          type="text"
                          type="password"
                          name="password"
                          label="Password"
                          value={this.state.password}
                          onChange={this.handleInputChangeFor("password")}
                        />
                        
                      </Grid>
                    </Grid>
                  </div>
                </label>
              </div>
              <div>
                <label htmlFor="name">
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item className={classes.height}>
                      <AccountCircle />
                      </Grid>
                      <Grid item>
                        <TextField
                          id="input-with-icon-grid"
                          className={classes.width}
                          type="text"
                          name="name"
                          label="Your name"
                          value={this.state.name}
                          onChange={this.handleInputChangeFor("name")}
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
                  cookiePolicy={"single_host_origin"}
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
                onClick={() => {
                  this.props.dispatch({ type: "SET_TO_LOGIN_MODE" });
                }}
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
const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps)(withStyles(useStyles)(RegisterPage));

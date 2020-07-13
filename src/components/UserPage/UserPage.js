import React from 'react';
import { connect } from 'react-redux';
// import LogOutButton from '../LogOutButton/LogOutButton';
import CreateRoomList from '../UserPage/CreateRoomList';
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

import Header from '../Header/Header';


const UserPage = (props) => (
  <div>
    <Header />
    {/* Send username, userId to createRoomList component */}
    <CreateRoomList
    username =  {props.user.username}
    userId={props.user.id}
    givenName = {props.user.given_name}
     />
  </div>
);

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  id: state.id,
});
// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

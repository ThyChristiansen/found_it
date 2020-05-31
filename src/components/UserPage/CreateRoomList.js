import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HomePage from '../UserPage/HomePage';


class CreateRoomList extends Component {

    state = {
        button: true,
        welcome: true
    }


    componentDidMount() {
        this.props.dispatch({
            type: "FETCH_ROOM",
            payload: {
                userId: this.props.userId
            }
        })
    }

    handleClick = () => {
        this.props.dispatch({
            type: "CREATE_ROOM_LIST",
            payload: {
                userId: this.props.userId
            }
        })
        this.setState({
            button: !this.state.button,
            welcome: !this.state.welcome
        })
    }

    render() {

        let button;
        let welcome;
        if (this.state.button&& this.props.reduxState.rooms.length === 0) {
            button = < button onClick={this.handleClick}> Create room list</button >
            welcome = <h1>Welcome {this.props.username}!!!!</h1>
        } else {
            welcome = <h1>{this.props.houseName}'house</h1>
        }

        return (
            <div>
                {welcome}
                {button}
                {/* <h1>user id: {JSON.stringify(this.props.userId)}</h1>  */}
                <HomePage />

            </div >
        )
    }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(CreateRoomList);
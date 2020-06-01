import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RoomList.css'

import { Link } from 'react-router-dom';

class RoomList extends Component {
    handleOnClick = () => {
        console.log('room clicked!')
    }

    render() {
        return (
            <div>
                {/* <h1>{JSON.stringify(this.props.reduxState.rooms)}</h1> */}
                <Link to={`/boxes/${this.props.roomData.id}`}>
                    <img src="images/room_icon.png"
                        width="100px"
                        height="100px"
                        onClick={this.handleOnClick}
                    ></img>
                </Link>
                <p className="room_name">{this.props.roomData.room_name}</p>
            </div >
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(RoomList);
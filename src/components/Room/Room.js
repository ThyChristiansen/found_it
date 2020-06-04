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
                {/* Set Link for each room icon so that the user can click on the box icon and navigate to the detail inside room */}
                <Link to={`/box-list/${this.props.roomData.id}`}>
                    <img src="images/room_icon.png"
                        alt="room_icon"
                        width="75px"
                        height="75px"
                        onClick={this.handleOnClick}
                    ></img>
                </Link>
                {/* Room's mame */}
                <p className="room_name">{this.props.roomData.room_name}</p>
            </div >
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(RoomList);
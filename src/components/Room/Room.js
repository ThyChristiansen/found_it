import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import './RoomList.css'
// import { Link } from 'react-router-dom';

class RoomList extends Component {
    handleOnClick = () => {
        // console.log('room clicked!')
        this.props.history.push(`/box-list/${this.props.roomData.id}`)

    }

    render() {
        return (
            <div onClick={this.handleOnClick}>
                {/* <h1>{JSON.stringify(this.props.reduxState.rooms)}</h1> */}
                {/* Set Link for each room icon so that the user can click on the box icon and navigate to the detail inside room */}
                {/* <Link to={`/box-list/${this.props.roomData.id}`}> */}
                <img src="images/room_icon.png"
                    alt="room_icon"
                    width="100px"
                    height="100px"
                ></img>
                {/* Room's mame */}
                <p className="room_name_in_list_room">{this.props.roomData.room_name}</p>
                {/* </Link> */}
            </div >
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default withRouter(connect(putReduxStateToProps)(RoomList));

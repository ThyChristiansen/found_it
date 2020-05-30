import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RoomList.css'
// import Storge from './Storge';
// import Basement from './Basement';
// import Garage from './Garage';
// import Livingroom from './Livingroom';
// import Bedroom from './Bedroom';
// import Kitchen from './Kitchen';

import { Link } from 'react-router-dom';


class RoomList extends Component {

  
    handleOnClick = () => {
        console.log('room clicked!')
    }

    render() {
        return (
            <div>
                {/* <h1>{JSON.stringify(this.props.reduxState.rooms)}</h1> */}
                <Link to={`/boxes/${this.props.roomData.room_name}/${this.props.roomData.id}`}>
                    <img src="images/room_icon.png"
                        width="100px"
                        height="100px"
                        onClick={this.handleOnClick}
                    ></img>
                </Link>
                <p className="room_name">{this.props.roomData.room_name}</p>

                {/* <p>{JSON.stringify(this.props.reduxState.boxes.id)}</p> */}
            </div >
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(RoomList);
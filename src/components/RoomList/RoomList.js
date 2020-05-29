import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RoomList.css'
import Storge from './Storge';
import Basement from './Basement';
import Garage from './Garage';
import Livingroom from './Livingroom';
import Bedroom from './Bedroom';
import Kitchen from './Kitchen';



class RoomList extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: "FETCH_ROOM"
        })
    }

    handleOnClick =() =>{
        console.log('room clicked!')
    }

    render() {
        return (
            <div>
                {/* {this.props.reduxState.rooms.map((room) => {
                    return (
                        <div key={room.id} className="room">
                            <img src="images/room_icon.png" 
                            width="100px" 
                            height="100px"
                            onClick = {this.handleOnClick}
                            ></img>
                            <p className="room_name">{room.room_name}</p>
                        </div>
                    )
                })} */}
                <Storge />
                <Basement />
                <Garage />
                <Livingroom />
                <Bedroom />
                <Kitchen />
                {/* <p>{JSON.stringify(this.props.reduxState.boxes.id)}</p> */}
            </div>
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(RoomList);
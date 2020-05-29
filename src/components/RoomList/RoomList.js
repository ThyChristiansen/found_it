import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RoomList.css'
import Storge from './Storge';
import Basement from './Basement';
import Garage from './Garage';
import Livingroom from './Livingroom';
import Bedroom from './Bedroom';
import Kitchen from './Kitchen';

import { Link } from 'react-router-dom';


class RoomList extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: "FETCH_ROOM"
        })
    }

    handleOnClick = () => {
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
                <Link to='/storge'>
                    {this.props.reduxState.rooms.map((room) => {
                        return (
                            <div key={room.id} className="room">
                                <img src="images/room_icon.png"
                                    width="100px"
                                    height="100px"
                                    onClick={this.handleOnClick}
                                ></img>
                                <p className="room_name">{room.room_name}</p>
                            </div>
                        )
                    }).shift()}
                </Link><br />
                <Link to='/basement'>
                    {(this.props.reduxState.rooms.filter((room) => {
                        return room.room_name === "Basement"
                    })).map(room => {
                        return (
                            <div key={room.id} className="room">
                                <img src="images/room_icon.png"
                                    width="100px"
                                    height="100px"
                                    onClick={this.handleOnClick}
                                ></img>
                                <p className="room_name">{room.room_name}</p>
                            </div>
                        )
                    })}
                    {/* <p>{JSON.stringify(this.props.reduxState.rooms[0])}</p> */}
                </Link><br />
                <Link to='/garage'>
                    {(this.props.reduxState.rooms.filter((room) => {
                        return room.room_name === "Garage"
                    })).map(room => {
                        return (
                            <div key={room.id} className="room">
                                <img src="images/room_icon.png"
                                    width="100px"
                                    height="100px"
                                    onClick={this.handleOnClick}
                                ></img>
                                <p className="room_name">{room.room_name}</p>
                            </div>
                        )
                    })}
                </Link><br />
                <Link to='/livingroom'>
                    {(this.props.reduxState.rooms.filter((room) => {
                        return room.room_name === "Livingroom"
                    })).map(room => {
                        return (
                            <div key={room.id} className="room">
                                <img src="images/room_icon.png"
                                    width="100px"
                                    height="100px"
                                    onClick={this.handleOnClick}
                                ></img>
                                <p className="room_name">{room.room_name}</p>
                            </div>
                        )
                    })}
                </Link><br />
                <Link to='/bedroom'>
                    {(this.props.reduxState.rooms.filter((room) => {
                        return room.room_name === "Bedroom"
                    })).map(room => {
                        return (
                            <div key={room.id} className="room">
                                <img src="images/room_icon.png"
                                    alt={room.room_name}
                                    width="100px"
                                    height="100px"
                                    onClick={this.handleOnClick}
                                ></img>
                                <p className="room_name">{room.room_name}</p>
                            </div>
                        )
                    })}               
                     </Link><br />
                <Link to='/kitchen'>
                    {(this.props.reduxState.rooms.filter((room) => {
                        return room.room_name === "Kitchen"
                    })).map(room => {
                        return (
                            <div key={room.id} className="room">
                                <img src="images/room_icon.png"
                                    alt={room.room_name}
                                    width="100px"
                                    height="100px"
                                    onClick={this.handleOnClick}
                                ></img>
                                <p className="room_name">{room.room_name}</p>
                            </div>
                        )
                    })}
                </Link><br />
                {/* <p>{JSON.stringify(this.props.reduxState.boxes.id)}</p> */}
            </div >
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(RoomList);
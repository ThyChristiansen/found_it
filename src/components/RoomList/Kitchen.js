import React, { Component } from 'react';
import { connect } from 'react-redux';


class Kitchen extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
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
                {/* <p>{JSON.stringify(this.props.reduxState.rooms[0])}</p> */}
            </div>
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(Kitchen);
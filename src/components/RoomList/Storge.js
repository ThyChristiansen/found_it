import React, { Component } from 'react';
import { connect } from 'react-redux';


class Storge extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
                {/* <h1>Storge</h1> */}
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
                {/* <p>{JSON.stringify(this.props.reduxState.rooms[0])}</p> */}
            </div>
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(Storge);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoomList from '../Room/Room';


class Home extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: "FETCH_ROOM"
        })
    }
    render() {
        return (
            <div>
                {/* <h1>{JSON.stringify(this.props.reduxState.rooms)}</h1> */}
                {this.props.reduxState.rooms.map((room) => {
                    return (
                        <div key={room.id} className="room">
                            <RoomList
                            roomData={room}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(Home);
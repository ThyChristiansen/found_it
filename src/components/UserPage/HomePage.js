import React, { Component } from 'react';
import { connect } from 'react-redux';
import Room from '../Room/Room';


class HomePage extends Component {
    // componentDidMount() {
    //     this.props.dispatch({
    //         type: "FETCH_ROOM",
    //         payload: {
    //             userId: this.props.userId
    //         }
    //     })
    // }
    render() {
        return (
            <div>
                {/* <h1>{JSON.stringify(this.props.reduxState.rooms)}</h1> */}
                {this.props.reduxState.rooms.map((room) => {
                    return (
                        <div key={room.id} className="room">
                            <Room
                            roomData={room}
                            />
                        </div>
                    )
                })}

               {/* <h3>user id: {JSON.stringify(this.props)}</h3>  */}
            </div>
        )
    }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(HomePage);
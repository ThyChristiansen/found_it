import React, { Component } from 'react';
import { connect } from 'react-redux';
import Room from '../Room/Room';


class HomePage extends Component {
    
 
    render() {
        return (
            <div>
                <h1>{this.props.reduxState.houseName.map((event) => event.house_name)}</h1>

                {/* <h1>nv {JSON.stringify(this.props)}</h1> */}
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
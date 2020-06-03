import React, { Component } from 'react';
import { connect } from 'react-redux';
import Room from '../Room/Room';
import './UserPage.css'

class HomePage extends Component {
    componentDidMount() {
        //Send this action to Saga to show the house's name 
        this.props.dispatch({
            type: "FETCH_HOUSE_NAME",
            payload: {
                userId: this.props.userId
            }
        });
    }
git
    render() {
        return (
            <div>
                {/* Mapping through the houseName reducer and display the house's name */}
                <h1 className="house_name">{this.props.reduxState.houseName.map((event) => event.house_name)}</h1>

                {/* Mapping through the rooms reducer and display the list of room name */}
                {this.props.reduxState.rooms.map((room) => {
                    return (
                        <div key={room.id} className="room">
                            {/* I keep each room inside of the Room component */}
                            <Room
                                roomData={room}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }
}
//set the reduxState inside props and putReduxStateToProps variable inside the conneect
//so that I can get get data from the reducers
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(HomePage);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HomePage from '../UserPage/HomePage';


class CreateRoomList extends Component {

    //Create state to store button and welcome message
    state = {
        button: true, //I want to show it when the user 
        welcome: true,
        houseName:''
    }


    componentDidMount() {
        this.props.dispatch({
            type: "FETCH_ROOM",
            payload: {
                userId: this.props.userId
            }
        });
    }
    handleHouseNameChangeFor = (event) => {
        // console.log('changing', event.target.value)
        this.setState({
            houseName: event.target.value
        })

    }


    handleClick = (event) => {
        this.props.dispatch({
            type: "CREATE_ROOM_LIST",
            payload: {
                userId: this.props.userId
            }
        })
        this.setState({
            button: !this.state.button,
            welcome: !this.state.welcome,

        })
        this.props.dispatch({
            type: "CREATE_HOUSE_NAME",
            payload: {
                houseName: this.state.houseName,
                userId: this.props.userId
            }
        })
        console.log('---------->send this house name to Saga',this.state.houseName)
        this.props.dispatch({
            type: "FETCH_HOUSE_NAME",
            payload: {
                userId: this.props.userId
            }
        });
    }

    render() {

        let button;
        let welcome;
        if (this.state.button && this.props.reduxState.rooms.length === 0) {
            button = <>
                <input type="text" placeholder="House's name..."
                    onChange={this.handleHouseNameChangeFor}/>
                < button onClick={this.handleClick}> Create room list</button >
            </>
            welcome = <h1>Welcome {this.props.username}!!!!</h1>
        } 
        
        return (
            <div>
                {welcome}
                {button}
                {/* <h1>house name: {JSON.stringify(this.props.reduxState.houseName.map((event)=> event.house_name))}</h1>  */}
                <HomePage userId = {this.props.userId}/>

            </div >
        )
    }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(CreateRoomList);
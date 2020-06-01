import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomePage from '../UserPage/HomePage';


class CreateRoomList extends Component {

    //Create state to store button, welcome message and houseName that user will type in when they are create the house's name
    state = {
        button: true, //I want to show it when the user 
        welcome: true,
        houseName:''
    }

    //To always update the room list, I put the action FETCH_ROOM inside componentDidMount
    componentDidMount() {
        this.props.dispatch({
            type: "FETCH_ROOM",
            payload: {
                userId: this.props.userId
            }
        });
    }
       //handle change for the house's name input field, this will set the houseName property in
       // the state above to whatever name that user typed in
    handleHouseNameChangeFor = (event) => {
        console.log('changing', event.target.value)
        this.setState({
            houseName: event.target.value
        })
    }
    //handle click for create room list. For the new account, this handleClick for Create room list button
    // will work like when the user click on, it will create a list of rooms then the input field and the button 
    // will disappear after that
    handleClick = (event) => {
        this.props.dispatch({
            type: "CREATE_ROOM_LIST",
            payload: {
                userId: this.props.userId
            }
        })
        //set the button, welcome properties in the state above to be false to hide it
        this.setState({
            button: false,
            welcome: false,

        })
        //Send the action CREATE_HOUSE_NAME with a couple data in payload to Saga to posting
        // to data base the house's name
        this.props.dispatch({
            type: "CREATE_HOUSE_NAME",
            payload: {
                houseName: this.state.houseName,
                userId: this.props.userId
            }
        })
        console.log('---------->send this house name to Saga',this.state.houseName)
        //After create house's name, I also send the FETCH_HOUSE_NAME to Saga to get house's name right of the bat
        this.props.dispatch({
            type: "FETCH_HOUSE_NAME",
            payload: {
                userId: this.props.userId
            }
        });
    }

    render() {
        //I use if statement to show the input field and the create house name button
        //if their value is true, and no rooms in this account,
        // it will display input field, the button and the message welcome
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
                {/* I put Homeage component in here so that the list of room will show up right in the home page */}
                <HomePage userId = {this.props.userId}/>
            </div >
        )
    }
}
//set the reduxState inside props and putReduxStateToProps variable inside the conneect
//so that I can get get data from the reducers
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(CreateRoomList);
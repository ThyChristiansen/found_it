import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '../Box/Box';
import './BoxList.css'
import Header from '../Header/Header';
import Swal from 'sweetalert2';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';





const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),

    },
    margin: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        padding: theme.spacing(1),
        textAlign: 'center',
    },
});

class BoxList extends Component {

    componentDidMount() {
        // this.props.dispatch({ type: 'FETCH_BOX' })
        //Send the FETCH_BOX action to Saga via dispatch to get box'list
        const { dispatch, match } = this.props;
        dispatch({
            type: 'FETCH_BOX',
            payload: {
                roomId: match.params.id,
            }
        });
        //Send the FETCH_ROOM_NAME action to Saga via dispatch to get room's name
        dispatch({
            type: 'FETCH_ROOM_NAME',
            payload: {
                roomId: match.params.id,
            }
        })
    }
    //handle click for add new box button. 
    //When the user click on this button, this handle function will send the ADD_BOX action
    // to Saga and performing add new box into the boxes table in database
    //I also send the roomId in payload so that the user can add boxes to different room.
    handleOnClickAddNewBox = () => {
        const { dispatch, match } = this.props;
        console.log('add new item clicked!');
        dispatch({
            type: 'ADD_BOX',
            payload: {
                roomId: match.params.id
            }
        })
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 2000,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Added'
        })
    }
    handleOnClickAddFirstBoxInRoom = () => {
        const { dispatch, match } = this.props;
        console.log('add new item clicked!');
        dispatch({
            type: 'ADD_FIRST_BOX_IN_ROOM',
            payload: {
                roomId: match.params.id
            }
        })
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 2000,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Added'
        })

    }
    //handle back to home button
    handleBackToRoomList = () => {
        console.log('BacktoRoomList clicked');
        this.props.history.push('/home');
    }

    render() {

        // Create the conditional for add new box, if the all of the room list is empty,
        // sending the ADD_FIRST_BOX action to server to create the first box have id = 1 
        // box_name = 1, qr_code = 1.
        // If inside a specific room is empty, 
        // sending the ADD_FIRST_BOX_IN_ROOM action to server to create the first box have id = increment number from the previous id,
        // box_name = 1, qr_code = 1.
        // if box list had a couple boxes, sending the ADD_BOX action to server to keep on 
        //increment number of id, box's name, qr_code, from the last row
        let addNewBox;
        if (this.props.reduxState.boxes.length === 0) {
            addNewBox = <button onClick={this.handleOnClickAddFirstBoxInRoom}
                className="add_new_box_btn">Add new box</button>
        } else {
            addNewBox = <button onClick={this.handleOnClickAddNewBox}
                className="add_new_box_btn">Add new box</button>
        }

        const { classes } = this.props;

        return (
            <div className="box_list_page">

                <Header />
                {/* Display room's name ‰
                Maping through the roomName array from reducer then return the room's name  */}
                {/* <Grid container spacing={1} justify="center">
                    <Button color="primary"> */}
                        {this.props.reduxState.roomName.map((room, index) => {
                            return (<h1 className="room_name_in_box_list">{room.room_name} </h1>)
                        })}
                    {/* </Button>
                </Grid> */}


                {/* Display box quantity in the room */}
                <p className="box_quantity">Box quantity: {this.props.reduxState.boxes.length}</p>


                {/* Mapping through tr boxes array that got from reducer and display boxes */}
                <div className={classes.root} >
                    <Grid container spacing={1} justify="center">
                        <Grid item >
                            <Grid className={classes.margin}>{addNewBox}</Grid>
                        </Grid>
                        {this.props.reduxState.boxes.map((box) => {
                            return (
                                <div key={box.id}>
                                    <Grid item  >
                                        <Grid className={classes.margin}> <Box box={box} /></Grid>
                                    </Grid>
                                </div>
                            )
                        })}
                    </Grid>

                </div>

                {/* <h1>{JSON.stringify(this.props.reduxState.allBox)}</h1> */}
            </div>
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(BoxList));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import DownloadQRCode from '../DownloadQRCode/DownloadQRCode';
import Item from '../Item/Item';
import './BoxDetail.css';
import Header from '../Nav/Header';
import Swal from 'sweetalert2';

import { fade, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';


const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: '300px',
        padding: '10px 12px',
        marginTop: '30px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${fade('#8f8681', 0.25)} 0 0 0 0.3rem`,
            borderColor: '#8f8681',
        },
    },
}))(InputBase);

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#c62828'),
        backgroundColor: '#c62828',
        '&:hover': {
            backgroundColor: '#c62828',
        },
    },

}))(Button);

const ColorButton1 = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#FFB92C'),
        backgroundColor: '#FFB92C',
        '&:hover': {
            backgroundColor: '#FFB92C',
        },
    },
}))(Button);

const useStyles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',

    },
    margin: {
        margin: theme.spacing(1),
    },

});




class BoxDetail extends Component {

    // create state to store the item data
    state = {
        item: '',
    }
    componentDidMount() {
        //Get box's data after refresh page by id
        const { dispatch, match } = this.props;
        dispatch({
            type: 'FETCH_DETAIL',
            payload: {
                id: match.params.id,
                roomId: match.params.roomId,
            }
        });
        //send FETCH_ITEMS action to Saga to get items of the box that user choosed
        dispatch({
            type: 'FETCH_ITEMS',
            payload: {
                id: match.params.id,
                roomId: match.params.roomId,
            }
        });
        console.log('--------->this is box id:', match.params.id)
        console.log('--------->this is room id:', match.params.roomId)
    }
    //handle come back list box page
    backClick = () => {
        const { match } = this.props;
        console.log('back clicked');
        this.props.history.push(`/boxes/${match.params.roomId}`)
    }
    //handle changing for add new item input field
    handleInputChangeFor = (event) => {
        // console.log('changing', event.target.value)
        this.setState({
            item: event.target.value,
        });
    }

    //handle add new item button
    handleAddNewItem = () => {
        const { dispatch, match } = this.props;
        console.log('add new item clicked!');
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                item: this.state.item,
                id: match.params.id,
                roomId: match.params.roomId,
            }
        })
    }

    handleClearInput = () => {
        this.setState({
            item: '',
        });
    }
    //handle add item and clear input field after clicked add button
    handleSubmit = () => {
        if (this.state.item === '') {
            alert('Add items to your list before click button')
        } else {
            this.handleAddNewItem();
            this.handleClearInput();
        }
    }

    keyPressed = (event) => {
        if (event.key === "Enter") {
            this.handleSubmit();
        }
    }
    //Create this function to send the roomId to item component to can delete the item inside the chosen box and room
    sendRoomIdToItem = (roomId) => {
        const { match } = this.props;
        return match.params.roomId
    }
    //handle delete box
    handleDeleteBox = () => {
        console.log('delete clicked');
        const { dispatch, match } = this.props;
        dispatch({
            type: 'DELETE_BOX',
            payload: {
                boxId: match.params.id,
                roomId: match.params.roomId,
            }
        })
        console.log('------->box id', match.params.id);
        //Bringing the user back to the box list after click on delete button
        this.props.history.push(`/boxes/${match.params.roomId}`)
    }
    //Using sweetAlert to confirm delete box
    Swal = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Deleted!',
                    'Your box has been deleted.',
                    'success'
                )
                this.handleDeleteBox();
            }
        })
    }

    //handle unbox
    handleUnBox = () => {
        console.log('unbox clicked');
        const { dispatch, match } = this.props;
        dispatch({
            type: 'UNBOX',
            payload: {
                boxId: match.params.id,
                roomId: match.params.roomId,
            }
        })
        console.log('------->box id', match.params.id);
        //Bringing the user back to the box list after click on delete button
        this.props.history.push(`/boxes/${match.params.roomId}`)
        //using SweetAlert2 to confirming that the box is unboxed
        Swal.fire({
            // title: '',
            width: 0,
            padding: '1em',
            background: 'rgba(216, 191, 216, 0) url()',
            // position: 'center',
            showConfirmButton: false,
            timer: 3000,
            backdrop: `
            #6a656154
             url("/images/unboxing_giphy.gif")
              center bottom
              no-repeat
            `
        })
    }

    render() {
        const { classes } = this.props;
        // let unboxBtnVisual;
        // let boxStatus = this.props.reduxState.detail.map((box) =>(box.status))
        // if (boxStatus === 'false') {
        //     unboxBtnVisual = <ColorButton1 onClick={this.handleUnBox} size="small" variant="contained" className={classes.margin}>Unbox</ColorButton1>
        // }else{
        //     unboxBtnVisual = <p>{this.props.reduxState.detail.map((box) =>(box.status))}</p>
        // }


        return (
            <div>
                <Header />

                <div className="box_detail">
                    {/* <h1>{JSON.stringify(this.props.reduxState.detail.map((box) => (box.status)))}</h1> */}
                    {/* <button onClick={this.backClick}
                        className="back_btn">Back to box list</button> */}
                    {/* mapping through the box list array to get room_id from database to display in DOM */}
                    {/* box's name condition for each room */}
                    {this.props.reduxState.detail.map((box) => {
                        let boxName;
                        if (box.room_name === 'Storage') {
                            boxName = <div key={box.id}>
                                <h1 onClick={this.backClick}>Storage</h1>
                                <p className="box_name">A{box.box_name}</p>
                                <DownloadQRCode
                                    box={box} />
                            </div>

                        } else if (box.room_name === 'Basement') {
                            boxName = <div key={box.id}>
                                <h1 onClick={this.backClick}>Basement</h1>
                                <p className="box_name">B{box.box_name}</p>
                                <DownloadQRCode
                                    box={box} />
                            </div>
                        }
                        else if (box.room_name === 'Garage') {
                            boxName = <div key={box.id}>
                                <h1 onClick={this.backClick}>Garage</h1>
                                <p className="box_name">C{box.box_name}</p>
                                <DownloadQRCode
                                    box={box} />
                            </div>
                        }
                        else if (box.room_name === 'Livingroom') {
                            boxName = <div key={box.id}>
                                <h1 onClick={this.backClick}>Livingroom</h1>
                                <p className="box_name">D{box.box_name}</p>
                                <DownloadQRCode
                                    box={box} />
                            </div>
                        }
                        else if (box.room_name === 'Bedroom') {
                            boxName = <div key={box.id}>
                                <h1 onClick={this.backClick}>Bedroom</h1>
                                <p className="box_name">E{box.box_name}</p>
                                <DownloadQRCode
                                    box={box} />
                            </div>
                        }
                        else if (box.room_name === 'Kitchen') {
                            boxName = <div key={box.id}>
                                <h1 onClick={this.backClick}>Kitchen</h1>
                                <p className="box_name">F{box.box_name}</p>
                                <DownloadQRCode
                                    box={box} />
                            </div>
                        }
                        return (
                            boxName
                        )
                    })}

                    {/* add new item input field */}
                    <FormControl className={classes.margin}>

                        <BootstrapInput
                            placeholder='Add item...'
                            id="bootstrap-input"
                            value={this.state.item}
                            onChange={this.handleInputChangeFor}
                            width="80%"
                            onKeyPress={this.keyPressed}
                        />
                    </FormControl>

                    {/* List items */}
                    <div className="list_item" >
                        {/* Mapping through the item array to display list item in DOM */}
                        {this.props.reduxState.item.map((item) => {
                            return (
                                <div key={item.id}
                                    className="item"
                                >
                                    <Item item={item}
                                        boxId={item.box_id}
                                        roomId={this.sendRoomIdToItem}
                                    />
                                </div>
                            )
                        })}
                        {/* <h1>{JSON.stringify(this.props.reduxState.detail)}</h1> */}
                    </div>

                    {/* The condition for unbox button, if the box's status is opening (true), the unbox button is disappear 
                    if the box's status is close(false), the button is appear*/}
                    {this.props.reduxState.detail.map((box) => {
                        let boxStatus;
                        if (!box.status) {
                            boxStatus = <ColorButton1 onClick={this.handleUnBox} size="small" variant="contained" className={classes.margin}>Unbox</ColorButton1>
                        }
                        return boxStatus;
                    })}

                    <ColorButton onClick={this.Swal} size="small" variant="contained" color="primary" className={classes.margin}>
                        Delete
                    </ColorButton>
                </div>
            </div>
        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(BoxDetail));

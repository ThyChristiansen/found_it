import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Item.css'

import {
    fade,
    withStyles,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';


const BootstrapInput = withStyles((theme) => ({
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: '260px',
        padding: '10px 10px',
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
const useStyles = (theme) => ({
    root: {
        // display: 'flex',
        // flexWrap: 'wrap',
        paddingLeft: '270px',
    },
    margin: {
        margin: theme.spacing(1),
    },

});



class Item extends Component {

    //Create a state to storing the item data and itemIsEditable
    state = {
        item: this.props.item.item,
        itemIsEditable: false
    }
    //handle delete button
    //when the user click on delete button, this function will send the DELETE_ITEM action to Saga
    handleDelete = () => {
        console.log('delete clicked');
        console.log('delelete this item by this id:', this.props.item.id)
        this.props.dispatch({
            type: 'DELETE_ITEM',
            payload: {
                itemId: this.props.item.id,
                boxId: this.props.item.box_id,
                roomId: this.props.roomId(this.props.item.id),
            }
        })
    }
    //handle change for add and edit item input field
    handleChangeFor = (event) => {
        this.setState({
            item: event.target.value,
        })
    }
    //Set the itemIsEditable property in state to be true so that when the user click on 
    //the edit item button, the input field and button save will display
    editItem = () => {
        this.setState({
            itemIsEditable: true,
        });
    }
    // handle for Save button, when the user click on the Save button,
    // this function will send the UPDATE_ITEM action to Saga the perform to update the item after user changing 
    saveItem = () => {
        this.setState({
            itemIsEditable: false,
        });
        this.props.dispatch({
            type: 'UPDATE_ITEM',
            payload: {
                itemId: this.props.item.id,
                item: this.state.item,
                boxId: this.props.item.box_id,
            }
        })
    }
    keyPressed = (event) => {
        if (event.key === "Enter") {
            this.saveItem();
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="item_detail">
                {/* if itemIsEditable is true, displaying the input field and Save Item button
                if itemIsEditable is false, displaying item's contend and the Edit Item button as well */}
                {this.state.itemIsEditable ?
                    <>
                        <span>
                            {/* <input
                            value={this.state.item}
                            onChange={this.handleChangeFor}
                        /> */}
                            <FormControl className={classes.margin}>
                                <BootstrapInput
                                    id="bootstrap-input"
                                    value={this.state.item}
                                    onChange={this.handleChangeFor}
                                    width="80%"
                                    onKeyPress={this.keyPressed}
                                />
                            </FormControl>

                        </span>
                    </>
                    :
                    <>
                        <div className="input_item" onClick={this.editItem}>{this.state.item}</div>
                    </>
                }
                {/* <HighlightOffIcon onClick={this.handleDelete} className={classes.root} /> */}
                <img src="images/cancel.png"
                    alt="room_icon"
                    width="20px"
                    height="20px"
                    onClick={this.handleDelete}
                    className='delete_button'
                ></img>
            </div>
        )
    }
}
export default connect()(withStyles(useStyles)(Item));

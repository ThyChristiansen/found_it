import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Item.css'

class Picture extends Component {

    //Create a state to storing the item data and itemIsEditable
    state = {
        picture: this.props.item.item,
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
            
            </div>
        )
    }
}
export default connect()(Picture);

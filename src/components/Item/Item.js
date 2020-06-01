import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Item.css'

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

    render() {
        return (
            <div className="item_detail">
                {/* if itemIsEditable is true, displaying the input field and Save Item button
                if itemIsEditable is false, displaying item's contend and the Edit Item button as well */}
                {this.state.itemIsEditable ?
                    <>
                        <span><input
                            value={this.state.item}
                            onChange={this.handleChangeFor}
                            className="input_item"
                        /></span>
                        <button onClick={this.saveItem}>Save Item</button>
                    </>
                    :
                    <>
                        <span className="input_item">{this.state.item}</span>
                        <button onClick={this.editItem}>Edit Item</button>
                    </>
                }
                <button onClick={this.handleDelete}>Delete</button>
            </div>
        )
    }
}
export default connect()(Item);
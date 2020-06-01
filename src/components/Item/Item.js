import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Item.css'

class Item extends Component {

    state = {
        item: this.props.item.item,
        itemIsEditable: false
    }

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

    handleChangeFor = (event) => {
        this.setState({
            item: event.target.value,
        })
    }

    editItem = () => {
        this.setState({
            itemIsEditable: true,
        });
    }
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
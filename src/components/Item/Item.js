import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Item.css'

class Item extends Component {

    state = {
        item:this.props.item.item,
        itemIsEditable: false
    }

    handleDeleteItem = () => {
        console.log('delete clicked');
        this.props.dispatch({
            type: 'DELETE_ITEM',
            payload: {
                itemId: this.props.item.id,
                boxId: this.props.item.box_id
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
                boxId: this.props.item.box_id
            }
        })
      }

    render() {
        return (
            <div className = "item_detail">
                {this.state.itemIsEditable ?
                    <>
                        <p><input 
                        value = {this.state.item}
                        onChange={this.handleChangeFor} 
                        className = "input_item"
                        /></p>
                        <button onClick={this.saveItem}>Save Item</button>
                    </>
                    :
                    <>
                        <p className = "input_item">{this.state.item}</p>
                        <button onClick={this.editItem}>Edit Username</button>
                    </>
                }
                {/* <p>{this.props.item.item}</p><button>Edit</button> */}
                <button onClick={this.handleDeleteItem}>Delete</button>
                {/* <h1>{JSON.stringify(this.props.item.box_id)}</h1> */}
            </div>
        )
    }
}
export default connect()(Item);
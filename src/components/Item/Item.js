import React, { Component } from 'react';
import { connect } from 'react-redux';



class Item extends Component {

    componentDidMount() {
        //save data after refresh page by id
       
    }

    handleDeleteItem = () => {
        console.log('delete clicked');
        this.props.dispatch({
            type: 'DELETE_ITEM',
            payload: {
                itemId : this.props.item.id,
                boxId: this.props.item.box_id
            }
        })

    }

    render() {
        return (
            <div>
               {this.props.item.item}<button>Edit</button>
               <button onClick={this.handleDeleteItem}>Delete</button>
               {/* <h1>{JSON.stringify(this.props.item.box_id)}</h1> */}

            </div>
        )
    }
}
export default connect()(Item);
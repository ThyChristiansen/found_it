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
            payload: this.props.item.id
        })

    }

    render() {
        return (
            <div>
               {this.props.item.item}<button>Edit</button>
               <button onClick={this.handleDeleteItem}>Delete</button>
               {/* <span><button>Delete</button></span> */}
            </div>
        )
    }
}
export default connect()(Item);
import React, { Component } from 'react';
import { connect } from 'react-redux';



class Item extends Component {

    componentDidMount() {
        //save data after refresh page by id
       
    }

    render() {
        return (
            <div>
               {this.props.item.item}<button>Edit</button><button>Delete</button>
               {/* <span><button>Delete</button></span> */}
            </div>
        )
    }
}
export default connect()(Item);
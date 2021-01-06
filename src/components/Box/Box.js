import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";


class Box extends Component {

    handleClick = () => {
        // console.log('clicked');
        this.props.history.push(`/box-detail/${this.props.box.room_id}/${this.props.box.id}`)
    }

    render() {
        // box's name condition for each room 
        let boxName;
        if (this.props.box.room_name === 'Storage') {
            boxName = <p className="box_name_in_box_list">A{this.props.box.box_name}</p>
        } if (this.props.box.room_name === 'Basement') {
            boxName = <p className="box_name_in_box_list">B{this.props.box.box_name}</p>
        }
        if (this.props.box.room_name === 'Garage') {
            boxName = <p className="box_name_in_box_list">C{this.props.box.box_name}</p>
        }
        if (this.props.box.room_name === 'Livingroom') {
            boxName =
                <p className="box_name_in_box_list">D{this.props.box.box_name}</p>
        }
        if (this.props.box.room_name === 'Bedroom') {
            boxName =
                <p className="box_name_in_box_list">E{this.props.box.box_name}</p>
        }
        if (this.props.box.room_name === 'Kitchen') {
            boxName =
                <p className="box_name_in_box_list">F{this.props.box.box_name}</p>
        }

        //Use if condition to change the box visual if they was opened or not yet
        let boxStatus;
        if (this.props.box.status) {
            boxStatus = <img
                src="images/box_opening2.png"
                alt={this.props.box.box_name}
                className="box_icon"
                width="85"
                height="85"
            />
        } else {
            boxStatus = <img
                src="images/box_icon.png"
                alt={this.props.box.box_name}
                className="box_icon"
                width="85"
                height="85"
            />
        }

        return (
            <div>
                {/* <p>{JSON.stringify(this.props.box.status)}</p> */}
                {/* Assigning the link to box icon to navigating user to box's detail page  */}
                <div className= "item_box_inbox_list"onClick={this.handleClick}>
                    {boxStatus}
                    {boxName}
                </div>
            </div>
        )
    }
}
export default withRouter(connect()(Box));

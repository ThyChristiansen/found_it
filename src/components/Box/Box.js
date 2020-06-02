import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Box extends Component {

    render() {
        // box's name condition for each room 
        let boxName;
        if (this.props.box.room_name === 'Storage') {
            boxName = <p className="box_name">A{this.props.box.box_name}</p>
        } if (this.props.box.room_name === 'Basement') {
            boxName = <p className="box_name">B{this.props.box.box_name}</p>
        }
        if (this.props.box.room_name === 'Garage') {
            boxName = <p className="box_name">C{this.props.box.box_name}</p>
        }
        if (this.props.box.room_name === 'Livingroom') {
            boxName =
                <p className="box_name">D{this.props.box.box_name}</p>
        }
        if (this.props.box.room_name === 'Bedroom') {
            boxName =
                <p className="box_name">E{this.props.box.box_name}</p>
        }
        if (this.props.box.room_name === 'Kitchen') {
            boxName =
                <p className="box_name">F{this.props.box.box_name}</p>
        }

        let boxStatus;
        if (this.props.box.status === "FALSE") {
            boxStatus= <img
                src="images/box_icon.png"
                alt={this.props.box.box_name}
                className="box_icon"
                width="60"
                height="60"
            />
        } else {
            boxStatus= <img
                src="images/box_opening.png"
                alt={this.props.box.box_name}
                className="box_icon"
                width="60"
                height="60"
            />
        }

        return (
            <div>
                <p>{JSON.stringify(this.props.box.status)}</p>
                {/* Assigning the link to box icon to navigating user to box's detail page  */}
                <Link to={`/box-detail/${this.props.box.room_id}/${this.props.box.id}`}>
                    {/* <img
                        src="images/box_icon.png"
                        alt={this.props.box.box_name}
                        className="box_icon"
                        width="60"
                        height="60"
                    /> */}
                    {boxStatus}
                </Link>
                <p>{boxName}</p>
            </div>
        )
    }
}
export default connect()(Box);
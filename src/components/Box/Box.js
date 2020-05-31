import React, { Component } from 'react';
import { HashRouter,Route, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import BoxDetail from '../BoxDetail/BoxDetail';



class Box extends Component {

    componentDidMount() {
    }

    render() {
        // box's name condition for each room 
        let boxName;
        if (this.props.box.room_name === 'Storge') {
            boxName = <p className="box_name">Box A{this.props.box.box_name}</p>
        } else if (this.props.box.room_name === 'Basement') {
            boxName = <p className="box_name">Box B{this.props.box.box_name}</p>
        }
        else if (this.props.box.room_name === 'Garage') {
            boxName = <p className="box_name">Box C{this.props.box.box_name}</p>
        }
        else if (this.props.box.room_name === 'Livingroom') {
            boxName =
                <p className="box_name">Box D{this.props.box.box_name}</p>
        }
        else if (this.props.box.room_name === 'Bedroom') {
            boxName =
                <p className="box_name">Box E{this.props.box.box_name}</p>
        }
        else if (this.props.box.room_name === 'Kitchen') {
            boxName =
                <p className="box_name">Box F{this.props.box.box_name}</p>
        }

        return (
            <div>
                {/* <p>{JSON.stringify(this.props.box.id)}</p> */}
                <Link to={`/box-detail/${this.props.box.room_id}/${this.props.box.id}`}>
                    <img
                        src="images/box_icon.png"
                        alt={this.props.box.box_name}
                        className="box_icon"
                        width="60"
                        height="60"
                    />
                </Link>
                <p>{boxName}</p>
            </div>
        )
    }
}
export default connect()(Box);
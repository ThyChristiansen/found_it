import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



class Box extends Component {

    componentDidMount() {
    }

    handleDeleteBox = () => {
        console.log('delete clicked');
        this.props.dispatch({
            type: 'DELETE_BOX',
            payload: {
                boxId: this.props.box.id,
                roomId: this.props.box.room_id
            }
        })
        console.log('------>from delete box client, room id:',this.props.box.room_id )

    }
    render() {
        return (
            <div>
                {/* <p>{JSON.stringify(this.props.boxdata.box_name)}</p> */}
                <Link to={`/box-detail/${this.props.box.room_id}/${this.props.box.id}`}>
                    <img
                        src="images/box_icon.png"
                        alt={this.props.box.box_name}
                        className="box_icon"
                        width="60"
                        height="60"
                    />
                </Link>
                <button onClick={this.handleDeleteBox}>Delete Box</button>
                <p>A{this.props.box.box_name}</p>


            </div>
        )
    }
}
export default connect()(Box);
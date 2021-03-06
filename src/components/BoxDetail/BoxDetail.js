import React, { Component } from "react";
import { connect } from "react-redux";
import DownloadQRCode from "../DownloadQRCode/DownloadQRCode";
import Item from "../Item/Item";
import "./BoxDetail.css";
import Header from "../Header/Header";
import Swal from "sweetalert2";
// import UppyComp from '../UppyComp/UppyComp';

import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "230px",
    padding: "10px 12px",
    marginTop: "30px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
}))(InputBase);

const ColorButtonDelete = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#c62828"),
    backgroundColor: "#c62828",
    "&:hover": {
      backgroundColor: "#c62828",
    },
    boxShadow: "9px 9px 16px #0000004c, -9px -9px 16px rgb(250, 250, 250)",
  },
}))(Button);

const ColorButtonUnbox = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#FFB92C"),
    backgroundColor: "#FFB92C",
    "&:hover": {
      backgroundColor: "#FFB92C",
    },
    boxShadow: "9px 9px 16px #0000004c, -9px -9px 16px rgb(250, 250, 250)",
  },
}))(Button);

const ColorButtonAdd = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#558B2F"),
    backgroundColor: "#558B2F",
    "&:hover": {
      backgroundColor: "#558B2F",
    },
    boxShadow: "9px 9px 16px #0000004c, -9px -9px 16px rgb(250, 250, 250)",
  },
}))(Button);

const useStyles = (theme) => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
    marginTop: "20px",
  },
  width: {
    marginTop: "15px",
    marginLeft: "80px",
    marginRight: "80px",
    marginBottom: "15px",
    margin: theme.spacing(1),
    align: "center",
  },
  boxDetail:{
    textAlign: "center",
    border: "1px solid #eeebeb",
    borderRadius: "10px",
    margin: "20px",
    boxShadow: "9px 9px 16px #0000004c, -9px -9px 16px rgb(250, 250, 250)",
    backgroundColor:"#eeebeb",
    paddingBottom: "20px",

},
  boxName:{
    textAlign: "center",
    backgroundColor: "rgb(209, 212, 208)",
    color: "black",
    fontSize: "20px",
    padding:"3px 15px",
    borderRadius: "5px",
    margin:"5px 7px 20px 5px",
},
  listItem: {
    textAlign: "center",
    backgroundColor: "#8f86816b",
    padding: "5px",
    border: "1px solid gray",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    margin:"0 40%"
  },
  item: {
    backgroundColor: "rgb(255, 255, 255)",
    textAlign: "left",
    margin: "5px",
    border:"1px solid rgb(197, 197, 197)",
    borderRadius: "5px",
    /* break-inside: auto; */
    /* display: flex; */
    /* flex-wrap: wrap; */
    float: "left"
    /* overflow-wrap: break-word; */
}
});

class BoxDetail extends Component {
  // create state to store the item data
  state = {
    item: "",
    file: "",
  };
  componentDidMount() {
    //Get box's data after refresh page by id
    const { dispatch, match } = this.props;
    dispatch({
      type: "FETCH_DETAIL",
      payload: {
        id: match.params.id,
        roomId: match.params.roomId,
      },
    });
    //send FETCH_ITEMS action to Saga to get items of the box that user choosed
    dispatch({
      type: "FETCH_ITEMS",
      payload: {
        id: match.params.id,
        roomId: match.params.roomId,
      },
    });
    // console.log('--------->this is box id:', match.params.id)
    // console.log('--------->this is room id:', match.params.roomId)
    // console.log('--------->picture:', this.state.picture)
  }
  //handle come back list box page
  backClick = () => {
    const { match } = this.props;
    // console.log('back clicked');
    this.props.history.push(`/box-list/${match.params.roomId}`);
  };
  //handle changing for add new item input field
  handleInputChangeFor = (event) => {
    // console.log('changing', event.target.value)
    this.setState({
      item: event.target.value,
    });
  };

  handlePictureChangeFor = (event) => {
    // console.log('changing', event.target.files[0])
    this.setState({
      file: event.target.files[0],
    });
  };

  //handle add new item button
  handleAddNewItem = () => {
    const { dispatch, match } = this.props;
    // console.log('add new item clicked!');
    dispatch({
      type: "ADD_ITEM",
      payload: {
        file: this.state.file,
        itemData: {
          item: this.state.item,
          id: match.params.id,
          roomId: match.params.roomId,
        },
      },
    });
  };

  handleClearInput = () => {
    this.setState({
      item: "",
      file: "",
    });
  };

  //handle add item and clear input field after clicked add button
  handleSubmit = () => {
    if (this.state.item === "") {
      alert("Add items to your list before click button");
    } else {
      this.handleAddNewItem();
      this.handleClearInput();
    }
  };

  // keyPressed = (event) => {
  //     if (event.key === "Enter") {
  //         this.handleSubmit();
  //     }
  // }
  //Create this function to send the roomId to item component to can delete the item inside the chosen box and room
  sendRoomIdToItem = () => {
    const { match } = this.props;
    return match.params.roomId;
  };
  //handle delete box
  handleDeleteBox = () => {
    // console.log('delete clicked');
    const { dispatch, match } = this.props;
    dispatch({
      type: "DELETE_BOX",
      payload: {
        boxId: match.params.id,
        roomId: match.params.roomId,
      },
    });
    // console.log('------->box id', match.params.id);
    //Bringing the user back to the box list after click on delete button
    this.props.history.push(`/box-list/${match.params.roomId}`);
  };
  //Using sweetAlert to confirm delete box
  Swal = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          text: "Deleted!",
          width: 150,
          padding: "1em",
          background: "#fff url()",
          showConfirmButton: false,
          timer: 1500,
        });
        this.handleDeleteBox();
      }
    });
  };
  //handle unbox
  handleUnBox = () => {
    // console.log('unbox clicked');
    const { dispatch, match } = this.props;
    dispatch({
      type: "UNBOX",
      payload: {
        boxId: match.params.id,
        roomId: match.params.roomId,
      },
    });
    // console.log('------->box id', match.params.id);
    //Bringing the user back to the box list after click on delete button
    this.props.history.push(`/box-list/${match.params.roomId}`);
    //using SweetAlert2 to confirming that the box is unboxed
    Swal.fire({
      // title: '',
      width: 0,
      padding: "1em",
      background: "rgba(216, 191, 216, 0) url()",
      showConfirmButton: false,
      timer: 3000,
      backdrop: `
            #6a656154
             url("/images/unboxing_giphy.gif")
              center bottom
              no-repeat
            `,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Header />
        <div className={classes.boxDetail}>
          {/* <h2>{JSON.stringify(this.props.reduxState.detail.map((box) => (box.status)))}</h2> */}
          {/* mapping through the box list array to get room_id from database to display in DOM */}
          {/* box's name condition for each room */}
          {this.props.reduxState.detail.map((box) => {
            let boxName;
            if (box.room_name === "Storage") {
              boxName = (
                <div key={box.id}>
                  <h2 onClick={this.backClick} className="room_name">
                    Storage
                  </h2>
                  <p className={classes.boxName}>A{box.box_name}</p>
                  <DownloadQRCode box={box} />
                </div>
              );
            } else if (box.room_name === "Basement") {
              boxName = (
                <div key={box.id}>
                  <h2 onClick={this.backClick} className="room_name">
                    Basement
                  </h2>
                  <p className={classes.boxName}>B{box.box_name}</p>
                  <DownloadQRCode box={box} />
                </div>
              );
            } else if (box.room_name === "Garage") {
              boxName = (
                <div key={box.id}>
                  <h2 onClick={this.backClick} className="room_name">
                    Garage
                  </h2>
                  <p className={classes.boxName}>C{box.box_name}</p>
                  <DownloadQRCode box={box} />
                </div>
              );
            } else if (box.room_name === "Livingroom") {
              boxName = (
                <div key={box.id}>
                  <h2 onClick={this.backClick} className="room_name">
                    Livingroom
                  </h2>
                  <p className={classes.boxName}>D{box.box_name}</p>
                  <DownloadQRCode box={box} />
                </div>
              );
            } else if (box.room_name === "Bedroom") {
              boxName = (
                <div key={box.id}>
                  <h2 onClick={this.backClick}>Bedroom</h2>
                  <p className={classes.boxName}>E{box.box_name}</p>
                  <DownloadQRCode box={box} />
                </div>
              );
            } else if (box.room_name === "Kitchen") {
              boxName = (
                <div key={box.id}>
                  <h2 onClick={this.backClick} className="room_name">
                    Kitchen
                  </h2>
                  <p className={classes.boxName}>F{box.box_name}</p>
                  <DownloadQRCode box={box} />
                </div>
              );
            }
            return boxName;
          })}

          {/* add new item input field */}
          <FormControl className={classes.margin}>
            <BootstrapInput
              placeholder="Add item..."
              id="bootstrap-input"
              value={this.state.item}
              onChange={this.handleInputChangeFor}
              onKeyPress={this.keyPressed}
            />

            <input
              type="file"
              onChange={this.handlePictureChangeFor}
              accept="image/*"
            />

            {/* <UppyComp /> */}
            <ColorButtonAdd
              onClick={this.handleSubmit}
              className={classes.width}
              size="small"
              variant="contained"
            >
              Add
            </ColorButtonAdd>
          </FormControl>

          {/* List items */}
          <Grid container justify="center">
            <div className={classes.listItem}>
              {/* Mapping through the item array to display list item in DOM */}
              {this.props.reduxState.item.map((item) => {
                return (
                  <div key={item.id} className={classes.item}>
                    <Item
                      item={item}
                      boxId={item.box_id}
                      roomId={this.sendRoomIdToItem}
                    />
                  </div>
                );
              })}
            </div>
          </Grid>

          {/* The condition for unbox button, if the box's status is opening (true), the unbox button is disappear 
                    if the box's status is close(false), the button is appear*/}
          {this.props.reduxState.detail.map((box) => {
            let boxStatus;
            if (!box.status) {
              boxStatus = (
                <ColorButtonUnbox
                  onClick={this.handleUnBox}
                  size="small"
                  variant="contained"
                  className={classes.margin}
                >
                  Unbox
                </ColorButtonUnbox>
              );
            }
            return boxStatus;
          })}
          {/* <button className="buttons"> */}
          <ColorButtonDelete
            onClick={this.Swal}
            size="small"
            variant="contained"
            color="primary"
            className={classes.margin}
          >
            Delete
          </ColorButtonDelete>
          {/* </button> */}
        </div>
      </div>
    );
  }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(BoxDetail));

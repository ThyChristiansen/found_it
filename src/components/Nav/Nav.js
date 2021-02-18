import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//import './Nav.css';
import LogOut from "../LogOutButton/LogOutButton";

//-----------------------Styling----------------------------------
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
//-----------------------Styling----------------------------------

const useStyles = (theme) => ({
  list: {
    width: 550,
  },
  fullList: {
    width: "auto",
  },
});

function SwipeableNav(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Home", "Scanner", "About"].map((text, index) => {
          let path = `/${text.split(" ").join("").toLowerCase()}`;
          return (
            <ListItem button key={text}>
              {props.user.id && (
                <>
                  <Link className="nav-link" to={path}>
                    <ListItemText primary={text} />{" "}
                  </Link>
                  <br />
                </>
              )}
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        {["Log out"].map((text, index) => (
          <ListItem button key={text}>
            {props.user.id && <LogOut className="logOut-btn" />}
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <Button onClick={toggleDrawer("left", true)}>
          {" "}
          <MenuIcon />
        </Button>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
          className={classes.background}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)((SwipeableNav));

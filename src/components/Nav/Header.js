import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Nav.css';
import Nav from '../Nav/Nav'
import SearchingBar from '../SearchBar/SearchBar';
//-----------------------Styling----------------------------------
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { withStyles } from '@material-ui/core/styles';
//-----------------------Styling----------------------------------

const styles = {
    root: {
        paddingBottom: '10px',
    },
};

class Header extends Component {
    state = {
        menu: false,
    }

    handleShowNav = () => {
        console.log('click!')
        this.setState({
            menu: !this.state.menu
        })
    }

    render() {
        //Create if statement to hide and show nav table drop down
        let menu;
        if (this.state.menu) {
            menu = <Nav />
        }
        const { classes } = this.props;


        return (
            <div className="header">
                <div>
                    {this.props.user.id && (
                        <>
                            {/* Assigning link for header */}
                            <Link className="nav-title" to="/home">
                                <h3>FOUND IT</h3>
                            </Link><br />
                            {/* Table menu drop down */}
                            <span onClick={this.handleShowNav}
                                className="menu"
                            > <ArrowDropDownIcon
                                    onClick={this.handleShowNav}
                                    className={classes.root}
                                /></span>

                            {menu}
                            <div className='search_bar'><SearchingBar /></div>

                        </>
                    )}
                </div>
            </div>
        )
    }
}



const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Header));

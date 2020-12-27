import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Drawer, Divider, IconButton } from '@material-ui/core'
import { ChevronRightRounded, ChevronLeftRounded } from '@material-ui/icons'
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import DrawerMenu from '../DrawerMenu/DrawerMenu'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import { drawerWidthMultiplier } from '../../utils/constants'

const styles = ({ transitions, spacing, mixins }) => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: spacing.unit * drawerWidthMultiplier,
    transition: transitions.create('width', {
      easing: transitions.easing.sharp,
      duration: transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: transitions.create('width', {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen
    }),
    width: spacing.unit * 8.5
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px',
    ...mixins.toolbar
  },
  large: {
    width: '100px',
    height: '50px',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  }
})


function SideDrawer({ classes, open, history, theme, routes, handleDrawerState }) {
  // function handleClick() {
  //   let path = `/home/`; 
  //     history.push(path);
  // }
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(
          classes.drawerPaper,
          !open && classes.drawerPaperClose
        )
      }}
      open={open}
    >
      <div className={classes.toolbar}>
      <Link to="/home/" className="btn btn-primary">
        <Avatar variant = 'rounded' align="center" alt="Remy Sharp" src="https://registermeb4199c63db0c4b65aede01a2b710dd82205953-dev.s3.amazonaws.com/public/logo.png"  className={classes.large} />
        </Link>
        <IconButton onClick={handleDrawerState}>
          {theme.direction === 'rtl' ? (
            <ChevronRightRounded />
          ) : (
            <ChevronLeftRounded />
          )}
        </IconButton>
      </div>
      <Divider />
      <DrawerMenu routes={routes} isDrawerOpen={open} />
    </Drawer>
  )
}

export default withStyles(styles)(SideDrawer)

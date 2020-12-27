import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { useHistory } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge
} from '@material-ui/core'
import { Auth } from 'aws-amplify';
import {
  MenuRounded,
  NotificationsRounded,
  MoreRounded,
  ExitToAppRounded
} from '@material-ui/icons'

import styles from './Toolbar.styles'

const AppToolbar = ({
  classes,
  isMenuOpen,
  open,
  isTop,
  handleDrawerState,
  handleProfileMenuOpen,
  handleMobileMenuOpen,
  handleLogout,
  changeTheme,
  children
}) => {
  const history = useHistory();

  async function handlelogout() {
    await Auth.signOut();
  
    // userHasAuthenticated(false);
  
    history.push("/home/");
  }

return (
  <AppBar
    position="absolute"
    className={classNames(classes.appBar, open && classes.appBarShift)}
  >
    <Toolbar disableGutters={!open}>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={handleDrawerState}
        className={classNames(classes.menuButton, open && classes.hide)}
      >
        <MenuRounded />
      </IconButton>
      <Typography
        className={classes.title}
        variant="h4"
        color="inherit"
        align="center"
        noWrap
      >
        Welcome back!
      </Typography>
      <div className={classes.grow} />
      <div className={classes.sectionDesktop}>
        {/* <IconButton color="inherit">
          <Badge className={classes.margin} badgeContent={4} color="secondary">
            <MailRounded />
          </Badge>
        </IconButton> */}
        <Tooltip TransitionComponent={Zoom} title="Your messages" arrow>
        <IconButton color="inherit">
          <Badge
            className={classes.margin}
            badgeContent={2} // showing number of messages
            color="secondary"
            // onClick={handleProfileMenuOpen}

          >
            <NotificationsRounded />
          </Badge>
        </IconButton>
        </Tooltip>
        
        {/* <IconButton
          aria-owns={isMenuOpen ? 'material-appbar' : null}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircleRounded />
        </IconButton> */}
        <Tooltip TransitionComponent={Zoom} title="Log out" arrow>
          <IconButton onClick={handlelogout} color="inherit">
            <ExitToAppRounded />
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreRounded />
        </IconButton>
      </div>
    </Toolbar>
    {children}
  </AppBar>
)
      }

export default withStyles(styles)(AppToolbar)

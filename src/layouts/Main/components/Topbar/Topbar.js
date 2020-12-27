import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Hidden,
  List,
  ListItem,
  IconButton,
  Button,
  colors,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Auth } from "aws-amplify";
//import { Hub } from 'aws-amplify';
import { Image } from "../../../../components/atoms";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    background: theme.palette.white,
    borderBottom: `1px solid ${colors.grey[200]}`,
  },
  flexGrow: {
    flexGrow: 1,
  },
  button: {
    boxShadow: "none",
    padding: "10px",
  },
  navigationContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toolbar: {
    // maxWidth: 1900,
    width: "100%",
    margin: "0 auto",
    padding: theme.spacing(0, 3),
    backgroundColor: "#f5f5f5",
  },
  listItem: {
    cursor: "pointer",
    "&:hover > .menu-item, &:hover svg": {
      color: theme.palette.primary.dark,
    },
  },
  iconButton: {
    padding: 0,
    "&:hover": {
      background: "transparent",
    },
  },
  logoContainer: {
    width: 140,
    height: 80,
    [theme.breakpoints.up("md")]: {
      width: 140,
      height: 80,
    },
  },
  buttons: {
    width: "100%",
    height: "100%",
    margin: theme.spacing(1),
  },
}));

const Topbar = (props) => {
  const { history, className, onSidebarOpen, pages, ...rest } = props;
  const classes = useStyles();
  
  let [user, setUser] = useState(null);
  useEffect(() => {
    let updateUser = async (authState) => {
      try {
        let user = await Auth.currentAuthenticatedUser();
        setUser(user);
      } catch {
        setUser(null);
      }
    };
    //Hub.listen('auth', updateUser) // listen for login/signup events
    updateUser(); // check manually the first time because we won't get a Hub event
    ////return () => Hub.remove('auth', updateUser) // cleanup
  }, []);

//----------------------------------------------------------------------------------
  const [ProfileData, setUserContext] = useState([]);
  useEffect(()=>{
    getDataFromAWSAuthincatedUsers();
  },[]);

  async function getDataFromAWSAuthincatedUsers(){
    const currentUser = await Auth.currentAuthenticatedUser();
      const userId = await currentUser.signInUserSession.accessToken.payload.sub;
      console.log(currentUser.attributes.given_name);
      const user_email = currentUser.attributes.email;
   
      setUserContext({ userId: userId } );
  }
//----------------------------------------------------------------------------------------------------


  async function signOut() {
    try {
      await Auth.signOut();
      history.push("/")
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  return (
    <AppBar
      {...rest}
      position="relative"
      className={clsx(classes.root, className)}
    >
      <Toolbar disableGutters className={classes.toolbar}>
        <div className={classes.logoContainer}>
          <a href="/" title="">
            <Image
              className={classes.logoImage}
              src="https://registermeb4199c63db0c4b65aede01a2b710dd82205953-dev.s3.amazonaws.com/public/logo.png"
              alt=""
              lazy={false}
            />
          </a>
        </div>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <div>
            <List className={classes.navigationContainer}>
              {user === null ? (
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  component="a"
                  href="/signin"
                >
                  Sign In
                </Button>
              ) : (
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  component="a"
                  // href="/account"
                  href={`/account/${ProfileData.userId}`}
                >
                  Dashboard
                </Button>
              )}
              &nbsp; &nbsp; &nbsp;
              {/* <ListItem className={classes.listItem}> */}
              {user === null ? (
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  component="a"
                  href="/signup"
                >
                  Signup
                </Button>
              ) : (
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  component="a"
                  onClick={signOut}
                >
                  Signout
                </Button>
              )}
              {/* </ListItem> */}
              {/* <ListItem className={classes.listItem}> */}
              &nbsp; &nbsp; &nbsp;
              {/* </ListItem> */}
            </List>
          </div>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            className={classes.iconButton}
            onClick={onSidebarOpen}
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;


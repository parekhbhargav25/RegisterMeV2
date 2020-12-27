import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { SectionHeader } from "../../../../components/molecules";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import React from "react";
import ReactSearchBox from "react-search-box";
import Image from "./63622771-seamless-pattern-hand-drawn-doodle-hair-salon-icons-set.jpg";
import { useHistory } from "react-router-dom";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import Paper from '@material-ui/core/Paper';
import { Opacity } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  root: {},
  typed: {
    fontWeight: "bold",
  },
}));
const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundColor: "#fafafa",
    fadeDuration: 0,
    height: 650,
  },
};

const Hero = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const data = [
    {
      key: "john",
      value: "John Doe",
    },
    {
      key: "jane",
      value: "Jane Doe",
    },
    {
      key: "mary",
      value: "Mary Phillips",
    },
    {
      key: "robert",
      value: "Robert",
    },
    {
      key: "karius",
      value: "Karius",
    },
  ];
  const history = useHistory();
  const routeChange = () => {
    let path = `/signin`;
    history.push(path);
  };
  const { className, ...rest } = props;
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.root, className)}
      style={styles.paperContainer}
      {...rest}
    >
      <ScopedCssBaseline
        style={{
          paddingTop: 150,
          marginLeft: 100,
          marginRight: 100,
          marginBottom: 20,
          backgroundImage: `url(${Image})`,
        }}
      >
        {/* <ReactSearchBox
          placeholder="Search for salon .."
          dropDownBorderColor="lightblue"
          inputBoxBorderColor="#212121"
          inputBoxHeight="80px"
          inputBoxFontSize="20px"
          // inputBoxBorderColor="green"
          dropDownHoverColor="lightgreen"
          // style={{ length: 50 }}
          data={data}
          //Selcting business wil take user to appointment booking page
          onSelect={routeChange}
          onFocus={() => {
            console.log("This function is called when is focussed");
          }}
          onChange={(value) => console.log(value)}
          fuseConfigs={{
            threshold: 1,
          }}
          // value="John"
        /> */}
      </ScopedCssBaseline>
      {/* <br></br> */}
      {/* <Divider /> */}

      <SectionHeader
      style={{
        backgroundColor: "#fafafa",
        opacity: "0.94"
      }}
        title={
          <>
            Seneca PRJ666 2020 RegisterMe
            <br />
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="/salons"
            >
              Find a Salon
            </Button>
          </>
        }
        // subtitle="Team 2: RegisterMe" 
        align="center"
        titleProps={{
          variant: "h2",
          color: "textPrimary",
        }}
        subtitleProps={{
          color: "textPrimary",
          variant: "h2",
        }}
        data-aos="fade-up"
        disableGutter
      />
    </div>
  );
};

Hero.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Hero;

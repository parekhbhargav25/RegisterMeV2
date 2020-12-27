import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SectionAlternate } from "../../components/organisms";

import { FeaturedBusinesses } from "./components";

//Import the libraries to access the DB
import { API, graphqlOperation, Storage } from "aws-amplify";
//The mutation file contains all of the code for CRUD operations.

//Import all query scripts
import * as queries from "../../graphql/queries";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
    width: "auto",
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
}));

const ListAllBusinesses = () => {
  const [businessesData, setBusinessesData] = useState([]);

  useEffect(() => {
    getDataFromDB();
  }, []);

  async function getDataFromDB() {
    const allBusinessesData = await API.graphql(
      graphqlOperation(queries.listBusinessProfiles)
    );
    const data = allBusinessesData.data.listBusinessProfiles.items;
    await Promise.all(
      data.map(async (business) => {
        if (business.businessImg) {
          const imageUrl = await Storage.get(business.businessImg);
          business.businessImg = imageUrl;
        }
        return business;
      })
    );
    setBusinessesData(allBusinessesData.data.listBusinessProfiles.items);
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SectionAlternate>
        <FeaturedBusinesses data={businessesData} />
      </SectionAlternate>
    </div>
  );
};

export default ListAllBusinesses;

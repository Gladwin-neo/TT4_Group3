import React, { useState, useEffect } from "react";
import { Typography } from '@material-ui/core';
import { useSelector } from "react-redux";
import {mockNewsParagraph} from "../mockdata/mockNewsData";
import { 
  Box,
  Checkbox,
  Grid,
  TablePagination,
  makeStyles,
} from "@material-ui/core";

const user = JSON.parse(localStorage.getItem("user"));

const Home = (props) => {
  const [content, setContent] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  const [newsContext, setNewsContext] = useState("");

  useEffect(() => {
    if(user == '' || user == null){
      //props.history.push("/login");
    }
    setNewsContext(mockNewsParagraph)
  }, []);

  return (
    <div className="container" class="full-height">
      <header className="jumbotron">
        <Typography>
          <h3>Hi! {user?user.lastName + " " + user.firstName + "!!":" "}</h3>
          <h3>Welcome to TransactionApp!!</h3>
          <div/>
          <div className="container">
            <h4>News Updates:</h4>
            <div className="container">
              {/* <h5>{newsContext}</h5> */}
              <Box my="24px" width="100%">
                <Grid container spacing={1}>
                    <Grid item md={3} xs={3}>
                      <img src={"/study.jpg"} alt={"alt"} className="photo_1"/>
                    </Grid>
                    <Grid item md={4} xs={4}>
                      <img src={"/crypto.jpg"} alt={"alt"} className="photo_2"/>
                    </Grid>
                    <div>
                      <p>newsContext</p>
                    </div>
                    <Grid item md={4} xs={4}>
                        
                    </Grid>
                </Grid> 
            </Box>
            </div>
          </div>
        </Typography>
      </header>
    </div>
  );
};

export default Home;
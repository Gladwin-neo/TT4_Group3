import React, { useState, useEffect } from "react";
import { Typography } from '@material-ui/core';
import { useSelector } from "react-redux";


const user = JSON.parse(localStorage.getItem("user"));

const Home = (props) => {
  const [content, setContent] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if(user == '' || user == null){
      props.history.push("/login");
    }

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
            <h5>Scammers are everywhere!!</h5>
            <h1>{user.accountKey}</h1>
            </div>
          </div>
        </Typography>
      </header>
    </div>
  );
};

export default Home;
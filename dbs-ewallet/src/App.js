import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import acctDetails from "./components/accountDetails";
import AddTxn from "./pages/AddTxn"

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";
import TransactionDetails from './components/TransactionDetails';

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showUser, setShowUser] = useState();

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser)
    }
  }, [currentUser]);

  const logOut = () => {

    dispatch(logout());
  };

  return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              <img className="photo" src = "/dbs.png" alt = "Logo"/>
              TransactionApp
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/transferFunds"} className="nav-link">
                    Transfer Funds
                  </Link>
                </li>
              )}
              {currentUser &&(
                <li className="nav-item">
                  <Link to={"/transactions"} className="nav-link">
                    History
                  </Link>
                </li>
              )}
            </div>
            

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/accounts"} className="nav-link">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/transactions" component={TransactionDetails}/>
              <Route exact path="/accounts" component={acctDetails}/>
              <Route exact path="/transferFunds" component={AddTxn}/>
              
            </Switch>
          </div>
        </div>
      </Router>
  );
};

export default App;

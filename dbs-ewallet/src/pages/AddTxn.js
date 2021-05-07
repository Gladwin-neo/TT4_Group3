import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddTxn = () => {
  //   const handleChange = () => {
  //     console.log("success");
  //   };

  //set the variables and states
  const [custID, setCustID] = useState(3);
  const [accountKey, setAccountKey] = useState(
    "08enzewm-j6is-nwi8-84p0-thvmwz68bwx"
  );
  const [payeeID, setPayeeID] = useState(123);
  const [amount, setAmount] = useState(0);
  const [eGift, setEGift] = useState(false);
  const [message, setMessage] = useState("");
  const [printTxn, setPrintTxn] = useState(false);
  const [printForm, setPrintForm] = useState(true);

  const [msg, setMSG] = useState("");
  const [msgStyle, setMsgStyle] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const baseURL =
    "https://ipllrj2mq8.execute-api.ap-southeast-1.amazonaws.com/techtrek/transactions/add";

  //   custID, accountKey, payeeID, amount, eGift, message
  // const [sampleURL, setURL] = useState("");

  //CUSTOM HEADER FOR JWT Token
  const accessToken = "895Z21koZEasz7rGcQnPw9Z3BgZUoTln4Lnda9jH";
  const authAxios = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${accessToken}`,
      //   Authorization: `Bearer ${accessToken}`,
    },
  });

  function refreshPage() {
    window.location.reload(false);
  }

  const onSubmit = async (e) => {
    const params = { custID, accountKey, payeeID, amount, eGift, message };
    e.preventDefault();
    console.log("adding...");
    console.log(params);
    postData(params);

    //   checkEmail(email);
  };

  const postData = async (params) => {
    // const response = await fetch(apiURL.apiURL, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   }, //this will never change
    //   body: JSON.stringify({ name, email, password }), //this will never change, open { } for values
    // });
    //pass in empty string to allow params to be passed in
    const response = await authAxios.post("", params);
    const data = response.data;
    console.log(data);

    //if successful transaction
    if (data) {
      setPrintForm(false);
      setPrintTxn(true);
    }

    // //reset all details
    // setPayeeID(0);
    // setAmount(0);
    // setEGift(false);
    // setMessage("");
    // setPrintTxn("true");

    // data && printTransaction(params);
    //return data;
  };

  //   const printTransaction= (params) =>{

  //   };

  return (
    <div>
      <main className="container">
        <form
          onSubmit={onSubmit}
          style={{ display: printForm ? "block" : "none" }}
        >
          <div className="flex-container">
            <img className="logo" src={"/images/dbs_logo.png"} />
            <h3 className="">Add Transaction</h3>

            <div className="flex-child form-control">
              <label htmlFor="name">Payee ID</label>
              <input
                type="number"
                placeholder="Enter Payee ID"
                className="form-control"
                onChange={(e) => setPayeeID(e.target.valueAsNumber)}
              />
            </div>

            <div
              className={`${msgStyle}`}
              style={{ display: showMsg ? "block" : "none" }}
            >{`${msg}`}</div>

            <div className={"flex-child form-control"}>
              <label htmlFor="number">Amount</label>
              <input
                name="test"
                type="number"
                placeholder="Enter Amount"
                onChange={(e) => setAmount(e.target.valueAsNumber)}
                className="form-control"
              />
            </div>

            <div className={"flex-child form-control"}>
              <label htmlFor="checkbox">eGift</label>
              <input
                name="test"
                type="checkbox"
                placeholder="Enter Amount"
                onChange={(e) => setEGift(e.currentTarget.checked)}
                className="form-control"
              />
            </div>

            <div className={"flex-child "}>
              <label htmlFor="checkbox">Message</label>
            </div>
            <div className={"flex-child "}>
              <input
                name="test"
                type="text"
                placeholder="Enter Message here..."
                onChange={(e) => setMessage(e.currentTarget.value)}
                className="textarea"
              />
            </div>
          </div>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>

        <div style={{ display: printTxn ? "block" : "none" }}>
          <p>Transaction Successful!</p>
          <p>{`You have successfully made a transaction of $${amount} to Customer ${payeeID}`}</p>

          <Link to="/login">
            <button className="btn" type="submit">
              Go Back
            </button>
          </Link>
          <Link to="/addTxn">
            <button onClick={refreshPage} className="btn" type="submit">
              Make another transaction
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AddTxn;

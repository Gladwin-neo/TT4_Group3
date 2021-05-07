import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import AddTxn from "./pages/AddTxn";

function App() {
  return (
    <div
      className=""
      //style={{ backgroundImage: "url(/images/bg.jpg)App" }}
    >
      <BrowserRouter>
        {/* <Route path="/" component={Home} /> */}
        <Route path="/addTxn" component={AddTxn} />
        {/* <Route path="/addTxn" render={() => <Register apiURL={apiURL} />} /> */}

        {/* <Route exact path="/details/:id" render={(props)=>{<DetailsPage id={props.match.params.id}/>}} /> */}
        {/* <Route path="/register" component={Register} /> */}
        {/* <Route path="/footer" component={Footer} /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;

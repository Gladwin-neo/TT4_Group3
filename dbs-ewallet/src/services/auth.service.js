import axios from "axios";

const API_URL = "https://corsanywhere.herokuapp.com/http://ec2-3-81-231-62.compute-1.amazonaws.com:5000";
const api_key = "895Z21koZEasz7rGcQnPw9Z3BgZUoTln4Lnda9jH";


const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (userName, userPass) => {
  console.log(userName)
  console.log(userPass)
  return axios
    .post(API_URL + "/login", {
      userName,
      userPass,
    },
    {
      headers: {
      'x-api-key': api_key
    }})
    .then((response) => {
      console.log(JSON.stringify(response.data.data))
      if (response.data.data.accountKey) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};



/**
 * 
 const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
      
    },
    {
      headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY
      'x-api-key': 'My-API-Key'
    }})
    .then((response) => {
      if (response.status == 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};
 * 
 */
/**
 *  
 const login = (username, password) => {
  axios({
        'method':'GET',
        'url':'https://example.com/query',
        'headers': {
            'content-type':'application/octet-stream',
            'x-rapidapi-host':'example.com',
            'x-rapidapi-key': process.env.RAPIDAPI_KEY
        },
        'params': {
            'search':'parameter',
        },
    })
  }
 * 
 */

export default {
  register,
  login,
  logout,
};
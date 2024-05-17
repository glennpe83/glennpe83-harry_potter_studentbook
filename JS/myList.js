//Fetch api
const BASE_URL = "https://hp-api.onrender.com/api/characters/students";
const USERBASE_URL = "https://crudapi.co.uk/api/v1/user";
const API_KEY = "Ag7ZwNDZWA0DnKJiXSS2rg6AmGdMQrfEX_8DTeSU4orhdhnRUw";

const getHeaders = (apiKey) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
};
const getLoggedInUser = () => {
  return JSON.parse(sessionStorage.getItem("loggedInUser"));
};

const setLoginstatus = (status) => {
  sessionStorage.setItem("loggedIn", status ? "true" : "false");
};
const loggedIn = () => {
  return sessionStorage.getItem("loggedIn") === "true";
};
const logOut = () => {
  setLoginstatus(false);
  sessionStorage.removeItem("loggedInUser");
  location.reload();
}

const userStatus = document.querySelector('#userStatus');
const logOutBtn = document.querySelector('#logOutBtn');



//See username on page or log in/log out user.
const seeUserStatus = () => {
    if (loggedIn()) {
        const user = getLoggedInUser();
        userStatus.textContent = `${user.username} Potter skolekatalog`;
        logOutBtn.style.display = 'block'; 
    } else {
      userStatus.textContent = 'Ikke logget inn';
      logOutBtn.style.display = 'none';
    }
}

logOutBtn.addEventListener("click", () => {
    logOut(); 
    window.location.href = "index.html";
  });


seeUserStatus();





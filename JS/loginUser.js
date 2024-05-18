//Fetch crudAPI og API-Key
const USERBASE_URL = "https://crudapi.co.uk/api/v1/user";
const API_KEY = "Ag7ZwNDZWA0DnKJiXSS2rg6AmGdMQrfEX_8DTeSU4orhdhnRUw";
const getHeaders = (apiKey) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
};

const setLoginStatus = (status) => {
  sessionStorage.setItem("loggedIn", status ? "true" : "false");
};
const getLoginStatus = () => {
  return sessionStorage.getItem("loggedIn") === "true";
};

const getLoggedInUser = () => {
  return JSON.parse(sessionStorage.getItem("loggedInUser"));
};
const setLoggedInUser = (id) => {
  return sessionStorage.setItem("loggedInUser", JSON.stringify(id));
};

//Sjekker om brukernavnet eksisterer 
const checkIsUserNameExists = async (username) => {
  try {
    const res = await fetch(USERBASE_URL);
    if (!res.ok) {
      throw new Error("Noe er feil med verifiseringen av bruker");
    }
    const data = await res.json();
    return data.some((user) => user.username === username);
  } catch (error) {
    console.error("Noe er feil med verifiseringen av bruker");
  }
};

//Sjekker brukernavn og passord opp i mot crudAPI
const verifyLogin = async (username, password) => {
  try {
    const res = await fetch(USERBASE_URL, {
      method: "GET",
      headers: getHeaders(API_KEY),
    });
    if (!res.ok) {
      throw new Error("Noe er feil med verifiseringen av innlogging");
    }
    const data = await res.json();
    return data.items.some((user) => user.username === username && user.password === password);
  } catch (error) {
    console.error("Kunne ikke verifisere innlogging", error);
  }
};


const userLogin = async () => {
  const usernameInput = document.querySelector("#usernameInput").value;
  const passwordInput = document.querySelector("#passwordInput").value;


  try {
    if (usernameInput === "" || passwordInput === "") {
      alert("Du må fylle inn begge feltene");
    } else if (!(await verifyLogin(usernameInput, passwordInput))) {
      alert("Feil brukernavn eller passord");
    } else {
      const userID = await fetchUserID(usernameInput);
      const userData = { username: usernameInput, userID: userID };
      sessionStorage.setItem("loggedInUser", JSON.stringify(userData));
      setLoginStatus(true);
      window.location.href = "main.html";
    }
  } catch (error) {
    console.error("Feil med verifisering av login", error.message);
  }
};


//Henter ID basert på brukernavn
const fetchUserID = async (username) => {
  try {
    const res = await fetch(USERBASE_URL, {
      method: "GET",
      headers: getHeaders(API_KEY),
    });
    const data = await res.json();
    const findUser = data.items.find((user) => user.username === username);
    return findUser._uuid;
  } catch (error) {
    console.error("Feil med henting av ID", error.message);
  }
};

//Knapp for å iverksette pålogging
const loginBtn = document.querySelector("#loginBtn");
loginBtn.addEventListener("click", async () => {
  await userLogin();
});

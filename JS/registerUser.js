//Fetch crudAPI og API-Key
const USERBASE_URL = "https://crudapi.co.uk/api/v1/user";
const API_KEY = "Ag7ZwNDZWA0DnKJiXSS2rg6AmGdMQrfEX_8DTeSU4orhdhnRUw";
const getHeaders = (apiKey) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
};


//Sjekker om brukernavn eksisterer. Noe inspirasjon fra arbeidskrav 2.
const ifUsernameExist = async (username) => {
  try {
    const res = await fetch(USERBASE_URL,{
        method:"GET",
        headers:getHeaders(API_KEY)
    });
    if (!res.ok) {
      throw new Error("Noe er feil med verifiseringen av bruker");
    }
    const data = await res.json();
    return data.items.some((user) => user.username === username);
  } catch (error) {
    console.error("Noe er feil med verifiseringen av bruker");
  }
};

const newUser = async () => {
  const newUsernameInput = document.querySelector("#newUsernameInput").value;
  const newPasswordInput = document.querySelector("#newPasswordInput").value;

  //Lagrer brukernavn og passord i variabelen user
  try {
    const user = [
      { username: newUsernameInput, password: newPasswordInput, myStudents: [] },
    ];

    if (newUsernameInput === "" || newPasswordInput === "") {
      alert("Du må fylle inn begge feltene");
    }else if (await ifUsernameExist(newUsernameInput)) {
      alert("Brukernavnet eksisterer allerede");
    } else {


      //Poster bruker til crudAPI. Noe inspirasjon fra arbeidskrav 2.
      const res = await fetch(USERBASE_URL, {
        method: "POST",
        headers: getHeaders(API_KEY),
        body: JSON.stringify(user),
      });
      if (!res.ok) {
        throw new error("Ooops. Her ble det noe feil");
      } else {
        window.location.href = 'index.html';
      }
    }
  } catch (error) {
    console.error("Det ble noe feil med registrering av bruker");
  }
};


//Lager ny bruker når knappen trykkes på
const submitNewUsernameBtn = document.querySelector("#submitNewUsernameBtn");
submitNewUsernameBtn.addEventListener("click", async () => {
  await newUser();
});

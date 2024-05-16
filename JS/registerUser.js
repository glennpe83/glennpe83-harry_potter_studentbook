const USERBASE_URL = "https://crudapi.co.uk/api/v1/user";
const API_KEY = "id_r6n9vV2v0HKmCIU0q-Z_Z0djiParuk_lH2hOd9kwqfufkMQ";

const getHeaders = (apiKey) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
};

  
  const newUser = async () => {
    const registerUserName = document.querySelector("#registerUserName").value;
    const registerUserPassword = document.querySelector("#registerUserPassword").value;
  
    try {
      const user = [
        { username: registerUserName, password: registerUserPassword, myStudents: [] },
      ];
  
      if (await ifUsernameExist(registerUserName)) {
        alert("Brukernavnet eksisterer allerede");
      } else {
        const res = await fetch(USERBASE_URL, {
          method: "POST",
          headers: getHeaders(API_KEY),
          body: JSON.stringify(user),
        });
        if (!res.ok) {
          throw new error("Du gjorde en feil. Prøv igjen");
        }
      }
    } catch (error) {
      console.error("Feil med registrering av bruker. Prøv igjen");
    }
  };

  const ifUsernameExist = async (username) => {
    try {
      const res = await fetch(USERBASE_URL,{
          method:"GET",
          headers:getHeaders(API_KEY)
      });
      if (!res.ok) {
        throw new Error("Feil i databasen ved verifisering av brukeren");
      }
      const data = await res.json();
      return data.items.some((user) => user.username === username);
    } catch (error) {
      console.error("Feil i databasen ved verifisering av brukeren");
    }
  };
  
  const registerUserBtn = document.querySelector("#registerUserBtn");
  registerUserBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // Hindrer standardoppførsel for skjemainnsending
  
    try {
      await newUser();
      window.location.href = 'index.html'; // Omdirigerer til index.html etter vellykket oppretting av bruker
    } catch (error) {
      console.error("Feil under registrering av bruker:", error);
    }
  });
  
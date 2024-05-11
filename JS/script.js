//Fetch api

const BASE_URL = "https://hp-api.onrender.com/api/characters/students";

let allStudents;

const fetchStudents = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      throw new Error("Ops, noe gikk feil med hentingen.");
    }
    const data = await res.json();
    allStudents = data;
    console.log(allStudents);
   
  } catch (error) {
    console.error(error);
  }
};

fetchStudents();
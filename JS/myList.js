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

const studentList = JSON.parse(sessionStorage.getItem('studentList'));

seeUserStatus();



const myStudentsList = document.querySelector("#myStudentsList");

const showMyStudent = (student) => {
  const divContainer = document.createElement("div");
  const divStudentContainer = document.createElement("div");
  const studentImage = document.createElement("img");
  const studentName = document.createElement("h3");
  const studentHouse = document.createElement("p");
  const yearOfBirth = document.createElement('p');
  const ancestry = document.createElement('p');



  myStudentsList.style.display = "flex";
  myStudentsList.style.flexFlow = "row wrap";
  myStudentsList.style.gap = "30px";
  myStudentsList.style.margin = "30px";
  myStudentsList.style.padding = "30px";
  myStudentsList.style.backgroundColor = '#e9dede';

  divContainer.style.display = "flex";
  divContainer.style.alignItems = "center";
  divContainer.style.justifyContent = "space-evenly";
  divContainer.style.flexFlow = "column wrap";
  divContainer.style.border = "2px black solid";
  divContainer.style.color = 'white';
  
  if (student.house === 'Gryffindor') {
    divContainer.style.backgroundColor = '#7F0909';
  } else if (student.house === 'Ravenclaw') {
    divContainer.style.backgroundColor = '#0E1A40';
  } else if (student.house === 'Slytherin') {
    divContainer.style.backgroundColor = '#1A472A';
  } else {
    divContainer.style.backgroundColor = 'black';
  }


  divStudentContainer.style.display = "flex";
  divStudentContainer.style.justifyContent = "center";
  divStudentContainer.style.width = "250px";

  studentName.innerHTML = `Navn: ${student.name}`;
  studentImage.src = student.image;
  studentHouse.innerHTML = `Medlem av House ${student.house}`;
  yearOfBirth.textContent = student.yearOfBirth === null ? 'Ukjent fødselsår' : `Fødselsår: ${student.yearOfBirth}`;
  ancestry.textContent = student.ancestry === '' ? 'Ukjent herkomst' : student.ancestry;

  studentName.style.fontSize = '30px';
  studentImage.alt = student.name;
  studentImage.title = `Bilde av ${student.name}`;
  studentImage.style.height = "300px";
  studentImage.style.width = "250px";
  studentImage.style.margin = '30px';
  studentHouse.style.color = "black";
  studentHouse.style.fontSize = "1.5rem";
  studentHouse.style.marginBottom = "10px";



  divContainer.appendChild(studentName);
  divContainer.appendChild(studentImage);
  divContainer.appendChild(studentHouse);
  divContainer.appendChild(yearOfBirth);
  divContainer.appendChild(ancestry);
  divStudentContainer.appendChild(divContainer);
  myStudentsList.appendChild(divContainer);
};


if (studentList) {
  studentList.forEach((student, index) => {
    showMyStudent(student); 
  });
} else {
  console.log('Ingen studenter lagt til i listen.');
}



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
    showStudents();
   
  } catch (error) {
    console.error(error);
  }
};

fetchStudents();

//Fetch studentlistContainer 
const studentlistContainer = document.querySelector('#studentlistContainer');

//Show students
const showStudents = () => {
    allStudents.forEach((student) => {
    const divContainer = document.createElement('div');
    const divStudentContainer = document.createElement('div');
    const studentImage = document.createElement('img');
    const studentName = document.createElement('h3');
    const studentHouse = document.createElement('p');

    studentName.innerHTML = student.name;

    studentImage.src = student.image;

    studentHouse.innerHTML = student.house;


    divContainer.appendChild(studentName);
    divContainer.appendChild(studentImage);
    divContainer.appendChild(studentHouse);
    divContainer.appendChild(divStudentContainer);
    studentlistContainer.appendChild(divContainer);
})};
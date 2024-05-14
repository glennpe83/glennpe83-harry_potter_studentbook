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
    sortInAlphabeticalOrder();
   
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
        if (student.image !== "") {
    const divContainer = document.createElement('div');
    const divStudentContainer = document.createElement('div');
    const studentImage = document.createElement('img');
    const studentName = document.createElement('h3');
    const studentHouse = document.createElement('p');


    studentName.innerHTML = student.name;
    studentImage.src = student.image;
    studentHouse.innerHTML = student.house;

    studentImage.alt = student.name;
    studentImage.title = `Bilde av ${student.name}`;

    //Styling av side via DOM
    studentlistContainer.style.display = 'flex';
    studentlistContainer.style.flexFlow = 'row wrap';
    studentlistContainer.style.gap = '30px';
    studentlistContainer.style.margin = '30px';
    studentlistContainer.style.padding = '30px';

    divContainer.style.display = 'flex';
    divContainer.style.alignItems = 'center';
    divContainer.style.justifyContent = 'space-evenly';
    divContainer.style.flexFlow = 'column wrap';
    divContainer.style.border = '2px black solid';
    

    divStudentContainer.style.display = 'flex';
    divStudentContainer.style.justifyContent = 'center';
    divStudentContainer.style.width = '250px';

    studentImage.style.height = '300px';
    studentImage.style.width = '250px';
  

    studentHouse.style.color = 'black';
    studentHouse.style.fontSize = '1.3rem';
    studentHouse.style.marginBottom = '10px';

    

    divContainer.appendChild(studentName);
    divContainer.appendChild(studentImage);
    divContainer.appendChild(studentHouse);
    divContainer.appendChild(divStudentContainer);
    studentlistContainer.appendChild(divContainer);

    
    

}})};

const sortInAlphabeticalOrder = () => {
  allStudents.sort((a, b) => a.name.localeCompare(b.name));
  showStudents();
};
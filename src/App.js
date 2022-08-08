import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import { nanoid } from 'nanoid';
import AddStudent from './components/AddStudent';
import _ from 'lodash';
import Student from './components/Student';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



function App() {


  

  useEffect(() => {
    if(localStorage){
      const studentsLs = JSON.parse(localStorage.getItem('students'));

      if(studentsLs){
        saveStudents(studentsLs);
      }
      else{
        saveStudents(students);
      }
    }
  }, []);

  
  //Seed Data
  const students = [{
    id:nanoid(),
    firstName: "Evan",
    lastName: "Gudmestad",
    image: 'images/student1.jpg',
    gradYear: 2003
  },
  {
    id:nanoid(),
    firstName: "Amel",
    lastName: "Topalovic",
    image:'images/student2.jpg',
    gradYear: 2022
  },
  {
    id:nanoid(),
    firstName: "George",
    lastName:"Leinert",
    image:'images/student5.jpg',
    gradYear:2022
  }
];
  

 const[allStudents, setAllStudents] = useState(null);
 const[keywords,setKeywords] = useState("");
 const[searchResults,setSearchResults] = useState(null);
 const[gradYear, setGradYear] = useState("");




function addStudent(newStudent){
  console.table(newStudent);
  const updatedStudentsArray = [...allStudents, newStudent];
  saveStudents(updatedStudentsArray);
}

const saveStudents = (students) => {
 setAllStudents(students);
 setSearchResults(students);
 if(localStorage){
  localStorage.setItem('students', JSON.stringify(students));
  console.log('saved to local storage');
 }
}

const deleteStudent = (id) => {
   const updatedStudentsArray = allStudents.filter(student => student.id !== id);
   saveStudents(updatedStudentsArray);
}

const updateStudent = (updatedStudent) => {
  console.table(updatedStudent);
  const updatedStudentsArray = allStudents.map(student => student.id === updatedStudent.id ? {...student,...updatedStudent} : student);
  saveStudents(updatedStudentsArray);
}


const searchStudents = () => {
  let keywordsArray = [];
  if(keywords) {
    keywordsArray = keywords.toLowerCase().split(' ');
  }
  if(gradYear){
    keywordsArray.push(gradYear.toString());
  }

  if(keywordsArray.length > 0){
    const searchResults = allStudents.filter(student => {
       for(const word of keywordsArray){
        if(student.firstName.toLowerCase().includes(word) ||
        student.lastName.toLowerCase().includes(word) ||
        student.gradYear === parseInt(word)){
          return true;
        }
       }
       return false;
    });
    setSearchResults(searchResults);
  } else {
    setSearchResults(allStudents);
  }
}

  return (
    <div className="container text-primary">
      <div className='row' id="currentStudents">
      <h3>Current Students</h3>
        {searchResults && searchResults.map((student) => 
        <div key={student.id} className='col-4'> 
           <Student student={student} deleteStudent={deleteStudent} updateStudent={updateStudent}/>
          </div>
        )}
      </div>
      
      {!allStudents && <button type="button" className="btn btn-lg btn-success" onClick={() => saveStudents(students)}>Set All Students</button>}
    <AddStudent addStudent={addStudent} />
    <div className='row mt-4' id="searchStudents">
    <h3>Search for Students</h3>
      <div className='col-md-4'>
     
      
        <input id='txtKeywords' type='text' className='form-control' placeholder='Search By Name' onChange={(evt) => setKeywords(evt.currentTarget.value)} value={keywords} />
      </div>
      <div className='col-md-4'>
        <select value={gradYear} className='form-select' onChange={evt => setGradYear(evt.currentTarget.value)}>
                  <option value="">Select Year</option>
                  {_(allStudents).map(student => student.gradYear).sort().uniq().map(year => <option key={year} value={year}>{year}</option>).value()}
        </select>
      </div>
      <div className='col-md-4'>
        <button type="button" className='btn btn-primary' onClick={searchStudents}>Search <FontAwesomeIcon icon={faSearch} /></button>
      </div>
    </div>
    </div>
  );
}

export default App;

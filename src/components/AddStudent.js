import React, {useState, useEffect} from 'react';
import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './AddStudent.css';

function AddStudent(props){

  //const[studentId, setStudentId] = useState("");
  const[firstName,setFirstName] = useState("");
  const[lastName, setLastName] = useState("");
  const[selectedFile,setSelectedFile] = useState();
  


  function doWork(){
    const newStudent = {id:nanoid(), "firstName": firstName, "lastName":lastName, "image":URL.createObjectURL(selectedFile)};
    props.addStudent(newStudent);
  }

  const imageUpdate = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  return(
    <div className="row mt-4" id="addStudent">
      <h3>Add New Student</h3>
      <div className="col-md-3">
        <label htmlFor='txtFirstName' className='form-label'>First Name</label>
        <input type='text' id='txtFirstName' placeholder='First Name' className='form-control' onChange={(evt) => setFirstName(evt.currentTarget.value)} value={firstName} />
      </div>
      <div className="col-md-3">
      <label htmlFor='txtLastName' className='form-label'>Last Name</label>
        <input type='text' id='txtLastName' placeholder='Last Name' className='form-control' onChange={(evt) => setLastName(evt.currentTarget.value)} value={lastName} />
      </div>
      <div className="col-md-3">
        <label htmlFor="fileUpload" className='form-label'>Student Image</label>
        <input type='file' name='file' id="fileUpload" onChange={imageUpdate} />
      </div>
      <div className="col-md-3">
        <button type="button" className='btn btn-success btn-lg' onClick={doWork}>Add Student <FontAwesomeIcon icon={faPlusCircle} /></button>
      </div>
    </div>
  );

}

export default AddStudent;
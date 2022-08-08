import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarning, faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons'
import './Student.css';

function Student(props){


  const[editMode,setEditMode] = useState(false);
  const[firstName,setFirstName] = useState("");
  const[lastName,setLastName] = useState("");
  const[gradYear,setGradYear] = useState("");

useEffect(() => {
  setFirstName(props.student.firstName);
  setLastName(props.student.lastName);
  setGradYear(props.student.gradYear);
}, []);

const doWork = () => {
  setEditMode(false);
  const updatedStudent = {id:props.student.id,firstName:firstName,lastName:lastName,gradYear:gradYear, image:props.student.image};
  props.updateStudent(updatedStudent);
}

return (
  <div className='card'>
    <img src={props.student.image} width="100" height="100" alt="happy student" className='mx-auto' />
    <button type='button' onClick={() => props.deleteStudent(props.student.id)} className='btn btn-danger'>Delete <FontAwesomeIcon icon={faWarning} id="warn" /></button>
    <button type='button' onClick={() => setEditMode(true)} className='btn btn-info'>Edit <FontAwesomeIcon icon={faMagicWandSparkles}/></button>
    {!editMode &&
    <ul className="list-group list-group-flush">
        <li className="list-group-item text-center">{props.student.firstName}</li>
        <li className="list-group-item text-center">{props.student.lastName}</li>
        <li className="list-group-item text-center">{props.student.gradYear}</li>
    </ul>}
    {editMode && 
    <ul className="list-group list-group-flush">
    <li className="list-group-item"><input type='text' id='txtFirstName' value={firstName} onChange={evt => setFirstName(evt.currentTarget.value)}/></li>
    <li className="list-group-item"><input type='text' id='txtLastName' value={lastName} onChange={evt => setLastName(evt.currentTarget.value)} /></li>
    <li className="list-group-item"><input type='text' id='txtGradYear' value={gradYear} onChange={evt => setGradYear(evt.currentTarget.value)} /></li>
    <li className='list-group-item'><button id='btnSave' className='btn btn-secondary' onClick={doWork}>Save</button></li>
</ul>
    }
  </div>
)
};

export default Student;
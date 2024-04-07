import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";
import axios from "axios";
import { Slide } from "react-awesome-reveal";


export default function Note( {note, getUserNotes} ) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let {handleChange, handleSubmit}= useFormik({
    initialValues: {
      title: '',
      content: ''
    },
    onSubmit: updateNotes,
  });

  function updateNotes(values) {
axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`, values, {
  headers: {
    token: `3b8ny__${localStorage.getItem('userToken')}`
  }
})
.then( (res) => {console.log(res)
  getUserNotes();

})
.catch( (err) => {console.log(err)})
.finally( () => {
  handleClose()
})
  }

  function deleteNote(){
    axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`, {
      headers: {
        token: `3b8ny__${localStorage.getItem('userToken')}`
      }
    })
    .then( (res) => {console.log(res)
    getUserNotes();
    })
    .catch( (err) => {console.log(err)})
  }
  return (
    <>
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input onChange={handleChange} type="text" name="title" id="title" placeholder="Please Enter Title" className="form-control my-3" />
            <textarea onChange={handleChange} name="content" id="content" placeholder="Please Enter Content" className="form-control my-3"></textarea>
          </form>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>
    <div className="col-md-6  p-3">
    <Slide direction="down">
    <div>
     <Card >
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>
         {note.content}
        </Card.Text>
        <i className="fa-solid fa-pen-to-square fa-xl mx-3 cursor-pointer" variant="primary" onClick={handleShow}></i>
        <i className="fa-solid fa-trash fa-xl mx-3 cursor-pointer" onClick={deleteNote}></i>
      </Card.Body>
    </Card>
     </div>
    </Slide>
   
    </div>
       
    </>
  );
}

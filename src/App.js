import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios"; // used to push current state into backend

function App() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [dep, setDep] = useState("");
  const [newDep, setNewDep] = useState("");

  const [studentList, setStudentList] = useState([]);

  // get data from the backend
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response);
      setStudentList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      studentId: id,
      studentName: name,
      studentDep: dep,
    }); // pushing data into backend with relavent variables
  };

  const departmentUpdate = (idDb) => {
    Axios.put("http://localhost:3001/api/update", {
      departmentDb: newDep,
      idDb: idDb,
    });
  };

  const deleteRecord = (idDb) => {
    Axios.delete(`http://localhost:3001/api/delete/${idDb}`
  )};
  return (
    <div className="App">
      <div className="App-sub">
        <span className="title">CRUD Login</span>
        <input
          type="text"
          className="inp"
          placeholder="id"
          onChange={(e) => {
            setId(e.target.value);
          }}
        ></input>
        <input
          type="text"
          className="inp"
          placeholder="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          type="text"
          className="inp"
          placeholder="department"
          onChange={(e) => {
            setDep(e.target.value);
          }}
        ></input>
        <button type="button" className="btn" onClick={submitReview}>
          Submit
        </button>
        <button type="button" className="btn">
          Delete
        </button>
        <button type="button" className="btn">
          Clear All
        </button>
      </div>
      {studentList.map((value) => {
        return (
          <div>
            <span>{value.idDb}</span>
            <span>{value.nameDb}</span>
            <span>{value.departmentDb}</span>
            <input
              type="text"
              placeholder="Add New Department"
              onChange={(event) => {
                setNewDep(event.target.value);
              }}
            ></input>
            <button
              type="button"
              className="btn"
              onClick={() => {
                departmentUpdate(value.idDb);
              }}
            >
              Update
            </button>

            <button
              type="button"
              className="btn"
              onClick={() => {
                deleteRecord(value.idDb);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;

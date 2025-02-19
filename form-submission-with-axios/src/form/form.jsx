// import React,{ useState } from "react";
import "./form.css";
import Select from "react-select";
import axios from "axios";
import { useState } from "react";

let i =1;
const Form = () => {
  const Educationtable= () => {
    return (
    <>
    <tbody>
                  <tr>
                    <td>
                      <select name="standard[]" required>
                        <option value="High-School">High-School</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Graduation">Graduation</option>
                        <option value="Postgraduate">Postgraduate</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Phd">PhD</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="college[]"
                        placeholder="Enter College"
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        max="100"
                        min="0"
                        name="percentage[]"
                        placeholder="Enter Percentage"
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="year[]"
                        min="1900"
                        max="2100"
                        placeholder="Enter Passout Year"
                        required
                      />
                    </td>
                    <td>
  {education.length > 1 && (
    <button
      type="button"
      value={i}
      className="delete-btn"
      onClick={(e) => removeRow(e.target.value)}
    >
      Delete
    </button>
  )}
</td>
                  </tr>
                </tbody>
    </>
  );
  }
  // () => removeRow(i)
  const [errorName, setErrorName] = useState("");
  const [errors, setErrors] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [isVisibleloader, setIsVisibleloader] = useState(false);
  const [education, setEducation] = useState([<Educationtable key={i}/>]); // Initialize with one row

  function Addmoreeducation() {
    i++;
    if(education.length <= 5){
    setEducation([...education, <Educationtable key={i}/>]); // Append new row
    } 
  }
  const removeRow = (id) => {
    setEducation(education.filter((_, index) => index !== Number(id)));
  };
  
  const closeAlert = () => {
    setIsVisible(false);
  };

  const nameValidate = (value) => {
    const isAlphabetsOnly = /^[A-Za-z]+( [A-Za-z]+)*$/.test(value);
    
    if (!isAlphabetsOnly) {
      setErrorName("Name should contain only alphabets");
      setErrors("there was name error");
    }
        else{
      setErrorName("");
      setIsVisible(false);
    }
  }
  

  const emailValidate = (value) => {
    if (value === "" || !value.includes("@") || !value.includes(".")) {
      setErrorEmail("Please enter a valid email address.");
      setErrors("there were errors");
    } else if(value.length > 3) {
      axios.post("http://localhost/ajax/api/emailregisterApi.php", {'email':value})
      .then((response) => {
        if (response.data.status === "success") {
          setErrorEmail(response.data.message);
          setErrors("there was email error");
        } else {
          setErrorEmail('');
          setErrors('');
      setIsVisible(false);
        }
      })} 
    else {
      setErrorEmail("");
      setIsVisible(false);
    }
  };

  const Submit = (e) => {
    e.preventDefault();
    if (errors === "") {
      setIsVisible(false);
      setIsVisibleloader(true);
      document.getElementById("myformid").style.display = "none";
      document.querySelector(".loader-text").textContent = "Processing......";
      const formData = new FormData(document.getElementById("myformid"));
      axios
        .post("http://localhost/ajax/api/insertApi.php", formData)
        .then((response) => {
          document.getElementById("myformid").style.display = "block";
          document.querySelector(".loader-text").textContent =
            "Registration Form";
            setIsVisibleloader(false);
          if (response.data.status === "success") {
            document.getElementById("myformid").reset();
            console.log("API Response:", response.data);
            setIsVisible(false);
          } else {
            console.log("API Response:", response.data);
             setIsVisible(true);
             setIsVisibleloader(false);
             setErrors(response.data.message);
          }
          
        });
        setErrors('');     
    }
    
    else {
      
      setIsVisible(true);
      // setErrors('form stopped due toname validation');
      
      console.log("form stopped due toname validation");
    }
  };
  return (
    <>
      <div className="form-container">
        <center>
        {isVisibleloader && <div className="loader"></div>}
        {isVisible && (
            <div id="alert" className="alert">
              {errors}
              <span className="closebtn" onClick={closeAlert}>
                &times;
              </span>
            </div>
          )}
          <h2 className="loader-text">Registration Form</h2>
        </center>
        <form
          id="myformid"
          name="myForm"
          onSubmit={Submit}
          method="POST"
          encType="multipart/form-data"
        >
          <span className="Required">* Are Required</span>
          <br />
          <div className="form-group">
            <label htmlFor="name">
              <span className="Required">*</span> Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
              onKeyUp={(e) => nameValidate(e.target.value)}
            />
            <div className="Required">{errorName}</div>
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <span className="Required">*</span> Email
            </label>
            <input
              type="email"
              id="email-id"
              name="email"
              placeholder="Enter your email"
              required
              onKeyUp={(e) => emailValidate(e.target.value)}
            />
            <div className="Required">{errorEmail}</div>
          </div>
          <div className="form-group">
            <label>
              <span className="Required">*</span> Gender
            </label>
            <div className="radio-group">
              <label>
                <input type="radio" name="gender" value="male" required /> Male
              </label>
              <label>
                <input type="radio" name="gender" value="female" required />{" "}
                Female
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Favorite Food</label>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" name="food[]" value="banana" /> Banana
              </label>
              <label>
                <input type="checkbox" name="food[]" value="apple" /> Apple
              </label>
              <label>
                <input type="checkbox" name="food[]" value="mango" /> Mango
              </label>
              <label>
                <input type="checkbox" name="food[]" value="pomegranate" />{" "}
                Pomegranate
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="hobbies">Hobbies</label>
            <Select
              id="hobbies"
              name="hobbies[]"
              isMulti
              options={[
                { value: "Reading", label: "Reading" },
                { value: "Watching-Movies", label: "Watching Movies" },
                { value: "Sleeping", label: "Sleeping" },
                { value: "Gardening", label: "Gardening" },
                { value: "Hiking", label: "Hiking" },
                { value: "Coding", label: "Coding" },
              ]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="educationTable">
              <span className="Required">*</span> Education
            </label>
            <table id="educationTable">
              <thead>
                <tr>
                  <th>
                    <span className="Required">*</span> Standard
                  </th>
                  <th>
                    <span className="Required">*</span> College
                  </th>
                  <th>
                    <span className="Required">*</span> Percentage
                  </th>
                  <th>
                    <span className="Required">*</span> Pass-out Year
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              {education}
            </table>
            { education.length<6 &&(
            <button type="button" className="addmore-btn" onClick={Addmoreeducation}>
              Add More
            </button>)}
          </div>
          <div className="form-group" id="img">
            <label htmlFor="file-input">Upload Image</label>
            <input
              type="file"
              id="file-input"
              name="file-input"
              accept=".png, .jpg, .jpeg"
            />
            <br />
          </div>
          <div className="form-group" id="img-proof">
            <label htmlFor="files">
              <span className="Required">*</span> Document Proofs
            </label>
            <input
              type="file"
              id="files"
              name="documented[]"
              multiple
              accept=".png, .jpg, .jpeg, .pdf"
              required
            />
          </div>
          <hr />
          <div className="form-group">
            <label htmlFor="confirm">
              <span className="Required">* </span>
              <input type="checkbox" name="confirm" value="confirm" required />I
              agree to all the terms and condition
            </label>
          </div>
          <div className="form-group">
            <button type="submit" name="form-button" id="sub-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Form;
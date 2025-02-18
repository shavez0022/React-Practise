// import logo from './logo.svg';
import './App.css';
import React,{ useState } from "react";


export function Firstfunction(props){
    return <h4>I am very happy</h4>
}

 export function Secondfunction(shavez){
    if(shavez.name==="MANISH"){
        return <h3> {shavez.name} is female</h3>    
    } else if(!shavez.age){
    return<h3> {shavez.name} is male</h3>
    }
    else {
      return<h4> {shavez.age} is {shavez.name} Age</h4>
  }
}

export function Greeting(props) {
    if (props.isLoggedIn==='Yes') {
        return <h1>Welcome Back!</h1>;
    } else {
        return <h1>Please Sign In</h1>;
    }
}

export function Login() {
    const [userRole, setUserRole] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Role:", userRole);
        console.log("Password:", password);
    };
    return (
        <div className="container">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="userRole">User Role</label>
                        <input 
                            type="text" 
                            id="userRole" 
                            name="userRole" 
                            placeholder="Enter your user role" 
                            value={userRole}
                            onChange={(e) => setUserRole(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
        </div>
    );
}

export function Valuechange() {
    const [counter, setCounter] = useState(0);

    const Firstvalue = (e) =>{
        setCounter(e.target.value);
    }
const addvalue = () =>{
    if(counter >= 20){
        return
    } else
    setCounter(counter+1);
}

const removevalue =() =>{
    if(counter <= 0){
        return
    } else
    setCounter(counter-1);
}
    return (
        <>
            <div>
                <h1>Basic click function</h1>
                <input type="text" value={counter}
                onChange={Firstvalue}  />
                <p>Value: {counter}</p>
                <button
                onClick={addvalue}>Add value</button>
                <br/>
                <button
                onClick={removevalue}>Remove value</button>
            </div>
        </>
    );
}

 let arr=[
  1,2,3,4,5,6,7,8,9
]

export function Arrayfunction(){
  // const arr1= arr.map(arr1 =>
  //   <h1>{arr1}</h1>
  // );
  // const arr1=arr;
  return arr ;
}

export let Arr3=[1,2,3,4,5,6,7];

// export function List() {
//   const listItems = people.map(person =>
//     <li>{person}</li>
//   );
//   return <
// ul>{listItems}</ul>;
// }

 export function Navvvvvbar(){
  return (
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Pricing
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown link
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

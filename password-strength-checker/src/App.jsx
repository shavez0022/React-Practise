import { useState } from "react";
import "./App.css";
import validator from "validator";

function App() {
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (value) => {
    if(value.length>2){
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("✅ Strong Password");
    } else {
      setErrorMessage("❌ Not a Strong Password");
    }
  } else{
    setErrorMessage('');
  }
};

  return (
    <div>
      <h2>Checking Password Strength</h2>
      <form>
        <span>Enter Password: </span>
        <input type="password" onKeyUp={(e) => validate(e.target.value)} /> <br />
        <button type="submit">Submit</button>
        <br />
        {errorMessage && (
          <span style={{ fontWeight: "bold", color: errorMessage.includes("Strong") ? "green" : "red" }}>
            {errorMessage}
          </span>
        )}
      </form>
    </div>
  );
}

export default App;
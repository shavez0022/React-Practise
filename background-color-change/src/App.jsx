import { useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("white");
  const [image, setImage] = useState(
    "https://images.pexels.com/photos/30442348/pexels-photo-30442348/free-photo-of-historic-cityscape-of-catania-sicily.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
  );

  return (
    <>
      <div
        className="full"
        style={{
          backgroundColor: color,
          height: "100vh",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          className="btn"
          style={{
            position: "absolute",
            bottom: "70px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => setColor("red")}
          >
            red
          </button>
          <button
            style={{ backgroundColor: "blue" }}
            onClick={() => setColor("blue")}
          >
            blue
          </button>
          <button
            style={{ backgroundColor: "green" }}
            onClick={() => setColor("green")}
          >
            green
          </button>
          <button
            style={{ backgroundColor: "pink" }}
            onClick={() => setColor("pink")}
          >
            pink
          </button>
          <button
            style={{ backgroundColor: "black", color: "white" }}
            onClick={() => setColor("black")}
          >
            black
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

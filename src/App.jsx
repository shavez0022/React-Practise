import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState("white");
  const [image, setImage] = useState("https://images.pexels.com/photos/30442348/pexels-photo-30442348/free-photo-of-historic-cityscape-of-catania-sicily.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load");

  return (
    <>
      {/* <div className="full" style={{backgroundColor: color, height: '100vh',position: 'relative' ,width:'100%'}}>
        <div className='btn' style={{position: 'absolute', bottom: '70px', width: '100%', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button style={{backgroundColor: 'red'}}  onClick={()=>setColor('red')}>red</button>
        <button style={{backgroundColor: 'blue'}}  onClick={()=>setColor('blue')}>blue</button>
        <button style={{backgroundColor: 'green'}}  onClick={()=>setColor('green')}>green</button>
        <button style={{backgroundColor: 'pink'}}  onClick={()=>setColor('pink')}>pink</button>
        <button style={{backgroundColor: 'black', color:'white'}}  onClick={()=>setColor('black')}>black</button>
        </div>
      </div> */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '20px', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      
 
      <div className='preview' style={{ height: '50vh', width: '80vh', borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}>
        <img
          src={image}
          alt="Mountain"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div className="bottom-images" style={{ display: 'flex', gap: '15px', width: '80vh', justifyContent: 'center' }}>
 
        <div className="preview" style={{ height: '15vh', width: '25%', borderRadius: '8px', overflow: 'hidden', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s' }}>
          <img
            src="https://images.pexels.com/photos/30491755/pexels-photo-30491755/free-photo-of-majestic-green-mountain-ridge-in-martinique.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
            alt="Thumbnail 1"
            style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
            onClick={() => setImage("https://images.pexels.com/photos/30491755/pexels-photo-30491755/free-photo-of-majestic-green-mountain-ridge-in-martinique.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load")}
     
          />
        </div>

      
        <div className="preview" style={{ height: '15vh', width: '25%', borderRadius: '8px', overflow: 'hidden', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s' }}>
          <img
            src="https://images.pexels.com/photos/30627050/pexels-photo-30627050/free-photo-of-scenic-landscape-with-cumulonimbus-cloud.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
            alt="Thumbnail 2"
            style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
            onClick={() => setImage("https://images.pexels.com/photos/30627050/pexels-photo-30627050/free-photo-of-scenic-landscape-with-cumulonimbus-cloud.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load")}
   
          />
        </div>

    
        <div className="preview" style={{ height: '15vh', width: '25%', borderRadius: '8px', overflow: 'hidden', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s' }}>
          <img
            src="https://images.pexels.com/photos/29284210/pexels-photo-29284210/free-photo-of-tranquil-lake-in-the-dolomites-of-italy.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
            alt="Thumbnail 3"
            style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
            onClick={() => setImage("https://images.pexels.com/photos/29284210/pexels-photo-29284210/free-photo-of-tranquil-lake-in-the-dolomites-of-italy.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load")}
           
          />
        </div>

      </div>
    </div>
  

    </>
  )
}

export default App
import React, { useRef, useState } from 'react';
import axios from 'axios';
import './App.css'; // For Styling

function App() {
  const [results, setResults] = useState([]);
  const fileInputRef = useRef(null);
  const [characters, setCharacters] = useState([]);
  const IMAGE_PATH_PREFIX = 'extracted_faces';
  const handleCapture = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Replace with the correct endpoint.
      axios.post('http://localhost:5000/encode-selfie', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((response) => {
        setCharacters(response.data);
      }).catch((error) => {
        console.error('Error fetching data: ', error);
      });
      //const encoding = response.data.encoding;
      // Perform the necessary MongoDB query using the received encoding.
      
    } catch (error) {
      console.error("Encoding failed", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Star Wars Face Recognition</h1>
        <input type="file" ref={fileInputRef} accept="image/*" capture="user" />
        <button onClick={handleCapture}>Capture &amp; Encode</button>
        {characters.map((character) => (
          <div key={character._id}>
            <img src={`${IMAGE_PATH_PREFIX}/${character.filename}`} alt={character.name} />
            <p>{character.name}</p>
          </div>
        ))}        
      </header>
    </div>
  );
}

export default App;

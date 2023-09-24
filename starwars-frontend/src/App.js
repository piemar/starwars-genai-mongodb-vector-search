import React, { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CharacterCard from './components/CharacterCard';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';  
import axios from 'axios';
import './App.css'; // For Styling
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function App() {
  const fileInputRef = useRef(null);
  const [isHiddenMatchedImage, setIsHiddenMatchedImage] = useState(false); 
  const [selfie, setSelfie] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [matchedImage, setMatchedImage] = useState(null);
  const IMAGE_PATH_PREFIX = 'extracted_faces';
  const handleSelfieSelection = (event) => {
    setIsLoading(true);
    setMatchedImage(null)
    const file = event.target.files[0];
    if (file) {
      // Create an object URL to represent the file
      const objectURL = URL.createObjectURL(file);
      setSelfie(objectURL);
    }
    setIsLoading(false)
  };
  const handleCapture = async () => {
    setIsLoading(true);
    setIsHiddenMatchedImage(false)
    const file = fileInputRef.current.files[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Replace with the correct endpoint.
      axios.post('http://localhost:5000/match-selfie', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((response) => {
        if(response.data && response.data.length > 0) {
          setCharacters(response.data);
          setIsHiddenMatchedImage(true)
          setMatchedImage(response.data[0].filename); // Assume the matched object has an image property
          
        }
        
      }).catch((error) => {
        console.error('Error fetching data: ', error);
      });      
    } catch (error) {
      console.error("Encoding failed", error);
    } finally {
      setIsLoading(false);
    }    
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Star Wars Look-a-Like Finder</h1>
        <div> 
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon /> } >
            Upload selfie file
            <VisuallyHiddenInput type="file" ref={fileInputRef} accept="image/*" capture="user" onChange={handleSelfieSelection} />
        </Button>      
        <button onClick={handleCapture} disabled={isLoading}>Match</button>
  
        {isLoading && (
            <CircularProgress color="primary" style={{ backgroundColor: 'black'}} />
        )}
        <div style={{ paddingTop:'10px',paddingBottom:'10px',display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          {selfie && <img src={selfie} alt="Selected Selfie" style={{width:'200px'}}/>}
          {isHiddenMatchedImage && (
            matchedImage && <img src={`${IMAGE_PATH_PREFIX}/${matchedImage}`} alt="Matched Image" style={{ width: '45%', height: 'auto' }} />
          )}
        </div>
        {characters.map((character) => (
          <div key={character._id}>
            <CharacterCard characterId={character._id} fileName={`${IMAGE_PATH_PREFIX}/${character.filename}`}  name={character.name} ></CharacterCard>
          </div>
        ))}       
                  </div>
 
      </header>
    </div>
  );
}

export default App;

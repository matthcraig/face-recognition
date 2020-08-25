import React from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation' 
import Logo from './components/logo/Logo' 
import ImageLinkForm from './components/imagelinkform/ImageLinkForm' 
import Rank from './components/rank/Rank' 

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <ImageLinkForm />
      <Rank />
      {/*<FaceRecognition />*/}
    </div>
  );
}

export default App;

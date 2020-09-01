import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation'; 
import Logo from './components/logo/Logo'; 
import ImageLinkForm from './components/imagelinkform/ImageLinkForm'; 
import Rank from './components/rank/Rank'; 
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/faceRecognition/FaceRecognition'; 

const app = new Clarifai.App({
  apiKey: '446202372ff345c2b452b865a9bab241'
});

const particlesOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 900
      }
    },
    color: {
      value: '#fff'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#ff0000'
      },
      polygon: {
        nb_sides: 3
      },
      image: {
        src: '',
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 1,
      random: false,
      anim: {
        enable: false,
        speed: 2,
        opacity_min: 0,
        sync: false
      }
    },
    size: {
      value: 3,
      random: false,
      anim: {
        enable: false,
        speed: 5,
        size_min: 0,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 90,
      color: '#fff',
      opacity: 1,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 3000,
        rotateY: 3000
      }
    },
    array: []
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab:{
        distance: 100,
        line_linked:{
          opacity: 1
        }
      },
      bubble:{
        distance: 200,
        size: 80,
        duration: 0.4
      },
      repulse:{
        distance: 200,
        duration: 0.4
      },
      push:{
        particles_nb: 4
      },
      remove:{
        particles_nb: 2
      }
    },
    mouse:{}
  },
  retina_detect: false,
  fn: {
    interact: {},
    modes: {},
    vendors:{}
  },
  tmp: {}
};
class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input).then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      // do something with response
    },
    function(err) {
      // there was an error
    }
  );
  }
  render(){
  return (
    <div className="App">
      <Particles className= "particles"
        params={particlesOptions}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onSubmit={this.onSubmit} />
      <FaceRecognition
      imageUrl={this.state.imageUrl} />
    </div>
  )}
}

export default App;

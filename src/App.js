import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation'; 
import Logo from './components/logo/Logo'; 
import ImageLinkForm from './components/imagelinkform/ImageLinkForm'; 
import Rank from './components/rank/Rank'; 
import Register from './components/register/Register'; 
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/faceRecognition/FaceRecognition'; 
import Signin from './components/signin/Signin';

const app = new Clarifai.App({
  apiKey: '446202372ff345c2b452b865a9bab241'
});

const particlesOptions = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: true,
        value_area: 900
      }
    },
    color: {
      value: '#f4b2ba'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#f4b2ba'
      },
      polygon: {
        nb_sides: 8
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
      distance: 110,
      color: '#f4b2ba',
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
      imageUrl: '',
      box: {},
      route: "signin",
      isSignedIn: false
    }
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response))) 
      .catch(err => console.log(err))
    }
    onRouteChange = (route) => {
      if (route === 'signout') {
        this.setState({isSignedIn: false})
      } else if (route === 'home'){
        this.setState({isSignedIn: true})
      }
      this.setState({route: route});
    }
  render(){
  return (
    <div className="App">
      <Particles className= "particles"
        params={particlesOptions}
      />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
    
      { this.state.route === 'home' 
      ? <div>
      <Logo />
      <Rank />
      <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onSubmit={this.onSubmit} />
      <FaceRecognition box={this.state.box}
      imageUrl={this.state.imageUrl} />
      </div>
      : (
        this.state.route === 'signin'
        ? <Signin onRouteChange={this.onRouteChange}/>
        : <Register onRouteChange={this.onRouteChange}/>
      )
      }
    </div>
  )}
  }
export default App;

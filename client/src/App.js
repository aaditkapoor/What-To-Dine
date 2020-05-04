import React from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import OutputComponent from './OutputComponent'
import InputComponent from './InputComponent'



class App extends React.Component {


  // received items
  weight=""
  height=""
  activeness = ""
  sex = ""

  constructor(props) {
    super(props)

    this.state = {
      output:""
    }
  }


  

  render() {
    return (
      <div className="AppComponent">
        <Jumbotron>
  <h1><u>What to Dine?</u></h1>
  <p>
    What to Dine automatically presents you with a customized menu catered to your data points and most importantly the App works.{'\n'}
  
  <b>Exclusively for SJSU Students.</b>
  </p>

  

      <InputComponent/>
  
      </Jumbotron>
      Developed with &hearts;	by an <a href = "https://www.facebook.com/aadit.kapoor.71">SJSU Student</a>
      </div>
    )
  }
}


export default App;

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-loader-spinner'
import {Form, Row, Col, Label, Group, Control, Button, ListGroup} from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import ReactTooltip from 'react-tooltip'
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"





function return_calculated_result(json) {
    let calories = json["calories"]
    let bmi = json["body_bmi"]
    let body_status = json["body_status"]
    let ingredients = json["ingredients"]

    let suggested_menu = json["menu"]
    let outputs = []


    if (suggested_menu && ingredients) {
        suggested_menu = Array.from(suggested_menu)
    }


    // iterate over keys to get the required element
    Object.keys(json).forEach((element) => {
        if (element.includes("output")) {
            outputs.push({"menu":json[element].menu, "diff":json[element].diff, "sum":json[element].sum})
        }
    })

    if (calories && bmi && body_status && suggested_menu && outputs && ingredients) {

    return (
    <div>

        You are required to have a daily calorie intake of <b>{ calories }</b>. You have a BMI of <b>{ bmi }</b> and your body status is <b>{ body_status }</b>.
        {"\n"}
        According to our algorithm, the best suggested menu would be:
        <ListGroup>
            { suggested_menu.map( (e) => <ListGroup.Item data-tip={ingredients[e]} action variant="success">{e}</ListGroup.Item>)}
     </ListGroup>
     <ReactTooltip />
    </div>   
    )
    }
    else {
        return <Loader
            type="Puff"
            color="#00BFFF"
            height={50}
            width={50}
            timeout={30000} 
         />
    }
}


class InputComponent extends React.Component {



    // show the items used in making the food.
    showIng = (ing) => {
        toast(ing)
    }

    constructor(props) {
        super(props)

        this.state = {
            weight:"",
            height:"",
            sex:"",
            activeness:"",

            groups:"",
            is_all_filled:false,
            output:"Complete the form below to get the desired results.",

            "menu":"",
            "calories":"",
            "bmi":"",
            "status":"",


            "calculated_result":""



        }

        

    }

    componentDidUpdate() {
        // check initial pass
        if (this.state.is_all_filled) {

        if (this.state.weight && this.state.height && this.state.sex && this.state.activeness) {
            fetch(`recommend/weight/${this.state.weight}/height/${this.state.height}/sex/${this.state.sex}/activeness/${this.state.activeness}`)
                .then(response => response.json())
                .then(json =>  {

                    this.setState({calculated_result:return_calculated_result(json)})
                })
    }
    else {
    }
}
    else {

        
    }

}

    weightChanged = (event) => {
        if (this.state.height && this.state.activeness && this.state.sex) {
            if (this.state.weight) {
                this.setState({is_all_filled:true})
                this.setState({weight:event.target.value})
            }
            else {
                this.setState({weight: event.target.value})
            }
        }
        else {
            this.setState({weight: event.target.value})
        }
    }
    heightChanged = (event) => {
        if (this.state.weight && this.state.activeness && this.state.sex) {
            if (this.state.height) {
                this.setState({is_all_filled:true})
                this.setState({height:event.target.value})
            }
            else {
                this.setState({height: event.target.value})
            }
        }
        else {
            this.setState({height: event.target.value})
        }

    }
    sexChanged = (event) => {
        if (this.state.height && this.state.activeness && this.state.weight) {
            if (this.state.sex) {
                this.setState({is_all_filled:true})
                this.setState({sex:event.target.value})
            }
            else {
                this.setState({sex: event.target.value})
            }
        }
        else {
            this.setState({sex: event.target.value})
        }


    }
    activenesschanged = (event) => {
        if (this.state.height && this.state.weight && this.state.sex) {
            if (this.state.activeness) {
                this.setState({is_all_filled:true})
                this.setState({activeness:event.target.value})
            }
            else {
                this.setState({activeness: event.target.value})
            }
        }
        else {
            this.setState({activeness: event.target.value})
        }
    }

    formSubmitted = (event) => {
    }

    loadSpinner = () => {
        if (this.state.is_all_filled) {

        }
        else {
            return <Loader
            type="Puff"
            color="#00BFFF"
            height={50}
            width={50}
            timeout={30000} 
         />
        }
    }

    render() {
        return (
<div className="main">
<React.Fragment>
<Alert variant="success">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
            
                {this.loadSpinner()}

              {this.state.calculated_result}
            </p>
            <hr />
            <p className="mb-0">
             Your recomended diet plan.
            </p>
          </Alert>
          </React.Fragment>
<React.Fragment>
            <Form>
            <Form.Text className='text'>
                {this.state.header}
            </Form.Text>
            <Form.Group controlId="formBasicWeight">
              <Form.Label>Weight (in lb)</Form.Label>
              <Form.Control onChange={this.weightChanged} type="text" placeholder="Enter Weight in LB" />
              <Form.Text className="text-muted">
                We use this to calculate the required groups.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicHeight">
              <Form.Label>Height (in cm)</Form.Label>
              <Form.Control onChange={this.heightChanged} type="text" placeholder="Enter Height in LB" />
              <Form.Text className="text-muted">
                We use this to calculate the required groups.
              </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicWeight">
              <Form.Label>Sex (m or f)</Form.Label>
              <Form.Control onChange={this.sexChanged} type="text" placeholder="Enter Gender" />
              <Form.Text className="text-muted">
                We use this to calculate the required groups.
              </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicWeight">
              <Form.Label>Activeness (active or inactive)</Form.Label>
              <Form.Control onChange={this.activenesschanged} type="text" placeholder="Enter Activeness" />
              <Form.Text className="text-muted">
                We use this to calculate the required groups.
              </Form.Text>
              </Form.Group>
          </Form>
          </React.Fragment>
          </div>
        )
    }
}


export default InputComponent
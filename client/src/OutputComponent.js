import React from 'react';
import Button from 'react-bootstrap/Button';



class OutputComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            group:""
        }
        this.calculate = this.calculate.bind(this)
    }

    calculate(food,calories, target) {
        if (this.props.food == "aadit") {
        this.setState({group:"helloworld"})
        }
    }

    render() {
        return (
            <div className="OutputComponent">
                <Button onClick={this.calculate}>Calculate</Button>
                <p>Calculated value: {this.state.group}</p>
            </div>
        )

    }
}


export default OutputComponent
// calculate bmi and required calories
const _ = require("lodash")


function convert_lb_to_kg(lb) {
    return (lb / 2.2)
}

function get_bmi(weight, height) {
    return (weight / height/height) * 10000
}


// formulas taken from: https://diabetesstrong.com/how-to-find-your-daily-calorie-need/

// have to take the same parameterss
function get_calorie_intake(sex, height, activeness, weight) {
    let lean_factor = 0.0 // initial lean factor
    let calories = 0 // initial calories

    // convert to kg
    weight = convert_lb_to_kg(weight)
    let bmi = get_bmi(weight, height)
    
    // for males
    if (sex=="male" || sex == "m") {
        weight = weight * 1
        if (bmi >= 10 && bmi <=14) {
            lean_factor=1.0
        }
        else if (bmi >= 15 && bmi <= 20) {
            lean_factor = 0.95
        }
        else if (bmi >= 21 && bmi <= 28) {
            lean_factor = 0.90
        }
        else if (bmi > 28) {
            lean_factor = 0.85
        }
        else {
            weight = weight * 0.9
        }
    }
    // for females
    else {
        weight = weight * 0.9
        if (bmi >= 14 && bmi <=18) {
            lean_factor=1.0
        }
        else if (bmi >= 19 && bmi <= 28) {
            lean_factor = 0.95
        }
        else if (bmi >= 29 && bmi <= 38) {
            lean_factor = 0.90
        }
        else if (bmi > 38) {
            lean_factor = 0.85
        }
        else {
            weight = weight * 0.9
        }
    }

     let bmr = weight * 24 * lean_factor
     if (activeness == "active") {
         calories = bmr * 1.80
     }
     else {
         calories = bmr * 1.3

     }
     return Math.round(calories)
}


function find_status(bmi) {
    if (bmi >= 25) {
        return "overweight"
    }
    else {
        return "healthy"
    }
}


module.exports = {
    convert_lb_to_kg,
    get_bmi,
    get_calorie_intake,
    find_status
}


const express = require('express')
const app = express()
const path = require('path');
const Scraper = require("./index").Scraper
const {get_bmi, get_calorie_intake, convert_lb_to_kg, find_status} = require('./calculation')
const {createMenu, return_most_optimal_menu, create_lookup_table,r} = require("./grouping")
const URLCreator = require("./scraper.js").URLCreator
const {ERRORS} = require("./Errors")

// heroku
const port = process.env.PORT || 3002
app.use(express.static(path.join(__dirname, 'client/build')));


function getFoodandCalories(data) {
  let food = []
  let calories = []
  let ingredients = {}
  data.forEach(element => {
    food.push(element.name)
    ingredients[element.name] = element.ingredients
    calories.push(element.calories)
  });


  return {food, calories, ingredients}
}

app.get("/",(req, res)=> {
  res.sendFile(path.resolve('index.html'));
})



app.get('/recommend/weight/:weight/height/:height/sex/:sex/activeness/:activeness', function (req, res) {
    // collect data and pass it to the scraper function here
    var weight = req.params["weight"]
    var height = req.params["height"]

    var sex = req.params["sex"].toLowerCase()
    var activeness = req.params["activeness"].toLowerCase()


    // checking if values are correct
    var weight = (typeof(parseFloat(weight)) == "number") ? parseFloat(weight) : null
    var height = (typeof(parseFloat(height)) == "number") ? parseFloat(height) : null

    if (sex == "m" || sex == "male" || sex == "f" || sex == "female") {
      if (activeness == "active" || activeness == "inactive") {

      }
      else {
        activeness = null
      }
    }
    else {
      sex = null
    }

    

    // if nothing is null then proceed.
    if (weight && height && sex && activeness) {
     
      var scraper = new Scraper(new URLCreator(true).returnTestingURL())
      scraper.scrape().then(function(data) {

        

        // implement calculation function here.
        // use that data to calculate grouping and then pass data to the group()
        let calculated_response = {}
        calculated_response['calories'] = get_calorie_intake(sex, height, activeness, weight).toString()
        calculated_response["body_status"] = find_status(get_bmi(convert_lb_to_kg(weight), height))
        calculated_response["body_bmi"] = get_bmi(convert_lb_to_kg(weight), height)

      let target = parseInt(calculated_response['calories'])
      let {food, calories, ingredients} = getFoodandCalories(data)     
      let lookup = create_lookup_table(food, calories)
      
      console.log(food, calories)
      let output = createMenu(food, calories, target, lookup)
      let menu = return_most_optimal_menu(output)
      let length_output = output.length
      let count = 1
      for (let o of output) {
        calculated_response["output"+count] = o
        count+=1
      }

      calculated_response["menu"] = menu
      calculated_response["output"] = output
      calculated_response["ingredients"] = ingredients


        res.send(calculated_response)
      }
      ).catch(function(error) {
        console.log(error)
        res.json({"message":"no data found!"}) 
      })
    }
    else {
      res.send({"message":"Calculating..."})
    }
    

})

app.get("/analytics", (req,res) => {
    res.send("Analytics here.")
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'index.html'));
});

app.get("/routes/",(req,res)=>{
  res.send({"routes": "recommend about help"})
})


app.listen(port, () => console.log(`listening on port ${port}!`))
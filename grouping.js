// groups calories and food items together to get best match
const Graph = require("graphs-adt").Graph
const _ = require("lodash")
const math = require("mathjs")

/**
 * 
 * @param {array} food 
 * @param {array} calories
 * @param {number} target 
 * @returns the grouped menu
 * */
function group(food, calories, target, lookup) {
    // group and calories have the same number of items.
    // some points to remember
    // 1. group must contain unrepeated items each time
    // 2. group must contain items from each categorie
    // 3. group must add upto the required items
    let menu = {}
    let if_incomplete = {}
    let initial_calories = 0
    let completed=false
    console.log("target is: ", target)
    for (let item in food) {
        //console.log(food[item], calories[item])
        if (initial_calories == target) {
            console.log(initial_calories)
            completed=true
            break
        }
        else {
            menu[lookup[calories[item]]] = calories[item]
            initial_calories = initial_calories + calories[item]
            
            console.log(initial_calories)
            // initial calorie is greater
            if (initial_calories > target) {
                let diff = Math.abs(target - initial_calories)
                console.log(diff)
                if (lookup[diff]) {
                    delete menu[lookup[diff]] // delete the difference key
                }
                else {
                    // not found
                    initial_calories = initial_calories - diff
                    console.log(initial_calories)
                    menu["delete"] = diff
                }
            }
            else if (initial_calories < target) {
                let diff = Math.abs(target - initial_calories)
                //console.log(diff)
                if (lookup[diff]) {
                     menu[lookup[diff]] = diff // delete the difference key
                }
                else {
                    // not found
                    initial_calories = initial_calories +  diff
                    for (let k in menu) {
                        if (k == "add") {
                            continue // skip add keyword
                        }
                        else {
                            let index = food.indexOf(k)
                            delete food[index]
                            delete calories[index]
                        }
                    }
                    if_incomplete["food"] = food
                    if_incomplete["calories"] = calories
                    menu["add"] = diff // extra item of diff calories
                }

            }
        }
    }

    if (completed) {
        if (if_incomplete) {
            console.log("completed!")
            
            return {"menu":menu, "if_incomplete":if_incomplete}
        }
        else {
            console.log("completed!")
            return menu
        } 
    }
    else {
        return null
    }
}

// create the lookup table
function create_lookup_table(food, calories) {
    if (food.length != calories.length) {
        throw new Error("food and calories not equal!")
    }
    let lookup = {}
    if (food.length == calories.length) {
        for (let index in food) {
            lookup[parseInt(calories[index])] = food[index]
        }   
    }
    else {
        throw new Error("food and calories length not equal!")
    }

    return lookup

}

// Testing
let food = ["ham", "chicken", "fish"]
let calories = [100,150,200]
let target = 400
let lookup = create_lookup_table(food, calories)

function bridge(food, calories, target, lookup) {
    let result = group(food, calories, target, lookup)
    let intial = 0
    if (result.if_incomplete) {
        if(Object.keys(result.menu).includes("add")) {
            let new_target = result.menu.add
            let previous_menu = result.menu

            // run group here
            console.log(group(result.if_incomplete.food, result.if_incomplete.calories, new_target, lookup))

        }
        else {
            console.log(result.menu)
        }
    }
    else {
        console.log(result)
    }

    return result
}



function group2(food, calories, target, lookup, range) {
    for (let i = 0; i<food.length; i++) {
        for (let j = 0; j<calories.length; j++) {

            for (let k = i; k<=j; k++) {
                console.log(food[k])
            }
        }
    }

}


function create_lookup_table2(food, calories) {
    let lookup = {}
    if (food.length == calories.length) {
        for (let index in food) {
            lookup[food[index]] = calories[index]
        }   
    }
    else {
        throw new Error("food and calories length not equal!")
    }

    return lookup

}

let lookup2 = create_lookup_table2(food, calories)

function sum_array(array) {
    return array.reduce(function(a,b) {
        return a+b
    })
}

function createMenuFromCalories(calories, lookup) {
    let menu = []
    calories.forEach(element => {
        menu.push(lookup[element])
    });
    return menu
}


/**
 * 
 * @param {array} food 
 * @param {array} calories
 * @param {number} target 
 * @returns the grouped menu
 * */
function createMenu(food, calories, target, lookup) {

    if (typeof food == 'object' && typeof calories == 'object' && typeof target == 'number' && typeof lookup == 'object') {
  
    // get largest number and remove it from array
    let sum = Math.max.apply(null, calories);
    calories.splice(calories.indexOf(sum), 1);
    
    let sets = [[]]; // subsets of calories
    let output = []
  
   // run 2^n times o(2^n)
    for (var i = 0; i < calories.length; i++) {
      for (var j = 0, len = sets.length; j < len; j++) {
          
        let temp = sets[j].concat(calories[i]);
        //console.log(temp)
        let sum = sum_array(temp)
        let is_optimal = false
        let menu = createMenuFromCalories(temp, lookup)
        let o = {}


        if (sum === target) {
            is_optimal = true
            o["is_optimal"] = true
            return output
        }
        if (sum > target) {
            let diff = sum-target
            sum = sum - diff
            menu["delete"] = diff

            
        }
        if (sum < target) {
            let diff = target-sum
            menu["add"] = diff
        }


        o["array"] = temp
        o["sum"] = sum
        o["diff"] = target - sum // difference in the target and the sum
        o["menu"] = menu

        // All subsets of the calories array
        sets.push(temp);
        output.push(o)

      }
    }
    return output           
  }
  else {
      console.error("invalid types!")
      return null
  }
}


function find_lowest_difference(output) {   
    let differences = []
    output.forEach((element)=> {
        differences.push(element.diff)
    })

    return Math.min(...differences)
}


function return_most_optimal_menu(output) {
    let min_difference = find_lowest_difference(output)
    let menu = null
    output.forEach((e) => {
        if (e.diff == min_difference) {
            menu = e.menu
        }
        else {
            return null
        }
    }
    )

    return menu
}


let n = [
    'Whole Wheat Sandwich Thin',
    '10" Flour Tortilla',
    'Croissant',
    'Ciabatta Roll',
    'Sourdough Bread',
    'Whole Grain Bread',
    'Brioche Bun',
    'Seasoned Grilled Chicken',
    'Thinly Sliced Smoked Turkey Breast',
    'Sliced Black Forest Ham',
    'Applewood Bacon',
    'Chicken Salad',
    'Tuna Salad',
    'Egg Salad',
    'Sliced Sharp Cheddar Cheese',
    'Sliced Swiss Cheese',
    'Sliced Provolone Cheese',
    'Sliced Pepper Jack Cheese',
    'Sliced Smoked Gouda Cheese',
    'Fresh Mozzarella Cheese',
    'Romaine Lettuce Leaf',
    'Baby Arugula',
    'Baby Spinach',
    'Sliced Red Onion',
    'Sliced Tomatoes',
    'Bread & Butter Pickles',
    'Chopped Jalapeno Peppers',
    'Olive Tapenade',
    'Whole Grain Mustard',
    'Honey',
    'Basil Aioli',
    'Sriracha Mayonnaise',
    'Ciabatta Roll',
    'Sliced Smoked Gouda Cheese',
    'Sliced Tomatoes',
    'Basil Pesto with No Nuts',
    'Fresh Mozzarella Cheese',
    'Balsamic Onion Jam',
    'French Petite Roll',
    'Lemon Oregano Chicken',
    'Avocado Pulp',
    'White Bean Hummus',
    'Chopped Cilantro',
    'Fresh Mozzarella Cheese',
    'Ciabatta Roll',
    'Roasted Turkey Breast',
    'Applewood Bacon',
    'Sliced Tomatoes',
    'Avocado Pulp',
    'Caramelized Onion Dip',
    'French Petite Roll',
    'Pork Carnitas',
    'Sliced Mortadella',
    'Sliced Swiss Cheese',
    'Garlic Aioli',
    'Whole Grain Mustard',
    'Honey',
    'Ciabatta Roll',
    'White Bean Hummus',
    'Sliced Cucumber',
    'Sliced Tomatoes',
    'Avocado Pulp',
    'Pickled red onions',
    'Baby Arugula',
    'Olive Tapenade',
    'Homemade Potato Chips',
    'Garden Salad'
  ]

  let c = [
    100, 220, 350, 350, 150, 150, 250, 160,  80, 140, 160, 120,
    200, 150, 110, 110, 100, 110, 100,  80,   0,   0,   0,   5,
     10,  25,   0,  25,  20,  20,  90,  30, 350, 100,  10, 100,
     80,  50,  90, 190,  90, 130,   0,  80, 350,  90, 110,  10,
     90,  15,  90, 100,  70, 110,  90,  10,  10, 350, 130,   0,
     10,  90,  10,   0,  10, 290,  35
  ] 

let look = create_lookup_table(n,c)
  //console.log(createMenu(n, c, 600, look))

function split_number(target) {
    let a = []
    while (target > 0) {
        let s = Math.round(Math.random() * (target-1)) + 1
        console.log(s)
        if (s > 500) {
            s = Math.round(Math.random() * (target-1)) + 1
        }
        a.push(s)
        target -= s
    }

    return a

}



function split_ntimes(target) {

    let ntimes = 0
   let s = split_number(target)
   for (let n of s) {
        if (n >= 500) {
            s.concat(split_number(n))
        }
   }

   return s
}


function check_if_nothing_exceeds(hash) {
    let done = false
    for (let i of hash["sum"]) {
        if (i >= 500) {
            done=true
            break
        }
    }


    if (done) {
        return true
    }
    else {
        return false
    }
 }

/**
 * 
 *   console.log(h)
    if (Object.keys(h) == 1) {
        console.log("keys already exists!")
        let s = split_number(target)
        s.sort()
        let n = target.toString()
        let hash = h
       s.forEach((e)=> {
           if (e > 500) {
            s.splice(s.indexOf(e),1)
              hash["sum"].push(...split_number(e))
           }
       })
    
       if (check_if_nothing_exceeds(hash)) {
            r(target, hash)
       }
       else {
           return hash
       }
    
       return hash
    }
    else {
        
        
 */


function r(target) {
    let s = split_number(target)
    s.sort()
    let n = target.toString()
    let hash = {"sum":s}
   s.forEach((e)=> {
       if (e > 500) {
        s.splice(s.indexOf(e),1)
          hash["sum"].push(...split_number(e))
       }
   })

   

    return hash
  
}






module.exports = {
    createMenu,
    return_most_optimal_menu,
    create_lookup_table,
    r
}
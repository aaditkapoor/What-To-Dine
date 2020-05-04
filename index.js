const request = require('request');
const cheerio = require("cheerio")



// Scraping
const URLCreator = require("./scraper.js").URLCreator

// Calculation
const Calculate = require("./calculation")


// Errors
const returnErrorToJson = require("./Errors").returnErrorToJson
const ERRORS = require("./Errors").ERRORS

// constants


class Scraper {
    constructor(url) {
        this.url = url
    }

     scrape() {
        return new Promise((resolve, reject) => {
             request(this.url, function (error, response, body) {
                if (response.statusCode == 200) {
                    if (JSON.parse(body)["status"] != "error") {
                    let n = 10 // the number of categories
                    let data = []
                    let json_body = JSON.parse(body)
                    let categories_length = json_body["menu"]["periods"][0]["categories"].length
                    for (let i = 0; i<categories_length; i++) {
                       json_body["menu"]["periods"][0]["categories"][i]["items"].forEach(item => {
                           data.push({
                               "name":item["name"],
                               "ingredients":item["ingredients"],
                               "calories":item["calories"]
                           })
                    })
                }
                    resolve(data)
                }
                else {
                    reject(returnErrorToJson(ERRORS.NO_MENU_ERROR))
                }
            }
            else {

            }
    })})
}
}





module.exports.Scraper = Scraper


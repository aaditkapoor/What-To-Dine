// Scraper File

const URL = "https://api.dineoncampus.com/v1/location/menu?site_id=5aeb0593f3eeb60a5b32d44c&platform=0&location_id=5c80081c19e02b0c0f6868fc&"

class URLCreator {
    constructor(testing=false) {
        this.testing=testing
        if (testing) {

        }
        else {
        let today = new Date().toISOString().slice(0, 10)
        this.url = URL + `date=${today}`
        }
    }

    returnTestingURL(date="15-11-2019") {
        if (this.testing) {
        return URL + `date=${date}`
        }

    }
    
    returnURL() {
        return this.url
    }

}

var u = new URLCreator(true)
console.log(u.returnTestingURL())

module.exports.URLCreator = URLCreator



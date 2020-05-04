// analytics.js: to store user files.
const fs = require("fs")
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })


class Analytics {
    fileName = ""
    constructor(fileName) {
        this.fileName = fileName
    }

    createFile() {
        fs.exists(this.fileName, (exists)=> {
            
            if (exists) {
            }
            else {
                
                // file does not exist
                // create file here
                fs.appendFile(this.fileName, "** FILE CREATED **\n", (err)=>{
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
    }

    addData(returned_response) {
            let parsed = JSON.stringify(returned_response)
            fs.appendFile(this.fileName, `${parsed}`, function(err){
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Success.")
                }
            })
    }

    readData() {
            let parsed = JSON.stringify(returned_response)
            fs.readFile(this.fileName,"utf8", function(err,data){
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(data)
                }
            })
        }
}


class CommandLineShell extends Analytics {
    constructor(fileName, version="1.0.0") {
        super(fileName)
        this.version = version
    }

    shell() {
        this.createFile() // create the file if it does not exists
        console.log("Welcome to WTD Analytics Command Line Shell!")
        console.log("analytics file name: ", this.fileName)
        console.log("version: ", this.version)
        readline.question(`>>> `, (input) => {
                input = input.toLowerCase()
                if (input == 'q') {
                    console.log("Thanks for using the shell.")
                    readline.close()
                }
                else {
                    if (input == "analyse") {
                        // process the analyse function here
                    }
                }
              })


    }
}


let s = new CommandLineShell("analytics.json")
s.shell()

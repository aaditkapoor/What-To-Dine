const ERRORS =  {
    NO_MENU_ERROR: "no menu found",
    NULL:"something is null"
}


function returnErrorToJson(e) {
    return JSON.stringify(e)
}


module.exports = {
    ERRORS,
    returnErrorToJson
}
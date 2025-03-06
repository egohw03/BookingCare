let getHomePage = (req, res) => {
    return res.send("Hello World from Controller");
}

module.exports = {
    getHomePage: getHomePage,
}
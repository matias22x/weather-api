const welcomeMiddleware = (req, res) => {
    res.status(200).send({message: 'Welcome to weather API'});
};

module.exports = {
    welcomeMiddleware
};

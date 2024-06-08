const sendResponseController = (req, res) => {
    res.status(200).send(res);
};

module.exports = {
    sendResponseController
};

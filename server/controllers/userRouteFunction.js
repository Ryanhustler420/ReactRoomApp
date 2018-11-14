exports.auth = function(req, res) {
    res.json({'auth':'route working'});
}

exports.register = function(req, res) {
    const {username, email, password, passwordConfirm} = req.body;
    res.json({username, email, password, passwordConfirm});
}
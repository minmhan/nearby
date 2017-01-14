module.exports.about = function(req, res){
    res.render('about', { title: 'About'});
};

module.exports.angularApp = function(req, res){
    res.render('layout', { title: 'near me'});
};
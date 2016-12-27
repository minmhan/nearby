var request = require('request');
var apiOptions = {
    server: "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production'){
    apiOptions.server = "http://nearbywifi.herokuapp.com"
}

var renderHomeList = function(req, res, responseBody){
    res.render('locations-list', { 
        title: 'Near By - find the place to work with wifi',
        pageHeader: {
            title: 'Near By',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar:"Looking for wifi and a seat? Loc8r helps you find places \
            to work when out and about. Perhaps with coffee, cake or a pint? \
            Let Loc8r help you find the place you're looking for.",
        locations: responseBody
    });
};

module.exports.homelist = function(req, res){
    var requestOptions, path;
    path = '/api/locations';
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
        qs: {
            lng: 0.9690885,
            lat: 51.455043,
            maxDistance: 20
        }
    };
    request(requestOptions, function(err, response, body){
        renderHomeList(req, res, body);
    });
};

module.exports.locationInfo = function(req, res){
    res.render('location-info', { 
        title: 'Near By - find the place to work with wifi',
        pageHeader: {
            title: 'Near By',
            strapline: 'Find places to work with wifi near you!'
        }
    });
};

module.exports.addReview = function(req, res){
    res.render('location-review-form', { title: 'Add Review'});
};
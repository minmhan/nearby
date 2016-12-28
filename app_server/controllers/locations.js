var request = require('request');
var apiOptions = {
    server: "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production'){
    apiOptions.server = "http://wifinearme.herokuapp.com"
}

var renderHomeList = function(req, res, responseBody){
    var message;
    if(!(responseBody instanceof Array)){
        message = "API lookup error";
        responseBody = [];
    }else{
        if(!responseBody.length){
            message = "No places found nearby."
        }
    }
    res.render('locations-list', { 
        title: 'Wifi Near Me - find the place to work with wifi',
        pageHeader: {
            title: 'Wifi Near Me',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar:"Looking for wifi and a seat? Wifi Near Me helps you find places \
            to work when out and about. Perhaps with coffee, cake or a pint? \
            Let Wifi Near Me help you find the place you're looking for.",
        locations: responseBody,
        message: message
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
            lng: -0.969088,
            lat: 52.455043,
            maxDistance: 800000
        }
    };
    request(requestOptions, function(err, response, body){
        var i, data;
        data = body;
        if(response.statusCode === 200 && data.length){
            for(i=0; i < data.length; i++){
                data[i].distance = _formatDistance(data[i].distance);
            }
        }
        renderHomeList(req, res, body);
    });
};

var _formatDistance = function(distance){
    var numDistance, unit;
    if(distance > 1){
        numDistance = parseFloat(distance).toFixed(1); // round to 1 decimal place
        unit = 'km';
    }else{
        numDistance = parseInt(distance * 1000, 10);
        unit = 'm';
    }
    return numDistance + unit;
};

module.exports.locationInfo = function(req, res){
    var requestOptions, path;
    path = "/api/locations/" + req.params.locationid;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(requestOptions, function(err, response, body){
        var data = body;
        data.coords = {
            lng: body.coords[0],
            lat: body.coords[1]
        };
        renderDetailPage(req,res, data);
    });
};

renderDetailPage = function(req, res, locDetail){
    res.render('location-info', { 
        title: locDetail.name,
        pageHeader: {
            title: locDetail.name,
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: {
            context: 'is on Near Me because it has accessible wifi and space to sit \
                down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t -\
                please leave a review to help other people just like you.' 
        },
        location: locDetail
    });
};

module.exports.addReview = function(req, res){
    res.render('location-review-form', { title: 'Add Review'});
};

module.exports.doAddReview = function(req, res){
    
}
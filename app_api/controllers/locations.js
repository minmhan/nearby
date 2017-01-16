var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var theEarth = (function(){
    var earthRadius = 6371; //km
    var getDistanceFromRads = function(rads){
        return parseFloat(rads * earthRadius);
    };
    var getRadsFromDistance = function(distance){
        return parseFloat(distance / earthRadius);
    };
    function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
        var R = 6378.137; // Radius of earth in KM
        var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d * 1000; // meters
    }
    return{
        getDistanceFromRads: getDistanceFromRads,
        getRadsFromDistance: getRadsFromDistance,
        measure: measure
    };
})();

var sendJsonResponse = function(res,status,content){
    res.status(status);
    res.json(content);
}

module.exports.locationsCreate = function(req,res){
    Loc.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(","),
        coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        openingTimes: [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1,
        },{
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed: req.body.closed2
        }]
    },
    function(err, location){
        if(err){
            sendJsonResponse(res, 404, err);
        }
        else{
            sendJsonResponse(res, 201, location);
        }
    });
};

//TODO: Fix distance function
module.exports.locationsListByDistance = function(req, res){
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var maxDistance = parseFloat(req.query.maxDistance);
    var point = {
        type:"Point",
        coordinates:[lng,lat]
    };
    var geoOptions = {
        spherical: true,
        maxDistance: maxDistance, //theEarth.getRadsFromDistance(300),
        distanceMultiplier: 1,
        distanceField: "dist.calculated",
        num:10
    };
    //console.log(geoOptions);
    //console.log(theEarth.measure(0.9690884,51.455041, 0.9690885,51.455043));
    Loc.geoNear(point, geoOptions, function(err, results, stats){
        var location = [];
        if(err){
            sendJsonResponse(res, 404, err);
        }
        else{
            results.forEach(function(doc){
                location.push({
                    distance:doc.dis, //theEarth.getDistanceFromRads(doc.dis),
                    name: doc.obj.name,
                    address: doc.obj.address,
                    rating: doc.obj.rating,
                    facilities: doc.obj.facilities,
                    _id: doc.obj._id
                });
            });
            sendJsonResponse(res, 200, location);
        }
    });
};

module.exports.locationsReadOne = function(req, res){
    if(req.params && req.params.locationid){
        Loc.findById(req.params.locationid).exec(function(err,location){
            if(!location){
                sendJsonResponse(res,404, {"message":"location not found"});
                return;
            }else if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res,200,location);
        });
    }
    else{
        sendJsonResponse(res, 404, { "message":"no locationid in request"});
    }
};
module.exports.locationsUpdateOne = function(req, res){};
module.exports.locationsCreateOne = function(req, res) {};
module.exports.locationsDeleteOne = function(req, res) {
    var locationid = req.params.locationid;
    if(locationid){
        Loc.findByIdAndRemove(locationid).exec(function(err, location){
            if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 204, null);
        });
    }else{
        sendJsonResponse(res, 404, {
            "message":"no locationid"
        });
    }
};


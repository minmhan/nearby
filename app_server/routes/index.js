var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');

// location pages
router.get('/', ctrlLocations.homelist);
router.get('/location/:locationid', ctrlLocations.locationInfo);
router.get('/location/reviews/new', ctrlLocations.addReview);
router.post('/location/:locationid/reviews/new', ctrlLocations.doAddReview);

// other pages
router.get('/about', ctrlOthers.about);

/* GET home page. */
//router.get('/', ctrlMain.index);

module.exports = router;

module.exports.homelist = function(req, res){
    res.render('locations-list', { 
        title: 'Near By - find the place to work with wifi',
        pageHeader: {
            title: 'Near By',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar:"Looking for wifi and a seat? Loc8r helps you find places \
            to work when out and about. Perhaps with coffee, cake or a pint? \
            Let Loc8r help you find the place you're looking for.",
        locations:[{
            name: 'Star Cups',
            address: 'Blk 305, And Mo Kio Singapore',
            rating: 3,
            facilities: ['Hot Drink', 'Food', 'Premium Coffee'],
            distance: '100m'
        },{
            name: 'Cafe Hero',
            address: 'Bo Aung Kyaw Street, Yangon, Myanmar',
            rating: 4,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '200m'
        },{
            name: 'Gold Coffee',
            address: 'Sanchaung Garden, Yangon',
            rating:2,
            facilities:['Hot Drink', 'Food', 'Premium Wifi'],
            distance:'230m'
        }]
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
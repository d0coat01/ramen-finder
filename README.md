# Ramen Finder :ramen:

Find the best ramen in San Francisco! Yelp-curated ramen shops are displayed on a Google map. Filter restaurants by Yelp rating!

## Installation :rocket:

1. `git clone https://github.com/d0coat01/ramen-finder`
2. `npm install`
3. `npm run api-server`
4. Open up index.html in your browser. OR `python -m SimpleHTTPServer 8000` to host the frontend portion.

## Tech Stack 
* Jquery - ajax calls
* Google Maps API - map
* KnockoutJs - javascript framework
* Nodejs with ExpressJs - backend nodejs server for Yelp API calls

## Code Navigation 

* `index.html` - main HTML page with google map and Knockout list
* `css/*` - all styling files
* `js/main.js` - Knockout bindings
* `js/google-maps.js - Google Map objects and associated functions.
* `images/yelp` - Yelp rating images
* `svg/*` - SVGs (ramen bowl)
* `api/server.js` - Express server for Yelp API call

## Sources

* Ramen SVG by Mayene de La Cruz from the [Noun Project](https://thenounproject.com/term/ramen/18272/)
* [Google Maps API](https://cloud.google.com/maps-platform/)
* [KnockoutJs](http://knockoutjs.com/index.html)
* [Yelp API](https://www.yelp.com/developers/documentation/v3)

## License
[MIT](https://choosealicense.com/licenses/mit/) License 2018. This code may be shared, copied, and changed freely.

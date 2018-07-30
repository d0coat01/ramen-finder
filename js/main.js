/**
* @description Ramen Finder's Knockout View Model
*/
function ramenViewModel() {
  const self = this;

  //knockout variables and constant definitions.
  self.shops = ko.observableArray([]);
  self.selectedShops = ko.observableArray([]);
  self.ratings = ['All', 5, 4.5, 4, 3, 2, 1];
  self.selectedRating = ko.observable('All');
  self.showMenu = ko.observable(true);
  self.errorMessage = ko.observable(false);

  //get all ramen restaurants in San Francisco.
  $.ajax({
    url: 'http://localhost:3000/search-ramen',
    method: 'GET',
    dataType: 'json',
  }).done((result) => {
    self.errorMessage(false);
    for (let shop of result.businesses) {
      // Map rating to yelp rating image source.
      const rating = shop.rating.toString();
      const half_star = rating.search('.5') !== -1 ? '_half' : '';
      const full_stars = rating[0];
      shop.rating_img_src = 'images/yelp/small/small_' + full_stars + half_star + '.png';
      shops.push(shop);
      //default all shops to selected.
      self.toggleShop(shop);
    }
  })
    .catch((error) => {
      console.log(error);
      self.errorMessage('Uh oh! There was a problem cooking up the ramen shop list!')

    });
  /**
  * @description Toggles the showMenu boolean. Used for showing/hiding ramen list sidebar.
  */
  self.toggleMenu = function () {
    self.showMenu(!self.showMenu());
  }

  /**
  * @description Whenever the rating filter is changed, display the appropriate ramen shops.
  */
  self.ratingChange = function () {
    const rating = self.selectedRating() === 'All' ? 0 : parseFloat(self.selectedRating());
    for (let shop of self.shops()) {
      const selected = self.selectedShops().indexOf(shop.id) !== -1;
      if (!selected && shop.rating >= rating) {
        //shop is not selected but should be.
        self.toggleShop(shop);
      }
      if (selected && shop.rating < rating) {
        //shop is selected but should not be.
        self.toggleShop(shop);
      }
    }
  };
  /**
  * @description Toggles a ramen shop between selected and not selected.
  * @constructor
  * @param {object} shop - A ramen shop object.
  */
  self.toggleShop = function (shop) {
    const selected = self.selectedShops().indexOf(shop.id) === -1;
    if (selected) {
      self.selectedShops.push(shop.id);
    }
    else {
      self.selectedShops.remove(shop.id);
    }
    displayShop(shop);
  };
}
//End of Ramen View Model

/**
* @description A hook into google map markers. Toggles the marker of the target ramen shop.
* @constructor
* @param {object} shop - A ramen shop object.
*/
function displayShop(shop) {
  shop.lat = parseFloat(shop.coordinates.latitude);
  shop.lng = parseFloat(shop.coordinates.longitude);
  toggleMarker(shop);
}

ko.applyBindings(ramenViewModel);

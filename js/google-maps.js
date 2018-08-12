"use strict";

var markers = [];
var map, infowindow;

const CONSTANTS = {
    //center of San Francisco
    MAP_CENTER_COORD: { lat: 37.761549, lng: -122.440021 },
    MAP_ZOOM: 12,

}
/**
* @description Creates a google Map object and Infowindow object
*/
function initMap() {
    const locations = [
    ];
    map = new google.maps.Map(document.getElementById('map'), {
        center: CONSTANTS.MAP_CENTER_COORD,
        zoom: CONSTANTS.MAP_ZOOM
    });
    infowindow = new google.maps.InfoWindow({});
    //addMarkers(locations);
    //const drawingmanager = addDrawingTools(map);
}

/**
* @description Toggles a ramen shop marker. If placing a marker,
* parses the shop's yelp reviews, and attaches appropriate event listeners.
* @constructor
* @param {object} location - A ramen shop location object.
*/
function toggleMarker(location) {
    //check if location exists in markers....if it does, remove it and return.
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].yelp.id === location.id) {
            markers[i].setVisible(false); //remove marker
            markers.splice(i, 1);
            return;
        }
    }

    //grab desired Yelp info
    const yelp = {
        address: location.location.display_address,
        image: location.image_url,
        price: location.price,
        name: location.name,
        id: location.id
    };

    const marker = new google.maps.Marker({
        position: location,
        map: map,
        draggable: true,
        title: 'First!',
    });
    marker.yelp = yelp;
    marker.addListener('click', () => openWindow(marker, infowindow));
    markers.push(marker);
}

/**
* @description Sets the bounce animation for a marker
* @constructor
* @param {google.maps.Marker} marker - A Google Marker object
*/
function setBounce(marker) {
    const animation = marker.getAnimation();
    if (typeof animation === "undefined" || animation === null) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => { marker.setAnimation(null) }, 2000);
    }
}

/**
* @description Displays an Infowindow over the selected marker.
* @param {google.maps.Marker} marker -  A Google Marker object
* @param {google.maps.InfoWindow} infowindow - A Google InfoWindow object
*/
function openWindow(marker, infowindow) {
    //convert marker yelp info into html
    const address = "<div>" + marker.yelp.address.join("</div><div>") + "</div>";
    const content = `<div class='marker'>
    <img class='marker__image' src='${marker.yelp.image}' alt='Yelp picture of restaurant'>
        <div><strong>${marker.yelp.name}</strong>
        ${address}
    </div>`;
    infowindow.setContent(content);
    infowindow.open(map, marker);
    setBounce(marker);
}

function displayMarkerInfo(shop) {
    //check if location exists in markers....if it does, remove it and return.
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].yelp.id === shop.id) {
           openWindow(markers[i], infowindow);
        }
    }
}

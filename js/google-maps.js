var markers = [];
var map, polygon, infowindow;
const COLORS = ["red", "blue", "green", "yellow"];
function initMap() {
    const locations = [
        { lat: -34.433253313346334, lng: 150.8911923828125 },
        { lat: -34.885090952923406, lng: 150.6055478515625 },
        { lat: -34.397, lng: 150.644 }
    ];
    const location = { lat: 37.761549, lng: -122.440021 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 12,
    });
    infowindow = new google.maps.InfoWindow({});
    //addMarkers(locations);
    //const drawingmanager = addDrawingTools(map);
}
function addDrawingTools() {
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT,
            drawingModes: ['polygon']
        },
    });
    drawingManager.setMap(map);
    drawingManager.addListener("overlaycomplete", (event) => {
        if (polygon) {
            polygon.setMap(null);
            hideListings();
        }
        drawingManager.setDrawingMode(null);
        polygon = event.overlay;
        polygon.setEditable(true);
        areaWithinPolygon();
        polygon.getPath().addListener("set_at", areaWithinPolygon);
        polygon.getPath().addListener("insert_at", areaWithinPolygon);
    });
    document.getElementById("drawing-tools").addEventListener("click",
        () => toggleDrawingTools(drawingManager));
    return drawingManager;
}
function areaWithinPolygon() {
    console.log(polygon);
    const area = google.maps.geometry.spherical.computeArea(polygon.getPath());
    infowindow.setContent(Number.parseFloat(area).toFixed(2) + " square meters");
    var bounds = new google.maps.LatLngBounds();
    polygon.getPath().forEach(function (element, index) { bounds.extend(element) });
    infowindow.setPosition(bounds.getCenter().toJSON());
    infowindow.open(map);

}
function addMarkers(locations) {
    for (let location of locations) {
        const icon = 'http://maps.google.com/mapfiles/ms/icons/' + COLORS[Math.floor((Math.random() * COLORS.length))] + '-dot.png';
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            draggable: true,
            icon: icon,
            animation: google.maps.Animation.DROP,
            title: 'First!',
        });
        marker.addListener('click', () => openWindow(marker, infowindow));
        markers.push(marker);
    }
}
function openWindow(marker, infowindow) {
    infowindow.setContent(marker.getPosition().toString());
    infowindow.open(map, marker);
}
function toggleDrawingTools(drawingManager) {
    if (drawingManager.map) {
        drawingManager.setMap(null);
    }
    else {
        drawingManager.setMap(map);
    }
}
// var map = L.map('map').setView([-22.488429472427363, -48.578513439052124], 6);

var map = L.map('map', {
    center: [-22.48767820119978, -48.579507006593325],
    zoom: 13
});

var theMarker = undefined;
var radiusMarker = undefined;

var geojsonFeature = {
    "type": "FeatureCollection",
    "name": "geo-teste",
    "crs": {
        "type": "name",
        "properties": {
            "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
    },
    "features": [
        {
            "type": "Feature",
            "properties": {
                name: 'A'
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -48.579166243834862,
                            -22.488644765011117
                        ],
                        [
                            -48.579033143404878,
                            -22.488813206795299
                        ],
                        [
                            -48.579159711044028,
                            -22.488902931636634
                        ],
                        [
                            -48.579290783014031,
                            -22.488736907276927
                        ],
                        [
                            -48.579166243834862,
                            -22.488644765011117
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                name: 'B'
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -48.57975617904399,
                            -22.489115062400522
                        ],
                        [
                            -48.579612936314085,
                            -22.489295591307073
                        ],
                        [
                            -48.579415485436215,
                            -22.489138149357277
                        ],
                        [
                            -48.579565591475053,
                            -22.48895925994622
                        ],
                        [
                            -48.57975617904399,
                            -22.489115062400522
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                name: 'C'
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -48.580102343345757,
                            -22.489384931215973
                        ],
                        [
                            -48.579977356755712,
                            -22.489543703302257
                        ],
                        [
                            -48.579895164323602,
                            -22.489474735662792
                        ],
                        [
                            -48.580023735231592,
                            -22.489331329689865
                        ],
                        [
                            -48.580102343345757,
                            -22.489384931215973
                        ]
                    ]
                ]
            }
        }
    ]
}


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//add geojson in map
var geojson = L.geoJSON(geojsonFeature);
geojson.addTo(map);

// add pin (tooltip) in panes on click
geojson.eachLayer(function (layer) {
    layer.bindPopup(layer.feature.properties.name);
});

map.fitBounds(geojson.getBounds());

map.locate({ setView: true, watch: true, maxZoom: 16 });

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    if (theMarker == undefined) {
        theMarker = L.marker(e.latlng).addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup();
        radiusMarker = L.circle(e.latlng, radius).addTo(map);
    }
    else {
        theMarker.setLatLng(e.latlng);
        radiusMarker.setLatLng(e.latlng);
        radiusMarker.setRadius(radius);
    }

}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);



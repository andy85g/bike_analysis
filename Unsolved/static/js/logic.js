// let newYorkCoords = [40.73, -74.0059];
// let mapZoomLevel = 12;

// Create the createMap function.
let myMap = L.map("map", {
  center: [40.73, -74.0059],
  zoom: 12
});

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

  // Create the tile layer that will be the background of our map.
  var lightmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 12
}).addTo(map); 

  // Create a baseMaps object to hold the lightmap layer.

  var baseMaps = {
    "Light Map": lightmap
};
function createMap(bikeStations) {
  // Create the baseMaps object to hold the lightmap layer.
  var lightmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 19
  });

  var baseMaps = {
      "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer.
  var overlayMaps = {
      "Bike Stations": bikeStations
  };

  // Create the map object with options.
  var map = L.map('map', {
      center: [40.7128, -74.0060], // New York City coordinates
      zoom: 12,
      layers: [lightmap, bikeStations] // Add the default layers to the map
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
      collapsed: false // Keep the layer control expanded by default
  }).addTo(map);
}

// Define the createMarkers function to process station data and create markers.
function createMarkers(response) {
  // Extract the stations array from the response.
  var stations = response.data.stations;

  // Initialize an array to hold the bike markers.
  var bikeMarkers = [];

  // Loop through the stations array.
  stations.forEach(station => {
      // Create a marker for each station.
      var marker = L.marker([station.lat, station.lon])
          .bindPopup(`<h3>${station.name}</h3><hr><p>Capacity: ${station.capacity}</p>`);

      // Add the marker to the bikeMarkers array.
      bikeMarkers.push(marker);
  });

  // Create a layer group from the bike markers array and pass it to createMap.
  var bikeLayerGroup = L.layerGroup(bikeMarkers);
  createMap(bikeLayerGroup);
}

// Use D3 to retrieve the Citi Bike station information and call createMarkers.
d3.json('https://gbfs.citibikenyc.com/gbfs/en/station_information.json').then(createMarkers).catch(error => {
  console.error("Error fetching Citi Bike data:", error);
});

function createMarkers(response) {
  // Pull the "stations" property from response.data.
  var stations = response.data.stations;

  // Initialize an array to hold the bike markers.
  var bikeMarkers = [];

  // Loop through the stations array.
  stations.forEach(station => {
      // For each station, create a marker, and bind a popup with the station's name and capacity.
      var marker = L.marker([station.lat, station.lon])
          .bindPopup(`<h3>${station.name}</h3><hr><p>Capacity: ${station.capacity}</p>`);

      // Add the marker to the bikeMarkers array.
      bikeMarkers.push(marker);
  });

  // Create a layer group that's made from the bike markers array.
  var bikeLayerGroup = L.layerGroup(bikeMarkers);

  // Pass the layer group to the createMap function.
  createMap(bikeLayerGroup);
}

// Perform an API call to the Citi Bike API to get the station information.
// Call createMarkers when it completes.
d3.json('https://gbfs.citibikenyc.com/gbfs/en/station_information.json')
  .then(createMarkers)
  .catch(error => console.error("Error fetching Citi Bike data:", error));

// Define the createMap function.
function createMap(bikeStations) {
  // Create the baseMaps object to hold the lightmap layer.
  var lightmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 19
  });

  var baseMaps = {
      "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer.
  var overlayMaps = {
      "Bike Stations": bikeStations
  };

  // Create the map object with options.
  var map = L.map('map', {
      center: [40.7128, -74.0060], // New York City coordinates
      zoom: 12,
      layers: [lightmap, bikeStations] // Add the default layers to the map
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
      collapsed: false // Keep the layer control expanded by default
  }).addTo(map);
}
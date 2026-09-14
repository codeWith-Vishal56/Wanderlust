const coordinates = listing.geometry.coordinates;

const longitude = coordinates[0];
const latitude = coordinates[1];

const map = L.map("map").setView([latitude, longitude], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup(listing.title)
    .openPopup();
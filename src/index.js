import './style.css';

import { SceneManager } from './components/SceneManager.js';
import { MapHandler } from './components/MapHandler.js';
import { Marker } from './components/Marker.js';
import { Tags } from './components/Tags.js';

async function getData(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return await response.json();
}

const URL = "https://vehicle-api-test.herokuapp.com/api/vehicles";

const loadingDiv = document.getElementById('loading');

const BL = {lat: 51.662187, lng: -1.366425};
const BR = {lat: 51.662187, lng: -1.148908};
const TL = {lat: 51.797113, lng: -1.366425};
const BLTOBR = 150; // 15km
const BLTOTL = 150; // 15km

let sceneManager;

(async function demo() {
  sceneManager = new SceneManager(BLTOBR, BLTOTL); // args for camera position/lookAt

  const mapHandler = new MapHandler(BL, BR, TL, BLTOBR, BLTOTL);
  const map = mapHandler.createMap();
  sceneManager.scene.add(map);

  // get vehicle array and its telemetry
  const latLng = {};
  const vehicles = await getData(URL);
  
  for (let vehicle of vehicles) {
    const telemetry = await getData(`${URL}/${vehicle.id}/telemetry`);
    const key = [telemetry.lat, telemetry.lng];
    const vehicleData = {...vehicle, ...telemetry};

    if (key in latLng) {
      latLng[key].push(vehicleData);
    
    } else {
      latLng[key] = [vehicleData];
    }
  } 

  loadingDiv.style.display = 'none';

  // create markers and tags
  for (let key in latLng) {
    const [lat, lng] = key.split(',');

    const marker = new Marker();
    marker.createText(key); // optional: a marker can exist without text    

    // create ul and li for vehicle data per lat, lng
    const tag = new Tags(lat, lng);
    for (let vehicleIdx in latLng[key]) {
      tag.addLi(latLng[key][vehicleIdx]);
      document.body.appendChild(tag.ul);
    }

    // keep ref for hiding/showing tags and markers
    sceneManager.addTag(tag);
    sceneManager.addMarker(marker);

    // pin: sphere, line, optional text
    sceneManager.scene.add(marker.pin);
    mapHandler.setMarkerPosition(marker, lat, lng); 
  }

  // show first pin
  sceneManager.markers[0].setVisibility(true);
  sceneManager.tags[0].setVisibility(true);

  animate();

})();

// placed here instead within sceneManager -> 
// some obj might want to animate without ref to sceneManager
function animate() {
  requestAnimationFrame(animate);
  sceneManager.update();
}

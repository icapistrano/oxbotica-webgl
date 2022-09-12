import * as THREE from 'three';
import { Text } from './Text.js';

export class Marker {
  constructor(latLng) {
    this.latLng = latLng;

    this.POINTRAD = 3;
    this.SEGMENTS = 32;
    this.POINTCOLOUR = 0XFF0000;
    this.LINECOLOUR = 0XFFFFFF;
    this.YOFFSET = 15;

    this.pin = new THREE.Group();
    
    this.createPoint();
    this.createLine();

    this.setVisibility(false); // hide pin at start
  }

  setVisibility(toShow) {
    this.pin.visible = toShow;
  }

  createPoint() {
    const geometry = new THREE.SphereGeometry(this.POINTRAD, this.SEGMENTS, this.SEGMENTS);
    const material = new THREE.MeshBasicMaterial({ color: this.POINTCOLOUR});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.setY(this.YOFFSET);
    this.pin.add(mesh);
  }

  createLine() {
    const start = new THREE.Vector3(0, this.YOFFSET, 0);
    const end =  new THREE.Vector3(0, -10, 0);
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const material = new THREE.LineBasicMaterial({color: this.LINECOLOUR});
    const mesh = new THREE.Line( geometry, material );
    this.pin.add(mesh);
  }

  async createText(text) {
    const tag = new Text();
    const latLngText = await tag.createText(text);
    latLngText.position.setY(this.YOFFSET + this.POINTRAD * 2);
    latLngText.rotateY(THREE.MathUtils.degToRad(45)); // face text to camera
    this.pin.add(latLngText);
  }
}
import * as THREE from 'three';

export class MapHandler {
  constructor(BL, BR, TL, distanceBLBR, distanceBLTL) {
    this.BL = BL;
    this.BR = BR;
    this.TL = TL;

    this.distanceBLBR = distanceBLBR;
    this.distanceBLTL = distanceBLTL;

    this.WIREFRAME = true;
    this.WIREFRAMECOLOUR = 0x707070;
    this.MAXZOFFSET = 4;
  }

  createMap(wSEGMENTS=30, hSegments=30) {
    const geometry = new THREE.PlaneGeometry(this.distanceBLBR, this.distanceBLTL, wSEGMENTS, hSegments);

    const buffer = geometry.getAttribute('position').array;

    // change z height
    for (let i=2; i <= buffer.length; i+=3) {
      buffer[i] = Math.random() * this.MAXZOFFSET;
    }

    const material = new THREE.MeshBasicMaterial({color: this.WIREFRAMECOLOUR, wireframe: this.WIREFRAME});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(this.distanceBLBR/2, 0, this.distanceBLTL/2);
    mesh.rotateX(THREE.MathUtils.degToRad(90)); // flip plane to match scene orientation
    return mesh;
  }

  setMarkerPosition(marker, lat, lng) {
    const x = this.mapRange(lng, this.BL.lng, this.BR.lng, 0, this.distanceBLBR);
    const y = this.mapRange(lat, this.BL.lat, this.TL.lat, 0, this.distanceBLTL);
    marker.pin.position.set(x, 0, y);
  }

  // arduino map value between range
  mapRange(value, inputMin, inputMax, outputMin, outPutMax) {
    return outputMin + (outPutMax - outputMin) * (value - inputMin) / (inputMax - inputMin);
  }
}
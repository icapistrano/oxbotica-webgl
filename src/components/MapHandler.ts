import {
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  Group,
} from 'three';

import { LatLng } from '../ts/interfaces/data_interfaces';


export class MapHandler {
  private BL: LatLng;
  private BR: LatLng;
  private TL: LatLng;

  private distanceBLBR: number;
  private distanceBLTL: number;

  private WIREFRAME: boolean;
  private WIREFRAMECOLOUR: number;

  constructor(BL: LatLng, BR: LatLng, TL: LatLng, distanceBLBR: number, distanceBLTL: number) {
    this.BL = BL;
    this.BR = BR;
    this.TL = TL;

    this.distanceBLBR = distanceBLBR;
    this.distanceBLTL = distanceBLTL;

    this.WIREFRAME = true;
    this.WIREFRAMECOLOUR = 0x707070;
  }

  createMap(wSEGMENTS: number = 30, hSegments: number = 30) {
    const geometry = new PlaneGeometry(this.distanceBLBR, this.distanceBLTL, wSEGMENTS, hSegments);

    const material = new MeshBasicMaterial({color: this.WIREFRAMECOLOUR, wireframe: this.WIREFRAME});
    const mesh = new Mesh(geometry, material);
    mesh.position.set(this.distanceBLBR/2, 0, this.distanceBLTL/2);
    mesh.rotateX(90 * (Math.PI / 180)); // flip plane to match scene orientation
    return mesh;
  }

  setMarkerPosition(markerPin: Group, lat: number, lng: number) {
    const x = this.mapRange(lng, this.BL.lng, this.BR.lng, 0, this.distanceBLBR);
    const y = this.mapRange(lat, this.BL.lat, this.TL.lat, 0, this.distanceBLTL);
    markerPin.position.set(x, 0, y);
  }

  // arduino map value between range
  mapRange(value: number, inputMin: number, inputMax: number, outputMin: number, outPutMax: number) {
    return outputMin + (outPutMax - outputMin) * (value - inputMin) / (inputMax - inputMin);
  }
}
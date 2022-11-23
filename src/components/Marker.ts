import { Text } from './Text';

import {
  Group,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector3,
  BufferGeometry,
  LineBasicMaterial,
  Line
} from 'three';

export class Marker {
  private POINTRAD: number;
  private SEGMENTS: number;
  private POINTCOLOUR: number;
  private LINECOLOUR: number;
  private YOFFSET: number;

  public pin: Group;

  constructor() {
    this.POINTRAD = 3;
    this.SEGMENTS = 32;
    this.POINTCOLOUR = 0XFF0000;
    this.LINECOLOUR = 0XFFFFFF;
    this.YOFFSET = 15;

    this.pin = new Group();
    
    this.createPoint();
    this.createLine();

    this.setVisibility(false); // hide pin at start
  }

  setVisibility(toShow: boolean) {
    this.pin.visible = toShow;
  }

  createPoint() {
    const geometry = new SphereGeometry(this.POINTRAD, this.SEGMENTS, this.SEGMENTS);
    const material = new MeshBasicMaterial({ color: this.POINTCOLOUR});
    const mesh = new Mesh(geometry, material);
    mesh.position.setY(this.YOFFSET);
    this.pin.add(mesh);
  }

  createLine() {
    const start = new Vector3(0, this.YOFFSET, 0);
    const end =  new Vector3(0, -10, 0);
    const geometry = new BufferGeometry().setFromPoints([start, end]);
    const material = new LineBasicMaterial({color: this.LINECOLOUR});
    const mesh = new Line( geometry, material );
    this.pin.add(mesh);
  }

  createText(text: string) {
    const tag = new Text();
    const latLngText = tag.createText(text);
    latLngText.position.setY(this.YOFFSET + this.POINTRAD * 2);
    latLngText.rotateY(45 * (Math.PI / 180)); // face text to camera
    this.pin.add(latLngText);
  }
}
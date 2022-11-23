import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import helvetikerRegular from '../../public/assets/helvetiker_regular.typeface.json'

export class Text {
  constructor() {
    this.FONT = helvetikerRegular;
    this.FONTSIZE = 2.5;
    this.TEXTCOLOUR = 0xFFFFFF;
    this.TEXTHEIGHT = 0.01;

    this.TAGPOSX = -15;
    this.TAGPOSY = 6.5;
  }

  async createText(text) {
    const font = new FontLoader().parse(this.FONT);
    const geometry = new TextGeometry(text, {font: font, size: this.FONTSIZE, height: this.TEXTHEIGHT});
    const material = new THREE.MeshBasicMaterial({ color: this.TEXTCOLOUR });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }
}
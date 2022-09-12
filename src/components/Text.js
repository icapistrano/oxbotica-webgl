import * as THREE from 'three';
import { FontLoader } from 'https://unpkg.com/three@0.144.0/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://unpkg.com/three@0.144.0/examples/jsm/geometries/TextGeometry.js';

export class Text {
  constructor() {
    this.FONT = 'https://unpkg.com/three@0.144.0/examples/fonts/helvetiker_regular.typeface.json';
    this.FONTSIZE = 2.5;
    this.TEXTCOLOUR = 0xFFFFFF;
    this.TEXTHEIGHT = 0.01;

    this.TAGPOSX = -15;
    this.TAGPOSY = 6.5;
  }

  loadFont() {
    return new Promise((res) => {
      const loader = new FontLoader();
      loader.load(this.FONT, (font) => {
        res(font);
      })
    })
  }

  async createText(text) {
    const font = await this.loadFont();
    const geometry = new TextGeometry(text, {font: font, size: this.FONTSIZE, height: this.TEXTHEIGHT});
    const material = new THREE.MeshBasicMaterial({ color: this.TEXTCOLOUR });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }
}
import * as helvetikerRegular from '../../public/assets/helvetiker_regular.typeface.json'

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import {
  MeshBasicMaterial,
  Mesh
} from 'three';

export class Text {
  private FONT: typeof helvetikerRegular;
  private FONTSIZE: number;
  private TEXTCOLOUR: number;
  private TEXTHEIGHT: number;

  constructor() {
    this.FONT = helvetikerRegular;
    this.FONTSIZE = 2.5;
    this.TEXTCOLOUR = 0xFFFFFF;
    this.TEXTHEIGHT = 0.01;
  }

  createText(text: string) {
    const font = new FontLoader().parse(this.FONT);
    const geometry = new TextGeometry(text, {font: font, size: this.FONTSIZE, height: this.TEXTHEIGHT});
    const material = new MeshBasicMaterial({ color: this.TEXTCOLOUR });
    const mesh = new Mesh(geometry, material);
    return mesh;
  }
}
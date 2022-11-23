import { Tags } from './Tags';

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Vector3,
  Object3D
} from 'three';


export class SceneManager {
  public scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer; 
  private lookAt: Vector3;

  private YCAMOFFSET: number;

  private distanceBLBR: number;
  private distanceBLTL: number;

  private canvas: HTMLCanvasElement;
  private leftBtn: HTMLButtonElement;
  private rightBtn: HTMLButtonElement;

  public tags: Tags[];
  public markers: any[];
  private markerToShow: number;

  constructor(distanceBLBR: number, distanceBLTL: number) {
    this.distanceBLBR = distanceBLBR;
    this.distanceBLTL = distanceBLTL;

    this.canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.leftBtn = document.getElementById('left-btn') as HTMLButtonElement;
    this.rightBtn = document.getElementById('right-btn') as HTMLButtonElement;
    
    this.YCAMOFFSET = 30;

    // scene
    this.scene = new Scene();

    // camera 
    this.camera = new PerspectiveCamera( 75, this.canvas.width / this.canvas.height, 0.1, 1000 );
    this.lookAt = new Vector3(this.distanceBLBR/2, 0, this.distanceBLTL/2);

    this.camera.position.set(this.distanceBLBR,this.YCAMOFFSET,this.distanceBLTL);

    this.camera.lookAt(this.lookAt);

    // renderer
    this.renderer = new WebGLRenderer({canvas:this.canvas, antialias:true});
    this.renderer.setSize( this.canvas.width, this.canvas.height );

    // keep track of markers/tag to show 
    this.tags = [];
    this.markers = [];
    this.markerToShow = 0;

    this.attachEvents();
  }

  attachEvents() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    })

    const toggleElement = (idx: number, state: boolean) => {
      this.markers[idx].setVisibility(state);
      this.tags[idx].setVisibility(state);
    }

    this.leftBtn.addEventListener('click', () => {
      if (this.markerToShow <= 0) return;

      toggleElement(this.markerToShow, false);
      this.markerToShow -= 1;
      toggleElement(this.markerToShow, true);
    })

    this.rightBtn.addEventListener('click', () => {
      if (this.markerToShow >= this.markers.length - 1) return;
      
      toggleElement(this.markerToShow, false);
      this.markerToShow += 1;
      toggleElement(this.markerToShow, true);
    })
  }

  addMarker(marker: any) {
    this.markers.push(marker);
  }

  addTag(tag: Tags) {
    this.tags.push(tag);
  }
  
  update() {
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  }
}

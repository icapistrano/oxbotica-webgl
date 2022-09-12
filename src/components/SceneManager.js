import * as THREE from 'three';

export class SceneManager {
  constructor(distanceBLBR, distanceBLTL) {
    this.distanceBLBR = distanceBLBR;
    this.distanceBLTL = distanceBLTL;

    this.canvas = document.getElementById('webgl-canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.leftBtn = document.getElementById('left-btn');
    this.rightBtn = document.getElementById('right-btn');
    
    this.YCAMOFFSET = 30;

    // scene
    this.scene = new THREE.Scene();

    // camera 
    this.camera = new THREE.PerspectiveCamera( 75, this.canvas.width / this.canvas.height, 0.1, 1000 );
    this.lookAt = new THREE.Vector3(this.distanceBLBR/2, 0, this.distanceBLTL/2);

    this.camera.position.set(this.distanceBLBR,this.YCAMOFFSET,this.distanceBLTL);

    this.camera.lookAt(this.lookAt);

    // renderer
    this.renderer = new THREE.WebGLRenderer({canvas:this.canvas, antialias:true});
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

    const toggleElement = (idx, state) => {
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

  addMarker(marker) {
    this.markers.push(marker);
  }

  addTag(tag) {
    this.tags.push(tag);
  }
  
  update() {
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  }
}

import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as THREE from "three";
import * as GSAP from "gsap";
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  @ViewChild("rendererContainer", { static: false })
  rendererContainer: ElementRef;
  renderer = new THREE.WebGLRenderer({ antialias: true });
  scene = null;
  camera = null;
  mesh = [];
  light = null;
  light1 = null;
  raycaster;
  mouse;
  intersects;
  tl;

  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );

    this.renderer.setClearColor("#e5e5e5");
    this.camera.position.z = 5;

    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    // new THREE.MeshBasicMaterial({
    //   color: 0xff0000,
    //   wireframe: true
    // });
    for (var i = 0; i < 9; i++) {
      this.mesh[i] = new THREE.Mesh(geometry, material);
      this.mesh[i].position.x = (Math.random() - 0.5) * 10;
      this.mesh[i].position.y = (Math.random() - 0.5) * 10;
      this.mesh[i].position.z = (Math.random() - 0.5) * 10;
      this.scene.add(this.mesh[i]);
    }
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
    this.light = new THREE.PointLight(0xffffff, 1, 1000);
    this.light.position.set(0, 0, 0);
    this.scene.add(this.light);

    this.light1 = new THREE.PointLight(0xffffff, 2, 1000);
    this.light1.position.set(0, 0, 25);
    this.scene.add(this.light1);
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    for (var i = 0; i < 9; i++) {
      this.mesh[i].rotation.x += 0.0125;
      this.mesh[i].rotation.y += 0.002;
    }
    this.renderer.render(this.scene, this.camera);
  }
  ngOnInit() {
    window.addEventListener("resize", () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect(window.innerWidth / window.innerHeight);
      this.camera.updateProjectMatrix();
    });
    // function that I will do make the books shake
    window.addEventListener("mouseover", this.mouseover);
  }
  mouseover(event) {
    event.preventDefault();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.intersects = this.raycaster.setFromCamera(this.mouse, this.camera);
    for (var i = 0; i < this.intersects.length; i++) {
      this.tl = new GSAP.TimelineMax();
      this.tl.to(this.intersects[i].object.scale, 1, {
        x: 2,
        ease: Expo.easeOut
      });
      this.tl.to(this.intersects[i].object.scale, 0.5, {
        x: 0.5,
        ease: Expo.easeOut
      });
      this.tl.to(this.intersects[i].object.position, 0.5, {
        x: 2,
        ease: Expo.easeOut
      });
      this.tl.to(
        this.intersects[i].object.rotation,
        0.5,
        { y: Math.PI * 0.5, ease: Expo.easeOut },
        "=-1.5"
      );
    }
  }
}

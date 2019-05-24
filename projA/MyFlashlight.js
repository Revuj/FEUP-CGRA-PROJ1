/**
 * MyFlashlight.js
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlashlight extends CGFobject {

    constructor(scene) {
        super(scene);
        this.lateralSide = new MyPrism(scene,6,12,true,true);
        this.top = new MyPyramid(scene, 6 ,12);

     
    };
    display() {
        const pi = Math.PI;
        const base = 0.3;
        const height = 0.5;
        const bigBase = 0.4;
        const baseHeight = 0.1;

        this.scene.pushMatrix();
        this.scene.scale(base,height,base);  
        this.scene.translate(0,3*(height+baseHeight),0);
        this.scene.toplight.apply();
        this.top.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(bigBase,baseHeight,bigBase);
        this.scene.rotate(-pi/2 ,1,0,0);
        this.lateralSide.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,baseHeight,0);
        this.scene.scale(base,height+base,base);
        this.scene.rotate(-pi/2 ,1,0,0);
        this.scene.sidelight.apply();
        this.lateralSide.display();
        this.scene.popMatrix();

    };
}
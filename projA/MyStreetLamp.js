/**
* MyStreetLamp
* @constructor
* @param scene 
* @param x x position
* @param z  z position
*/
class MyStreetLamp extends CGFobject {
    constructor(scene,x,z) {
        super(scene);
        this.lamp = new MyFlashlight(scene);
        this.pole = new MyCylinder(scene, 25, 25,false,false);
        this.x=x;
        this.z = z;

    };

    display() {
        const hight = 3.5;
        this.scene.pushMatrix();
        this.scene.translate(this.x, 0,this.z);
        this.scene.scale(0.1,hight,0.1);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.toplight.apply();
        this.pole.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.x, hight, this.z);
        this.lamp.display();
        this.scene.popMatrix();

    }


}
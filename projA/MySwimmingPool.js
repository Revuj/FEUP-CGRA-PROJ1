/** 
* MySwimmingPool- used to simulate a specular (water) and a diffuse (wooden floor) phenomenon
* @constructor
* @param scene Reference to MyScene object
* @param x coordenate x of the center of the pool
* @param z coodenate y of the center of the pool
* @param length - lenght of the pool
* @param width - width of the pool
*/
class MySwimmingPool extends CGFobject { // center of the pool as the reference
    constructor(scene,x,z, length, width) {
        super(scene);
        this.pool = new MyQuad(scene);
        this.cube = new MyUnitCubeQuad(scene);
        this.floor = new MyQuad(scene);

        this.x=x;
        this.z = z;
        this.length = length;
        this.width = width;
    };

    displayFloor() {
        this.scene.pushMatrix();
        const extraDeviation = 0.001;
        let xscale = 2*this.width;
        this.scene.translate(1,extraDeviation,1);
        this.scene.scale(xscale,1, 20);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        
        let newCoords = [0, 10, 10, 10, 0, 0, 10, 0];
        this.floor.updateTexCoords(newCoords);
        this.scene.woodPool.apply();
        this.floor.display();

        this.scene.popMatrix();
    }
    display() {
       
        const extra_scale = 1.1; 
        const scale = (this.length+this.width)/10;

        this.displayFloor();

        this.scene.pool.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.x, 0,this.z-this.length/2);
        this.scene.scale(this.width*extra_scale,scale/16,scale);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.x, 0, this.z+this.length/2);
        this.scene.scale(this.width*extra_scale, scale/16, scale);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.x-this.width/2, 0, this.z);
        this.scene.scale(scale, scale/16, this.length*extra_scale);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.x+this.width/2, 0, this.z);
        this.scene.scale(scale, scale/16, this.length*extra_scale);
        this.scene.translate(0, 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        const extraDeviation = 0.1; // the water must be always visible
        this.scene.pushMatrix();
        this.scene.translate(this.x, extraDeviation, this.z);
        this.scene.scale(this.width, 1, this.length);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.water.apply();
        
        this.pool.display();
        this.scene.popMatrix();
    }

}
/**
 * MyCubeMap 
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);

        this.side = new MyQuadMap(scene);
        this.top = new MyQuadMap(scene);
        this.bottom = new MyQuadMap(scene);
    }

    updateBuffers() {

    }

    display() {
        this.scene.pushMatrix();

        const pi = Math.PI;
        this.scene.scale(70, 50, 70);
        this.scene.translate(0, 0.5, 0);
        this.scene.pushMatrix();
        this.scene.rotate(pi / 2, 0, 1, 0);
        this.scene.rotate(-pi / 2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        if (this.scene.selectedEnvironment == 0)
            this.scene.hillsUP.apply();
        else
            this.scene.hillsUPNight.apply();


        this.top.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.rotate(pi / 2, 0, 1, 0);
        this.scene.rotate(pi / 2, 1, 0, 0);
        this.scene.translate(0, -0.001, 0.5);
        let newCoords = [0, 0, 20.0, 0, 0, 20.0, 20.0, 20.0];
        this.bottom.updateTexCoords(newCoords);


        if (this.scene.selectedEnvironment == 0)
            this.scene.hillsDN.apply();
        else
            this.scene.hillsDNNight.apply();

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);


        this.bottom.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.rotate(pi / 2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);

        if (this.scene.selectedEnvironment == 0)
            this.scene.hillsRT.apply();
        else
            this.scene.hillsRTNight.apply();



        this.side.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.rotate(pi, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);

        if (this.scene.selectedEnvironment == 0)
            this.scene.hillsFT.apply();
        else
            this.scene.hillsFTNight.apply();


        this.side.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.rotate(3 * pi / 2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);

        if (this.scene.selectedEnvironment == 0)
            this.scene.hillsLF.apply();
        else
            this.scene.hillsLFNight.apply();


        this.side.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0, 0.5);

        if (this.scene.selectedEnvironment == 0)
            this.scene.hillsBK.apply();
        else
            this.scene.hillsBKNight.apply();


        this.side.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}

/**
* MyCone
* @constructor
* @param scene Reference to MyScene object
* @param slices Number of sides
* @param stacks Number of normals throughout the edges
* @param visible - Flag to manipulate the base visibility of the cone (default is false)
*/
class MyCone extends CGFobject {
    constructor(scene, slices, stacks, visible) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;

        if (visible == undefined) {
            this.base = false;
        }
        else {
            this.base = visible;
        }
        this.initBuffers();
    }

    addBase() {
        this.vertices.push(0, 0, 0);
        this.texCoords.push(0.5, 0.5);
        this.normals.push(0, 0, -1);

        for(var i = 0; i <= this.slices; i++) {
            this.indices.push((i + 1) % this.slices, i, this.slices + 1);
        }
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
 
        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){

            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.indices.push(i, (i+1) % this.slices, this.slices);
            this.texCoords.push(Math.cos(ang), -Math.sin(ang));
            this.normals.push(Math.cos(ang), Math.cos(Math.PI/4.0), -Math.sin(ang));
            ang+=alphaAng;
        }
        this.vertices.push(0,1,0);
        this.texCoords.push(0,0,0);
        this.normals.push(0,1,0);

        if(this.base) {
            this.addBase();
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}



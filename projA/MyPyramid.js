/**
* MyPyramid
* @constructor
* @param scene Reference to MyScene object
* @param slices Number of sides
* @param stacks Number of normals throughout the edges
* @param visible - Flag to manipulate the base visibility of the pyramid (default is false) 
*/
class MyPyramid extends CGFobject {
    constructor(scene, slices, stacks, visibleBase) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        if (visibleBase == undefined) {
            this.base = false;
        } else {
            this.base = visibleBase;
        }
        this.initBuffers();
    }
    addBase(ang, alphaAng) {
        for (var i = 0; i < this.slices; i++) {
            var sa = Math.sin(ang);
            var ca = Math.cos(ang);

            this.vertices.push(ca, 0, -sa);
            this.texCoords.push(i % 2, 1);
            this.normals.push(0, -1, 0);

            ang += alphaAng;
        }

        this.vertices.push(0, 0, 0);
        this.texCoords.push(0.5, 0);
        this.normals.push(0, -1, 0);


        let index = this.slices * 3 + this.slices;

        for (var i = 1; i <= this.slices + 1; i++) {
            this.indices.push(index, index - i, index - i - 1);
        }
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        for (var i = 0; i < this.slices; i++) {
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa = Math.sin(ang);
            var saa = Math.sin(ang + alphaAng);
            var ca = Math.cos(ang);
            var caa = Math.cos(ang + alphaAng);

            this.vertices.push(0, 1, 0);
            this.texCoords.push(0.5, 0);
            this.vertices.push(ca, 0, -sa);
            this.texCoords.push(0, 1);
            this.vertices.push(caa, 0, -saa);
            this.texCoords.push(1, 1);

            // triangle normal computed by cross product of two edges
            var normal = [
                saa - sa,
                ca * saa - sa * caa,
                caa - ca
            ];

            // normalization
            var nsize = Math.sqrt(
                normal[0] * normal[0] +
                normal[1] * normal[1] +
                normal[2] * normal[2]
            );
            normal[0] /= nsize;
            normal[1] /= nsize;
            normal[2] /= nsize;

            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3 * i, (3 * i + 1), (3 * i + 2));

            ang += alphaAng;
        }

        //base
        if (this.base) {
            this.addBase(ang, alphaAng);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}



/**
* MyPrism
* @constructor
* @param scene - Reference to MyScene object
* @param slices Number of sides
* @param stacks Number of normals throughout the edges
* @param visibleBase - Flag to manipulate the base visibility of the prism (default is false)
* @param visibleTop - Flag to manipulate the higher base visibility of the prism (default is false)
*/
class MyPrism extends CGFobject {
  constructor(scene, slices, stacks, visibleBase, visibleTop) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    if (visibleBase == undefined) {
      this.base = false;
    } else {
      this.base = visibleBase;
    }
    if (visibleTop == undefined) {
      this.top= false;
    } else {
      this.top = visibleTop;
    }
    this.initBuffers();
  }
  addBaseCoords() {
    this.vertices.push(0, 0, 0);
    this.texCoords.push(0.5, 0.5);
    this.normals.push(0, 0 ,-1);
  }

  addTopCoords() {
    this.vertices.push(0, 0, 1);  
    this.texCoords.push(0.5, 0.5);
    this.normals.push(0, 0 , 1);
  }

  drawBase() {
    for (let i = 1; i < this.slices * 2; i++) {
      this.indices.push(i + 1, i, 0);
    }
  }

  drawTop(lastVertex) {
     for (let i = 1; i < this.slices * 2; i++) {
       this.indices.push(lastVertex + this.slices * 2 - i, lastVertex + this.slices * 2 + 1 - i, lastVertex + this.slices * 2 + 1);
    }
  }

  addIndices(start,end ) {
    for ( let i = start ; i < end; i += 2) {
      this.indices.push(i, i + 1, i + 1 + this.slices * 2);
      this.indices.push(i, i + 1 + this.slices * 2, i + this.slices * 2);
    }
  }
  
  initBuffers() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    let ang = 2 * Math.PI / this.slices;
    let stack = 1 / this.stacks;

    if (this.base || this.top) { 
      this.addBaseCoords();
    }

    for (let k = 0; k <= this.stacks; k++) {
      for (let i = 0; i < this.slices; i++) {

        this.vertices.push(Math.cos(ang * i), Math.sin(ang * i), k * stack);
        this.vertices.push(Math.cos((i + 1) * ang), Math.sin((i + 1) * ang), k * stack);

        this.normals.push(Math.cos(ang * i + ang / 2), Math.sin(ang * i + ang / 2), 0);
        this.normals.push(Math.cos(ang * i + ang / 2), Math.sin(ang * i + ang / 2), 0);

        this.texCoords.push(
          0, k * 1 / this.stacks,
          1, k * 1 / this.stacks,
        );
      }
    }

    if (this.top) {
      this.addTopCoords();
    }

    var lastVertex = 2 * this.slices * this.stacks;

    if (this.base && !this.top) {
      this.drawBase();
      this.addIndices(1, lastVertex);
    } 
    else if (!this.base && this.top) {
      this.drawTop(lastVertex);
      this.addIndices(1, lastVertex);
    }
    else if (this.base && this.top) {
      this.drawBase();
      this.drawTop(lastVertex);
      this.addIndices(1, lastVertex + 1);
    }
    else {
      this.addIndices(0, lastVertex);
    }
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  };
};


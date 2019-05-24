/**
 * MyTree
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices Number of sides
 * @param stacks Number of normals throughout the edges
 * @param trunkHeight -trunk height
 * @param trunkRadius -trunk radius
 * @param treeTopHeight - tree top height
 * @param treeTopRadius -tree top radius
 * @param trunkTexture - texture of the trunk
 * @param treepTopTexture - texture of the tree top
 */


 class MyTree extends CGFobject {

    constructor (scene, slides, stack, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, treeTopTexture) {
        super(scene);
        this.cone = new MyCone(this.scene,slides,stack, true);
        this.trunk = new MyCylinder(this.scene,slides,stack);
        this.trunkRadius = trunkRadius;
        this.trunkHeight = trunkHeight;
        this.treeTopHeight = treeTopHeight;
        this.treeTopRadius = treeTopRadius;
        this.trunkTexture= trunkTexture;
        this.treeTopTexture= treeTopTexture;

    };

    display() {

        const pi = Math.PI;

        this.scene.pushMatrix();
        this.scene.translate(0,this.trunkHeight,0);
        this.scene.scale(this.treeTopRadius, this.treeTopHeight, this.treeTopRadius);
        this.treeTopTexture.apply();
        this.cone.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0, this.trunkHeight, 0);
        this.scene.scale(this.trunkRadius,this.trunkHeight , this.trunkRadius);
        this.scene.rotate(pi/2 ,1,0,0);
        this.trunkTexture.apply();
        this.trunk.display();
        this.scene.popMatrix();
    };
 }
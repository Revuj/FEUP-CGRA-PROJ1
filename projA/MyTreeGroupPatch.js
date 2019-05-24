/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene - Reference to MyScene object
 * @param trunkTexture - texture of the trunk
 * @param treepTopTexture - texture of the tree top
 */

class MyTreeGroupPatch extends CGFobject {
    constructor(scene,  trunkTexture, treeTopTexture) {
        super(scene);

        this.trunkHeight = [];
        for (let i = 0; i < 9; i++) {
            this.trunkHeight.push((Math.random() * (1.500 - 2.500) + 2.500).toFixed(4));
        }

        this.trunkRadius = [];
        for (let i = 0; i < 9; i++) {
            this.trunkRadius.push((Math.random() * (0.300 - 0.500) + 0.500).toFixed(4));          
        }

        this.treeTopHeight = [];
        for (let i = 0; i < 9; i++) {
            this.treeTopHeight.push((Math.random() * (1.500 - 2.500) + 2.500).toFixed(4));         
        }

        this.treeTopRadius = [];
        for (let i = 0; i < 9; i++) {
            this.treeTopRadius.push((Math.random() * (0.700 - 1.000) + 1.200).toFixed(4));                                  
        }

        this.displacementsOnX = [];
        for(let i = 0; i < 9; i++) {
            this.displacementsOnX.push(Math.floor(Math.random() * 2)).toFixed(4);
        }

        this.displacementsOnZ = [];
        for(let j = 0; j < 9; j++) {
            this.displacementsOnZ.push(Math.floor(Math.random() * 2)).toFixed(4);
        }

        this.trees = [];
        for (let i = 0; i < 9; i++) {
            this.trees.push(new MyTree(scene, 100, 100, this.trunkHeight[i], this.trunkRadius[i], this.treeTopHeight[i], this.treeTopRadius[i], trunkTexture, treeTopTexture));
        }

    };
    display() {
        const side = 3;

        let counter = 0;

        for(let i = 0; i< side; i++)
            for(let j = 0; j<  side; j++) {
                this.scene.pushMatrix();
                this.scene.translate(4*i + this.displacementsOnX[counter] ,0, 4*j + this.displacementsOnZ[counter]);
                this.trees[counter].display();
                this.scene.popMatrix();
                counter++;
            }
    };
}

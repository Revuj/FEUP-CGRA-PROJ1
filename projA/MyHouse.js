/**
 * MyHouse
 * @constructor
 * @param scene - Reference to MyScene object
 * @param mansion - if flag is set house is a mansion
 */

class MyHouse extends CGFobject {
    constructor(scene, mansion) {
        super(scene);
        this.cube = new MyUnitCubeQuad(scene);
        this.quad = new MyQuad(scene);
        this.pyramid = new MyPyramid(scene, 4, 1,true);
        this.prism = new MyPrism(scene, 8, 1);
        this.pyramidRoof = new MyPyramid(scene, 8, 1, true);
        this.prismRoof = new MyPrism(scene, 3, 1, true,true);
        this.roofWidth = 5;
        this.roofLength = 5;
        this.houseWidth = 4.5;
        this.houseLength = 5;
        this.houseHeight = 2.5;
        this.mansion=mansion;

    };

    displayPrismalHouse() {
        const distance = 1.4;
        this.scene.pushMatrix();
        this.scene.translate(this.houseWidth + distance, 0, 0);
        this.scene.scale(this.houseLength, this.houseHeight, this.houseLength);
        this.scene.rotate(Math.PI / 8, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.brickwall.apply();
        this.prism.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.houseWidth + distance, this.houseHeight, 0);
        this.scene.scale(this.houseLength, this.houseHeight / 1.3, this.houseLength * 1.3);
        this.scene.rotate(Math.PI / 8, 0, 1, 0);
        this.scene.roofTop.apply();
        this.pyramidRoof.display();
        this.scene.popMatrix();
    }

    displayDoor() {
        const extraDeviation = 0.001; // the door must be a bit outside
        this.scene.pushMatrix()
        this.scene.scale(1.5, 3, 1);
        this.scene.translate(0, 0.5, this.houseLength / 2 + extraDeviation);
        this.scene.door.apply();
        this.quad.display();
        this.scene.popMatrix();
    }

    displayWindows() {
        const extraDeviation = 0.001; // the windows must be a bit outside
        let ang = 0;
        const HALF_PI = Math.PI / 2;

        //display four windows
        for(let nrWindow = 0; nrWindow < 4; nrWindow++) {
            this.scene.pushMatrix();
            this.scene.rotate(ang,0,1,0);
            this.scene.translate(0, 4.2, this.houseLength / 2 + extraDeviation);
            this.scene.scale(2,2,1);
            this.scene.window.apply();
            this.quad.display();
            this.scene.popMatrix();
            ang+=HALF_PI;
        }
    }

    displayRoof() {
        this.scene.pushMatrix();
        this.scene.translate(0, this.houseHeight * 2 + 0.3, 0);
        this.scene.scale(this.houseWidth, this.houseHeight, this.houseLength);
        this.scene.translate(0, 0.1, 0);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.scene.roofTop.apply();
        this.pyramid.display();
        this.scene.popMatrix();
    }

    displayColumns() {
        this.scene.column.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.roofWidth / 2 + 0.3, 0, this.roofLength / 2 + 0.3);
        this.scene.scale(0.3, this.houseHeight * 2 + 0.6, 0.3);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);

        if (!this.mansion) {
            this.prism.display();
        }

        this.scene.translate(-this.houseLength * 3.7, 0, 0);
        this.prism.display();
        this.scene.translate(0, this.houseLength * 3.7, 0);
        this.prism.display();

        this.scene.translate(this.houseLength * 3.7, 0, 0);

        if (!this.mansion) {
             this.prism.display();
        }

        this.scene.popMatrix();
    }

    displaychimney() {
        this.scene.pushMatrix();
        this.scene.translate(1, this.houseHeight * 2 + 2.5, 0);
        this.scene.scale(0.5, 1, 0.5);
        this.scene.brickwall.apply();
        this.cube.display();
        this.scene.popMatrix();
    }


    displaySquaredHouse() {
        this.scene.pushMatrix();
        this.scene.scale(this.houseWidth, this.houseHeight, this.houseLength);
        this.scene.translate(0, 0.5, 0);
        this.scene.brickwall.apply();
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, this.houseHeight, 0);
        this.scene.scale(this.houseWidth, this.houseHeight * 1.6, this.houseLength);
        this.scene.translate(0, 0.5, 0);
        this.scene.whitewall.apply();
        this.cube.display();
        this.scene.popMatrix();

        this.displayDoor();
        this.displayWindows();
        this.displayRoof();
        this.displayColumns();
        this.displaychimney();
 
    }

    displayWoodenFloor() {
        this.scene.pushMatrix();
        this.scene.translate(this.houseLength * 2.6 + 1, this.houseHeight * 1.5 - 0.1, 1);
        this.scene.scale(7, 0.1, 6);
        this.scene.translate(0, 0.5, 0);
        this.scene.woodenFloor.apply();
        this.cube.display();
        this.scene.popMatrix();
    }

    displayRailing() {

         // front railing
         this.scene.pushMatrix();
         this.scene.translate(this.houseLength * 2.6 + 1, this.houseHeight * 1.5 + 0.25, +4);
         this.scene.scale(7, 0.7, 0.1);
         this.scene.balcony.apply();
         this.cube.display();
         this.scene.popMatrix();

         // side railing
        this.scene.pushMatrix();
        this.scene.translate(this.houseLength * 2.1 + 0.05, this.houseHeight * 1.5 + 0.25, 1);
        this.scene.scale(0.1, 0.7, 6);
        this.scene.balcony.apply();
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.houseLength * 2.1 + 0.05 + 6.9, this.houseHeight * 1.5 + 0.25, 1);
        this.scene.scale(0.1, 0.7, 6);
        this.scene.balcony.apply();
        this.cube.display();
        this.scene.popMatrix();
    }

    displayBalconyColumns() { 
         const ang = -Math.PI/2;
         const translations = [this.houseLength * 2.1 + 0.3, 0, 3.5,  
                         this.houseLength * 2.1 + 0.5 + 6, 0, 3.5,
                         this.houseLength * 2.1 + 0.3 + 6, 0, -1.7,
                         this.houseLength * 2.1 + 0.3, 0, -1.7
                        ];

         for(let col = 0; col < 4 ; col ++) {
             this.scene.pushMatrix();
             this.scene.translate(translations[3*col], translations[3*col+1], translations[3*col+2]);
             this.scene.scale(0.3, this.houseHeight * 1.5 * 1.4, 0.3);
             this.scene.rotate(ang,1,0,0);
             this.scene.column.apply();
             this.prism.display();
             this.scene.popMatrix();
         }
    }

    displayRoofPrism() { 
        this.scene.pushMatrix();
        this.scene.translate(this.houseLength * 2.1 + 3.5, 5.7, -1.7);
        this.scene.scale(4, 1, 5.5);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.tatchedRoofTop.apply();
        this.prismRoof.display();
        this.scene.popMatrix();
    }


    displayLadder() {

        // vertical bar
        this.scene.pushMatrix();
        this.scene.translate(this.houseLength * 2.1 + 3, 0, -1.7);
        this.scene.scale(0.05, this.houseHeight * 1.5, 0.05);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.prism.display();
        this.scene.popMatrix();

        //another vertical bar
        this.scene.pushMatrix();
        this.scene.translate(this.houseLength * 2.1 + 4, 0, -1.7);
        this.scene.scale(0.05, this.houseHeight * 1.5, 0.05);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.prism.display();
        this.scene.popMatrix();

        //horizontal bars for steps
        for (let i = 0; i < 7; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.houseLength * 2.1 + 4, 0.5 + i * 0.5, -1.7);
            this.scene.scale(1, 0.05, 0.05);
            this.scene.rotate(-Math.PI / 2, 0, 1, 0);
            this.prism.display();
            this.scene.popMatrix();
        }
    }

    displayBalcony() {
        this.displayWoodenFloor();
        this.displayRailing();
        this.displayBalconyColumns();
        this.displayRoofPrism();
        this.displayLadder();
    }

    display() {
        
        if (this.mansion) {
            this.displayPrismalHouse();
            this.displayBalcony();
        }

        this.displaySquaredHouse();


    };
}
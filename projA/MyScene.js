/** 
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.initializeTextures();
        this.initializeObjects();
        this.enableTextures(true);
    }

    initializeTextures() {
        this.initializePoolTextures();
        this.initializeTreeTextures();
        this.initializeVoxeHillTextures();
        this.initializeDayCubeMapTextures();
        this.initializeNightCubeMapTextures();
        this.initializeHouseTextures();
        this.initializeFlashLightTextures();
    }

    initializeObjects() {
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.texturesEnabled = true;
        this.lampsOn = false;
        this.ambientLight = 1;
        this.displayAxis = true;


        let stack = 100;
        this.groupPatch = new MyTreeGroupPatch(this, this.trunk, this.treetop);
        this.rowPatch = new MyTreeRowPatch(this, this.trunk, this.treetop);
        this.house = new MyHouse(this,true);
        this.smallHouse = new MyHouse(this,false);
        this.hill = new MyVoxelHill(this, 8);
        this.image = new MyCubeMap(this);
        this.pyramid = new MyPyramid(this, 10, stack);
        this.swimmingPool = new MySwimmingPool(this, 1, 1, 12, 8);
        this.streetLight = new MyStreetLamp(this, 1, 1);

        this.axis = new CGFaxis(this);
        this.selectedEnvironment = 0;
        this.environmentIDs = { 'Day': 0, 'Night': 1 };
    }


    initializePoolTextures() {
        this.water = new CGFappearance(this);
        this.water.setAmbient(0.9, 0.95, 1, 1);
        this.water.setDiffuse(0.6, 0.6, 0.7, 1);
        this.water.setSpecular(0.9, 0.95, 1, 1);
        this.water.setShininess(200.0);
        this.water.loadTexture('images/water.jpg');
        this.water.setTextureWrap('REPEAT', 'REPEAT');

        this.pool = new CGFappearance(this);
        this.pool.setAmbient(0.9, 0.95, 1, 1);
        this.pool.setDiffuse(0.4, 0.4, 0.5, 1);
        this.pool.setSpecular(0.9, 0.95, 1, 1);
        this.pool.setShininess(10.0);
        this.pool.loadTexture('images/poolfloor.jpg');
        this.pool.setTextureWrap('REPEAT', 'REPEAT');

        this.woodPool = new CGFappearance(this);
        this.woodPool.setAmbient(0.85, 0.8, 0.55, 1);
        this.woodPool.setDiffuse(0.85, 0.8, 0.55, 1);
        this.woodPool.setSpecular(0.01, 0.01, 0.01, 1);
        this.woodPool.setShininess(1.0);
        this.woodPool.loadTexture('images/woodPool2.jpg');
        this.woodPool.setTextureWrap('REPEAT', 'REPEAT');
    }

    initializeTreeTextures() {
        this.trunk = new CGFappearance(this);
        this.trunk.setAmbient(0.85, 0.8, 0.55, 1);
        this.trunk.setDiffuse(0.85, 0.8, 0.55, 1);
        this.trunk.setSpecular(0.01, 0.01, 0.01, 1);
        this.trunk.setShininess(1.0);
        this.trunk.loadTexture('images/trunk.jpg');
        this.trunk.setTextureWrap('REPEAT', 'REPEAT');

        this.treetop = new CGFappearance(this);
        this.treetop.setAmbient(0.55, 0.95, 0.55, 1);
        this.treetop.setDiffuse(0.55, 0.95, 0.55, 1);
        this.treetop.setSpecular(0.01, 0.01, 0.01, 1);
        this.treetop.setShininess(1.0);
        this.treetop.loadTexture('images/treetop.jpg');
        this.treetop.setTextureWrap('REPEAT', 'REPEAT');
    }

    initializeVoxeHillTextures() {
        this.side = new CGFappearance(this);
        this.side.setAmbient(0.85, 0.8, 0.55, 1);
        this.side.setDiffuse(0.85, 0.8, 0.55, 1);
        this.side.setSpecular(0.01, 0.01, 0.01, 1);
        this.side.setShininess(1.0);
        this.side.loadTexture('images/mineSide.png');
        this.side.setTextureWrap('REPEAT', 'REPEAT');

        this.top = new CGFappearance(this);
        this.top.setAmbient(0.55, 0.95, 0.55, 1);
        this.top.setDiffuse(0.55, 0.95, 0.55, 1);
        this.top.setSpecular(0.01, 0.01, 0.01, 1);
        this.top.setShininess(1.0);
        this.top.loadTexture('images/mineTop.png');
        this.top.setTextureWrap('REPEAT', 'REPEAT');

        this.bottom = new CGFappearance(this);
        this.bottom.setAmbient(0.85, 0.8, 0.55, 1);
        this.bottom.setDiffuse(0.85, 0.8, 0.55, 1);
        this.bottom.setSpecular(0.01, 0.01, 0.01, 1);
        this.bottom.setShininess(1.0);
        this.bottom.loadTexture('images/mineBottom.png');
        this.bottom.setTextureWrap('REPEAT', 'REPEAT');
    }

    initializeDayCubeMapTextures() {
        this.hillsBK = new CGFappearance(this);
        this.hillsBK.setAmbient(1, 1, 1, 1);
        this.hillsBK.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsBK.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsBK.setShininess(10.0);
        this.hillsBK.loadTexture('images/sor_hills/hills_bk_day.JPG');
        this.hillsBK.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsDN = new CGFappearance(this);
        this.hillsDN.setAmbient(1, 1, 1, 1);
        this.hillsDN.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsDN.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsDN.setShininess(10.0);
        this.hillsDN.loadTexture('images/mineTop.png');
        this.hillsDN.setTextureWrap('REPEAT', 'REPEAT');

        this.hillsLF = new CGFappearance(this);
        this.hillsLF.setAmbient(1, 1, 1, 1);
        this.hillsLF.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsLF.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsLF.setShininess(10.0);
        this.hillsLF.loadTexture('images/sor_hills/hills_lf_day.JPG');
        this.hillsLF.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsRT = new CGFappearance(this);
        this.hillsRT.setAmbient(1, 1, 1, 1);
        this.hillsRT.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsRT.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsRT.setShininess(10.0);
        this.hillsRT.loadTexture('images/sor_hills/hills_rt_day.JPG');
        this.hillsRT.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsFT = new CGFappearance(this);
        this.hillsFT.setAmbient(1, 1, 1, 1);
        this.hillsFT.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsFT.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsFT.setShininess(10.0);
        this.hillsFT.loadTexture('images/sor_hills/hills_ft_day.JPG');
        this.hillsFT.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsUP = new CGFappearance(this);
        this.hillsUP.setAmbient(1, 1, 1, 1);
        this.hillsUP.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsUP.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsUP.setShininess(10.0);
        this.hillsUP.loadTexture('images/sor_hills/hills_up_day.JPG');
        this.hillsUP.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    initializeNightCubeMapTextures() {
        this.hillsBKNight = new CGFappearance(this);
        this.hillsBKNight.setAmbient(0.5, 0.5, 0.5, 1);
        this.hillsBKNight.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsBKNight.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsBKNight.setShininess(10.0);
        this.hillsBKNight.loadTexture('images/sor_hills/hills_bk.JPG');
        this.hillsBKNight.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsDNNight = new CGFappearance(this);
        this.hillsDNNight.setAmbient(0.5, 0.5, 0.5, 1);
        this.hillsDNNight.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsDNNight.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsDNNight.setShininess(10.0);
        this.hillsDNNight.loadTexture('images/mineTop.png');
        this.hillsDNNight.setTextureWrap('REPEAT', 'REPEAT');

        this.hillsLFNight = new CGFappearance(this);
        this.hillsLFNight.setAmbient(0.5, 0.5, 0.5, 1);
        this.hillsLFNight.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsLFNight.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsLFNight.setShininess(10.0);
        this.hillsLFNight.loadTexture('images/sor_hills/hills_lf.JPG');
        this.hillsLFNight.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsRTNight = new CGFappearance(this);
        this.hillsRTNight.setAmbient(0.5, 0.5, 0.5, 1);
        this.hillsRTNight.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsRTNight.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsRTNight.setShininess(10.0);
        this.hillsRTNight.loadTexture('images/sor_hills/hills_rt.JPG');
        this.hillsRTNight.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsFTNight = new CGFappearance(this);
        this.hillsFTNight.setAmbient(0.5, 0.5, 0.5, 1);
        this.hillsFTNight.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsFTNight.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsFTNight.setShininess(10.0);
        this.hillsFTNight.loadTexture('images/sor_hills/hills_ft.JPG');
        this.hillsFTNight.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsUPNight = new CGFappearance(this);
        this.hillsUPNight.setAmbient(0.5, 0.5, 0.5, 1);
        this.hillsUPNight.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsUPNight.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsUPNight.setShininess(10.0);
        this.hillsUPNight.loadTexture('images/sor_hills/hills_up.JPG');
        this.hillsUPNight.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }


    initializeHouseTextures() {
        this.roofTop = new CGFappearance(this);
        this.roofTop.setAmbient(0.3, 0.3, 0.3, 1);
        this.roofTop.setDiffuse(0.5, 0.5, 0.5, 1);
        this.roofTop.setSpecular(0.01, 0.01, 0.01, 1);
        this.roofTop.setShininess(1.0);
        this.roofTop.loadTexture('images/rooftop1.jpg');
        this.roofTop.setTextureWrap('REPEAT', 'REPEAT');

        this.column = new CGFappearance(this);
        this.column.setAmbient(0.3, 0.3, 0.3, 1);
        this.column.setDiffuse(0.5, 0.5, 0.5, 1);
        this.column.setSpecular(0.1, 0.1, 0.1, 1);
        this.column.setShininess(1.0);
        this.column.loadTexture('images/column.jpg');
        this.column.setTextureWrap('REPEAT', 'REPEAT');

        this.tatchedRoofTop = new CGFappearance(this);
        this.tatchedRoofTop.setAmbient(0.7, 0.65, 0.25, 1);
        this.tatchedRoofTop.setDiffuse(0.9, 0.85, 0.45, 1);
        this.tatchedRoofTop.setSpecular(0.01, 0.01, 0.01, 1);
        this.tatchedRoofTop.setShininess(1.0);
        this.tatchedRoofTop.loadTexture('images/tatchedroof.jpg');
        this.tatchedRoofTop.setTextureWrap('REPEAT', 'REPEAT');

        this.woodenFloor = new CGFappearance(this);
        this.woodenFloor.setAmbient(0.4, 0.05, 0.005, 1);
        this.woodenFloor.setDiffuse(0.6, 0.25, 0.05, 1);
        this.woodenFloor.setSpecular(0.01, 0.01, 0.01, 1);
        this.woodenFloor.setShininess(1.0);
        this.woodenFloor.loadTexture('images/woodenfloor.jpg');
        this.woodenFloor.setTextureWrap('REPEAT', 'REPEAT');

        this.balcony = new CGFappearance(this);
        this.balcony.setAmbient(0.4, 0.05, 0.005, 1);
        this.balcony.setDiffuse(0.6, .25, 0.05, 1);
        this.balcony.setSpecular(0.01, 0.01, 0.01, 1);
        this.balcony.setShininess(1.0);
        this.balcony.loadTexture('images/balcony.jpg');
        this.balcony.setTextureWrap('REPEAT', 'REPEAT');

        this.brickwall = new CGFappearance(this);
        this.brickwall.setAmbient(0.8, 0.8, 0.4, 1);
        this.brickwall.setDiffuse(0.9, 0.9, 0.9, 1);
        this.brickwall.setSpecular(0.01, 0.01, 0.01, 1);
        this.brickwall.setShininess(1.0);
        this.brickwall.loadTexture('images/wall2.jpg');
        this.brickwall.setTextureWrap('REPEAT', 'REPEAT');

        this.whitewall = new CGFappearance(this);
        this.whitewall.setAmbient(0.7, 0.7, 0.7, 1);
        this.whitewall.setDiffuse(0.9, 0.9, 0.9, 1);
        this.whitewall.setSpecular(0.01, 0.01, 0.01, 1);
        this.whitewall.setShininess(1.0);
        this.whitewall.loadTexture('images/whitewall.jpg');
        this.whitewall.setTextureWrap('REPEAT', 'REPEAT');

        this.door = new CGFappearance(this);
        this.door.setAmbient(0.55, 0.65, 0.65, 1);
        this.door.setDiffuse(0.2, 0.7, 0.45, 1);
        this.door.setSpecular(0.01, 0.01, 0.01, 1);
        this.door.setShininess(1.0);
        this.door.loadTexture('images/door2.jpg');
        this.door.setTextureWrap('REPEAT', 'REPEAT');

        this.window = new CGFappearance(this);
        this.window.setAmbient(0.7, 0.75, 0.8, 1);
        this.window.setDiffuse(0.9, 0.95, 1, 1);
        this.window.setSpecular(0.01, 0.01, 0.01, 1);
        this.window.setShininess(1.0);
        this.window.loadTexture('images/window.jpg');
        this.window.setTextureWrap('REPEAT', 'REPEAT');
    }

    initializeFlashLightTextures() {
        this.sidelight = new CGFappearance(this);
        this.sidelight.setAmbient(0.7, 0.7, 0.7, 1);
        this.sidelight.setDiffuse(0.9, 0.9, 0.9, 1);
        this.sidelight.setSpecular(0.4, 0.4, 0.4, 1);
        this.sidelight.setShininess(1.0);
        this.sidelight.loadTexture('images/sideFlash.jpg');
        this.sidelight.setTextureWrap('REPEAT', 'REPEAT');

        this.toplight = new CGFappearance(this);
        this.toplight.setAmbient(0.7, 0.7, 0.7, 1);
        this.toplight.setDiffuse(0.9, 0.9, 0.9, 1);
        this.toplight.setSpecular(0.4, 0.4, 0.4, 1);
        this.toplight.setShininess(1.0);
        this.toplight.loadTexture('images/topflashlight.jpg');
        this.toplight.setTextureWrap('REPEAT', 'REPEAT');
    }

    updateTextures() {
        if (this.texturesEnabled)
            this.enableTextures(true);
        else
            this.enableTextures(false);
    }


    initLampLights() {
        this.nrLamps = 4;

        let lampHight = 3.5;
        this.lightsPos = [-8, lampHight, 12, // first lamp
            10, lampHight, 12, //second lamp
            10, lampHight, 26, // third lamp
        -8, lampHight, 26]; // forth lamp

        for (let i = 0; i < this.nrLamps; i++) {
            this.lights[i + 2].setPosition(this.lightsPos[i * 3], this.lightsPos[i * 3 + 1], this.lightsPos[i * 3 + 2], 1);
            this.lights[i + 2].setDiffuse(1.0, 1.0, 1.0, 1.0);
            this.lights[i + 2].setConstantAttenuation(1);
            this.lights[i + 2].setLinearAttenuation(0.2);
            this.lights[i + 2].setQuadraticAttenuation(0.1);
            this.lights[i + 2].disable();
            this.lights[i + 2].setVisible(false);
            this.lights[i + 2].update();
        }

    }

    initLights() {
        this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

        //luz dia- sol
        this.lights[0].setPosition(0, 100, 0, 1);
        this.lights[0].setAmbient(0.945, 0.855, 0.643, 1.0);
        this.lights[0].setDiffuse(0.945, 0.855, 0.643, 1.0);
        this.lights[0].setSpecular(0.945, 0.855, 0.643, 1.0);
        this.lights[0].setConstantAttenuation(1);
        this.lights[0].setLinearAttenuation(0.01);
        this.lights[0].setQuadraticAttenuation(0.0);
        this.lights[0].enable();
        this.lights[0].setVisible(false);
        this.lights[0].update();
        // luz noite 
        this.lights[1].setPosition(0, 50, 0, 1);
        this.lights[1].setAmbient(0.033, 0.247, 0.450, 1.0);
        this.lights[1].setDiffuse(0.033, 0.247, 0.450, 1.0);
        this.lights[1].setSpecular(0.033, 0.247, 0.450, 1.0);
        this.lights[1].setConstantAttenuation(1);
        this.lights[1].setLinearAttenuation(0.1);
        this.lights[1].setQuadraticAttenuation(0.0);
        this.lights[1].enable();
        this.lights[1].setVisible(false);
        this.lights[1].update();

        this.initLampLights();


    }

    updateLights() {
        if (this.selectedEnvironment == 0) {
            this.lights[1].disable();
            this.lights[0].enable();
        }
        else {
            this.lights[0].disable();
            this.lights[1].enable();
        }
    }

    updateStreeLamps() {
        if (this.lampsOn) {
            for (let i = 2; i < 2 + this.nrLamps; i++) {
                this.lights[i].enable();
            }
        }
        else {
            for (let i = 2; i < 2 + this.nrLamps; i++) {
                this.lights[i].disable();
            }
        }
    }


    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(1, 70, 1), vec3.fromValues(0, 0, 0));
    }

    updateAmbientLight() {
        this.setGlobalAmbientLight(this.ambientLight, this.ambientLight, this.ambientLight, 1.0);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        for (let i = 0; i < 2 + this.nrLamps; i++) {
            this.lights[i].update();
        }
        // ---- BEGIN Primitive drawing section

        this.house.display();
        this.image.display();

         //smaller house
         this.pushMatrix();
         this.translate(-20, 0, 10);
         this.smallHouse.display();
         this.popMatrix();
 

        //montanhas atrás da casa
        this.pushMatrix();
        this.translate(-10, 0, -15);
        this.hill.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(10, 0, -15);
        this.hill.display();
        this.popMatrix();

        //arvores entre as montanhas
        this.pushMatrix();
        this.translate(0, 0, -5);
        this.rotate(Math.PI / 2, 0, 1, 0);
        this.rowPatch.display();
        this.popMatrix();

        //arvores ao lado da casa
        this.pushMatrix();
        this.translate(-15, 0, -5);
        this.groupPatch.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(20, 0, -5);
        this.groupPatch.display();
        this.popMatrix();

        //piscina
        this.pushMatrix();
        this.translate(0, 0, 20);
        this.rotate(Math.PI / 2, 0, 1, 0);
        this.swimmingPool.display();
        this.popMatrix();

        //lampadas à volta da piscina
        this.pushMatrix();
        this.translate(-9, 0, 11);
        this.streetLight.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(9, 0, 11);
        this.streetLight.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-9, 0, 25);
        this.streetLight.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(9, 0, 25);
        this.streetLight.display();
        this.popMatrix();

        //arvores depois da piscina
        this.pushMatrix();
        this.translate(-9, 0, 28);
        this.rowPatch.display();
        this.popMatrix();

        // ---- END Primitive drawing section
    }
}
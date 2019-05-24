/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }
    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        

        //Slider element in GUI        
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'lampsOn').name("Turn On Lamps").onChange(this.scene.updateStreeLamps.bind(this.scene));
        this.gui.add(this.scene, 'texturesEnabled').name("Display textures").onChange(this.scene.updateTextures.bind(this.scene));
        this.gui.add(this.scene, 'selectedEnvironment', this.scene.environmentIDs).name('Selected Environment').onChange(this.scene.updateLights.bind(this.scene));    
                
        return true;
    }
}
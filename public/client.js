const createScene = async () => {
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
    
    // Basic camera
    const camera = new BABYLON.ArcRotateCamera("camera", 0, Math.PI / 3, 10, new BABYLON.Vector3(0, 0.2, 0), scene);
    camera.attachControl(canvas, true);
    
    // Basic lighting
    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    
    // Create materials
    const materials = {
        blouse: new BABYLON.StandardMaterial("blouseMaterial", scene),
        kittle: new BABYLON.StandardMaterial("kittleMaterial", scene),
        bundhose: new BABYLON.StandardMaterial("bundhoseMaterial", scene)
    };
    
    // Set colors
    materials.blouse.diffuseColor = new BABYLON.Color3(0.1, 0.3, 0.8); // Blue
    materials.kittle.diffuseColor = new BABYLON.Color3(0.9, 0.8, 0.1); // Yellow
    materials.bundhose.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0.1); // Red
    
    try {
        // Load models
        const models = {
            shoes: await BABYLON.SceneLoader.ImportMeshAsync("", "/models/", "DA_Arbeitsschuhe.glb", scene),
            blouse: await BABYLON.SceneLoader.ImportMeshAsync("", "/models/", "DA_BB_Damenbluse_3_4A.glb", scene),
            kittle: await BABYLON.SceneLoader.ImportMeshAsync("", "/models/", "DA_DI_Kittel_Revkrg_lgA.glb", scene),
            bundhose: await BABYLON.SceneLoader.ImportMeshAsync("", "/models/", "DA_EUC_Bundhose.glb", scene)
        };

        // Apply materials and position models
        Object.entries(models).forEach(([type, result]) => {
            const rootMesh = result.meshes[0];
            
            // Apply materials
            result.meshes.forEach(mesh => {
                if (materials[type]) {
                    mesh.material = materials[type];
                }
            });

            // Set positions
            switch(type) {
                case 'blouse':
                    rootMesh.position.y = 0.2;
                    break;
                case 'kittle':
                    rootMesh.position.y = 0.2;
                    break;
            }
        });

    } catch (error) {
        console.error("Error loading models:", error);
    }

    return scene;
};

// Start the scene
window.addEventListener('load', () => {
    createScene().then(scene => {
        scene.getEngine().runRenderLoop(() => scene.render());
    });
});

window.addEventListener('resize', () => {
    engine.resize();
});
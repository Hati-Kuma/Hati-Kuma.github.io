//Variables for setup
let container;
let camera;
let renderer;
let scene;
let mesh;
let canvas;
let ranNum;

function init(stl_name) {
    container = document.querySelector(".container");

    //Create scene
    scene = new THREE.Scene();

    //Create camera
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 1; //1
    const far = 10000; //10000

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(10, -10, 200);
    scene.add( camera );

    //Create light
    const ambient = new THREE.AmbientLight(0x7a7a7a, 2);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0x7a7a7a, 2);
    light.position.set(50, 50, 100);
    scene.add(light);

    //Create Material
    var material = new THREE.MeshLambertMaterial({
        overdraw:true,
        color: random_color(),
        shading: THREE.FlatShading
    });
    
    //Create Renderer
    renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true } );
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild( renderer.domElement );

    //Load model
    var loader = new THREE.STLLoader();
    loader.load( stl_name, function ( geometry ) {
        mesh = new THREE.Mesh( geometry, material );
        mesh.rotation.x = 5;
        mesh.rotation.z = .25;
        mesh.position.x = 10;
        mesh.position.y = -10;
        mesh.geometry.center();
        scene.add( mesh );
    });
}

//Choose color
const colors = [0xC51111, 0x132ED1, 0x117F2D, 0xED54BA, 0xEF7D0E, 0xF6F658, 0x3F474E, 0x6B31BC, 0x71491E, 0x38FEDB, 0x50EF39, 0x1D9853]
function random_color() {
    ranNum = Math.floor(Math.random()*12)
    return colors[ranNum]
}

//Save autorun if first time default is true
if(localStorage.getItem("autorun")==null){
    localStorage.setItem("autorun", "true");
}

//Shows the 3D object
function animate(){
    requestAnimationFrame(animate);
    if(mesh){
        if(localStorage.getItem("autorun")=="true"){
            mesh.rotation.z += 0.01; 
        }else{
            document.querySelector(".container").addEventListener("wheel",function(e){
                if(e.deltaY>0){
                    mesh.rotation.z += e.deltaY/100000;
                }else{
                    mesh.rotation.z -= e.deltaY/100000;
                }
            });
        }
    }
    renderer.render(scene, camera);
}

//Resizes the canvas
function onWindowResize() {
    container = document.querySelector(".container");
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  
    renderer.setSize(container.clientWidth, container.clientHeight);
  } 
window.addEventListener("resize", onWindowResize);

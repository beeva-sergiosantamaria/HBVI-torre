
var camera, scene, renderer, mesh, mouse, controls,
	width = window.innerWidth, 
	height = window.innerHeight;

var clock = new THREE.Clock();
var mouse = new THREE.Vector2();
	
init();
animate();

function init() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true, alpha: true } );
	renderer.setSize( width, height );
	renderer.shadowMapEnabled = true;
	renderer.shadowMapType = THREE.PCFSoftShadowMap;
	renderer.setViewport( 0,0,width, height );
	renderer.getMaxAnisotropy();

	var container = document.getElementById('container');
	container.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera( 50, (width/height), 0.1, 10000000 );
	camera.position.set( 1500, 1500, 1500 );

	mouse = new THREE.Vector2();

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;
	controls.target.set( 0,0,0 );

	buildShape();

	var directionalLight = new THREE.SpotLight(0xeeeeee, 1.5);
		directionalLight.position.set(2000, 3500,2500);
		//directionalLight.target.position.set( 0, 0, 0 );
		//directionalLight.shadowCameraVisible = true;
		directionalLight.castShadow = true;
		directionalLight.shadowCameraFar = 10000;
		directionalLight.shadowDarkness = 0.5;
		directionalLight.shadowMapWidth = 2048;
		directionalLight.shadowMapHeight = 2048;
		directionalLight.name = 'luzDireccional'

	scene.add( directionalLight );
	//
	window.addEventListener( 'resize', onWindowResize, false );

}


function buildShape(){
	// COPIA AQUI EL CODIGO DEL OBJETO PARA RENDERIZARLO EN ESCENA
	var DONUTmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var DONUTradius = 100; //radio del anillo
var DONUTtubeWidth = 30;	//ancho del anillo
var DONUTradialSegments = 16;	//segmentos usados para dibujar el anillo
var DONUTtubularSegments = 100;	//segmentos utilizados para dibujar el tubo que forma el anillo
var DONUTarcLength = 6.3;	//grados que abarca el anillo(360, solo 180...)

var DONUTgeometry = new THREE.TorusGeometry(DONUTradius, DONUTtubeWidth, DONUTradialSegments, DONUTtubularSegments, DONUTarcLength );
var donut = new THREE.Mesh( DONUTgeometry, DONUTmaterial );
	donut.castShadow = true;	//emitir sombras
	donut.receiveShadow = true;	//recibir sombras
	donut.position.set(0,0,0);	//position del objeto(x,y,z)
	donut.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	donut.scale.set(1,1,1);		//escala del objeto(x,y,z)
scene.add( donut );

addFloor();
addBodyTower();
addTopTower();
addSky();
addAstroRey();
addGentes();
}

function addTopTower(){
	var CYLINDERmaterial  = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/pisa_02_top.png'),color: 0xFFFFFF, side: THREE.DoubleSide  } );
	//var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var CYLINDERradiusTop = 100; //radio de la parte superios del cilindro
var CYLINDERradiusBottom = 100;	//radio de la parte inferior del cilindro
var CYLINDERheigth = 150;	//altura del cilindro
var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
var CYLINDERopenEnded = false;	//en off el cilindro en hueco
var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
	cylinder.castShadow = true;	//emitir sombras
	cylinder.receiveShadow = true;	//recibir sombras
	cylinder.position.set(0,825,0);	//position del objeto(x,y,z)
	cylinder.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
	return cylinder;
//scene.add( cylinder );
}

function archTexture () {
	// load a texture, set wrap mode to repeat
var texture = THREE.ImageUtils.loadTexture('images/pisa_03_arch_2.png');
/*texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 10, 10 );*/
return texture;
}

function addBodyTower(){
	var CYLINDERmaterial  = new THREE.MeshBasicMaterial( { map: archTexture(),color: 0xFFFFFF, side: THREE.DoubleSide  } );
	//var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );
var i = 0;

var cilinderGroup = new THREE.Object3D();

for (i=0;i<8;i++) {
	var CYLINDERradiusTop = 150; //radio de la parte superios del cilindro
var CYLINDERradiusBottom = 150;	//radio de la parte inferior del cilindro
var CYLINDERheigth = 100;	//altura del cilindro
var CYLINDERradioSegments = 32; //segmentos utilizados para dibujar el cilindro(cuantos mas segmentos mas redondo)
var CYLINDERheigthSegments = 1;	//segmentos necesarios para dibutar la altura del cilindro
var CYLINDERopenEnded = false;	//en off el cilindro en hueco
var circleStartCylinder = 0; //grado desde el que empieza a dibujar la pared del cilindro
var circleCylinder = 6.3; //grados que abarca el cilindro (360, solo 180...)

var CYLINDERgeometry = new THREE.CylinderGeometry( CYLINDERradiusTop, CYLINDERradiusBottom, CYLINDERheigth, CYLINDERradioSegments, CYLINDERheigthSegments, CYLINDERopenEnded, circleStartCylinder, circleCylinder );
var cylinder = new THREE.Mesh( CYLINDERgeometry, CYLINDERmaterial );
	cylinder.castShadow = true;	//emitir sombras
	cylinder.receiveShadow = true;	//recibir sombras
	cylinder.position.set(0,(i*100),0);	//position del objeto(x,y,z)
	cylinder.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	cylinder.scale.set(1,1,1);		//escala del objeto(x,y,z)
	cilinderGroup.add(cylinder);
}
cilinderGroup.add(addTopTower());
cilinderGroup.rotation.set(Math.PI/16,0,0);	//rotacion del objeto(x,y,z)
scene.add( cilinderGroup );


}

function addSky(){
var SKYmaterial  = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/skyHD.jpg'),color: 0xFFFFFF, side: THREE.DoubleSide  } );

	var asphaltTexture = THREE.ImageUtils.loadTexture( "images/asphalt2.jpg" );
		asphaltTexture.wrapS = asphaltTexture.wrapT = THREE.RepeatWrapping; 
		asphaltTexture.repeat.set( 12, 2 );	
	var roadMaterial = new THREE.MeshPhongMaterial( { map: asphaltTexture, color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide } );

	var brickTexture = THREE.ImageUtils.loadTexture( "images/brick.jpg" );
		brickTexture.wrapS = brickTexture.wrapT = THREE.RepeatWrapping; 
		brickTexture.repeat.set( 1, 14 );
	var wallMaterial = new THREE.MeshPhongMaterial( { map: brickTexture, color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide } );

	var grassTexture = THREE.ImageUtils.loadTexture( "images/grassHD.jpg" );
		//grassTexture.minFilter = THREE.LinearFilter;
		grassTexture.wrapS = asphaltTexture.wrapT = THREE.RepeatWrapping; 
		grassTexture.repeat.set( 12, 1 );	
	var grassMaterial = new THREE.MeshLambertMaterial( { map: grassTexture, color: 0x888888, emissive: 0x888888, specular: 0x111111 } );

	var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0xff0033, emissive: 0xff0000, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var metalmaterial = new THREE.MeshPhongMaterial( {color: 0x666677, emissive: 0x555588, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var blackmaterial = new THREE.MeshPhongMaterial( {color: 0x000000, emissive: 0x000000, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var glassmaterial = new THREE.MeshPhongMaterial( {color: 0x333377, emissive: 0x555588, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 0.5, side: THREE.DoubleSide} );
	var SKYradius = 20000;
	var SKYwidthSegments = 32;
	var SKYheigthSegments = 32;
	var SKYangleStart = 0;
	var SKYangleLenght = 6.3;

	var SKYgeometry = new THREE.SphereGeometry( SKYradius, SKYwidthSegments, SKYheigthSegments, SKYangleStart, SKYangleLenght );
	var sky = new THREE.Mesh( SKYgeometry, SKYmaterial );
		sky.position.set(0,0,0);
		sky.rotation.set(0,0,0);
		sky.scale.set(1,1,1);
	scene.add( sky );


}

function addGentes () {
	var gentes = [
    {src:'gente_tortoise.png', height: 96},
    {src:'gente_tortoise.png', height: 96},
    {src:'gente_tortoise.png', height: 96},
    {src:'gente_tortoise.png', height: 96},
    {src:'gente_tortoise.png', height: 96},
    {src:'gente_tortoise.png', height: 96},
    {src:'gente_tortoise.png', height: 96},
    {src:'gente_tortoise.png', height: 96},
    {src:'gente_tortoise.png', height: 96},
    {src:'gente_clon.png', height: 169},
    {src:'gente_clon.png', height: 169},
    {src:'gente_clon.png', height: 169},
    {src:'gente_clon.png', height: 169},
    {src:'gente_clon.png', height: 169},
    {src:'gente_clon.png', height: 169},
    {src:'gente_clon.png', height: 169},
    {src:'gente_clon.png', height: 169},
    {src:'gente_clon.png', height: 169},
    {src:'gente_coco.png', height: 96},
    {src:'gente_coco.png', height: 96},
    {src:'gente_coco.png', height: 96},
    {src:'gente_coco.png', height: 96},
    {src:'gente_coco.png', height: 96},
    {src:'gente_coco.png', height: 96},
    {src:'gente_coco.png', height: 96},
    {src:'gente_coco.png', height: 96},
    {src:'gente_wally.png', height: 188}
	]
	var i = 0, j = 0;


	for (i;i<gentes.length;i++){
		j=0;
		//for (j;j<4;j++){
	    addPlainGente(gentes[i]);
	  //}
	}
}

function randomPosition(n){
  var positionPositive = Math.floor((Math.random() * n) + 150),
  plusOrMinus = Math.random() < 0.5 ? -1 : 1;
	return positionPositive * plusOrMinus; 
}

function genteTexture (src) {
	// load a texture, set wrap mode to repeat
var texture = THREE.ImageUtils.loadTexture('images/' +src);
/*texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 10, 10 );*/
return texture;
}

function addPlainGente(gente){
	var planexAxis = 96;//dimensiones x
var planeyAxis = gente.height;//dimensiones y
var planezAxis = 96;//dimensiones z

var PLANEmaterial  = new THREE.MeshBasicMaterial( { map: genteTexture(gente.src),color: 0xFFFFFF, side: THREE.DoubleSide , transparent: true } );

//var PLANEmaterial = new THREE.MeshPhongMaterial( {color: 0x0033ff, emissive: 0x000033, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

var PLANEgeometry = new THREE.PlaneGeometry( planexAxis, planeyAxis, planezAxis );
var plane = new THREE.Mesh( PLANEgeometry, PLANEmaterial );
	plane.castShadow = true;	//emitir sombras
	plane.receiveShadow = true;	//recibir sombras
	plane.position.set(randomPosition(1000),Math.floor(gente.height/2),randomPosition(1000));	//position del objeto(x,y,z)
	plane.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	plane.scale.set(1,1,1);		//escala del objeto(x,y,z)
scene.add( plane );
}


function addAstroRey () {
	var SPHEREmaterial = new THREE.MeshPhongMaterial( {color: 0xFFBF1D, emissive: 0xFFBF1D, specular: 0xFFBF1D, shininess: 100, metal: true, side: THREE.DoubleSide} );

var SPHEREradius = 200; //dimensiones de la esfera
var SPHEREwidthSegments = 32;	//segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var SPHEREheigthSegments = 32;	////segmentos usados para dibujar la esfera, cuantos mas segmentos mas redonda pero mas pesada de dibujar
var SPHEREangleStart = 0; //grado desde el que empieza a dibujar la pared de la espera
var SPHEREangleLenght = 6.3; //grados que abarca la esfera (360, solo 180...)

var SPHEREgeometry = new THREE.SphereGeometry( SPHEREradius, SPHEREwidthSegments, SPHEREheigthSegments, SPHEREangleStart, SPHEREangleLenght );
var sphere = new THREE.Mesh( SPHEREgeometry, SPHEREmaterial );
	sphere.castShadow = true;	//emitir sombras
	sphere.receiveShadow = true;	//recibir sombras
	sphere.position.set(100,2000,0);	//position del objeto(x,y,z)
	sphere.rotation.set(0,0,0);	//rotacion del objeto(x,y,z)
	sphere.scale.set(1,1,1);	//escala del objeto(x,y,z)
scene.add( sphere );	
}

function addFloor(){
	var floorTexture = new THREE.ImageUtils.loadTexture( 'images/grassHD.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(10000, 10000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);
}
function addFloorOld(){
	var SKYmaterial  = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/skyHD.jpg'),color: 0xFFFFFF, side: THREE.DoubleSide  } );

	var asphaltTexture = THREE.ImageUtils.loadTexture( "images/asphalt2.jpg" );
		asphaltTexture.wrapS = asphaltTexture.wrapT = THREE.RepeatWrapping; 
		asphaltTexture.repeat.set( 12, 2 );	
	var roadMaterial = new THREE.MeshPhongMaterial( { map: asphaltTexture, color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide } );

	var brickTexture = THREE.ImageUtils.loadTexture( "images/brick.jpg" );
		brickTexture.wrapS = brickTexture.wrapT = THREE.RepeatWrapping; 
		brickTexture.repeat.set( 1, 14 );
	var wallMaterial = new THREE.MeshPhongMaterial( { map: brickTexture, color: 0x888888, emissive: 0x888888, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide } );

	var grassTexture = THREE.ImageUtils.loadTexture( "images/grassHD.jpg" );
		//grassTexture.minFilter = THREE.LinearFilter;
		grassTexture.wrapS = asphaltTexture.wrapT = THREE.RepeatWrapping; 
		grassTexture.repeat.set( 12, 1 );	
	var grassMaterial = new THREE.MeshLambertMaterial( { map: grassTexture, color: 0x888888, emissive: 0x888888, specular: 0x111111 } );

	var CYLINDERmaterial = new THREE.MeshPhongMaterial( {color: 0xff0033, emissive: 0xff0000, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var metalmaterial = new THREE.MeshPhongMaterial( {color: 0x666677, emissive: 0x555588, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var blackmaterial = new THREE.MeshPhongMaterial( {color: 0x000000, emissive: 0x000000, specular: 0x111111, shininess: 100, metal: true, side: THREE.DoubleSide} );

	var glassmaterial = new THREE.MeshPhongMaterial( {color: 0x333377, emissive: 0x555588, specular: 0x111111, shininess: 100, metal: true, transparent: true, opacity: 0.5, side: THREE.DoubleSide} );
	//--------------------------------------
	//FLOOR --------------------------------

	var PLANEgeometry = new THREE.PlaneGeometry( 10000, 10000, 10000 );
	var plane = new THREE.Mesh( PLANEgeometry, grassMaterial );

		plane.castShadow = true;
		plane.receiveShadow = true;
		plane.position.set(0,0,0);
		plane.rotation.set((3*Math.PI)/2,0,0);
		plane.scale.set(1,1,1);
	scene.add( plane );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function movement(value, object, delay, duration){
          var tween = new TWEEN.Tween(object).to(
          	value
          	,duration).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
          	/*camera.position.x = valueX;
          	camera.position.y = valueY;
          	camera.position.z = valueZ;*/
          }).delay(delay).start();
}

function animate() {

	setTimeout( function() {
		requestAnimationFrame( animate );
	}, 1000/30 );

    TWEEN.update();

	render();

	//if(controls) controls.update( clock.getDelta() );
}

function render(){
	renderer.render(scene,camera);
}

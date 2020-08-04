function initPaintings() {
    var femats = [];
    var seTex = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Saculs/Nessi-Virtual/master/Nessi2k/Nessi%20Nezilla_01_2048px.jpg");
    var seMat = new THREE.MeshLambertMaterial({map: seTex /*alphaMap: seTex,transparent: true, opacity: 1, */,side: THREE.DoubleSide});
    femats.push(seMat);
    var trTex = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Saculs/Nessi-Virtual/master/Nessi2k/Nessi%20Nezilla_02_2048px.jpg");
    var trMat = new THREE.MeshLambertMaterial({map: trTex,side: THREE.DoubleSide});
    femats.push(trMat);
    var brTex = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Saculs/Nessi-Virtual/master/Nessi2k/Nessi%20Nezilla_03_2048px.jpg");
    var brMat = new THREE.MeshLambertMaterial({map: brTex,side: THREE.DoubleSide});
    femats.push(brMat);
    var cnTex = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Saculs/Nessi-Virtual/master/Nessi2k/Nessi%20Nezilla_04_2048px.jpg");
    var cnMat = new THREE.MeshLambertMaterial({map: cnTex,side: THREE.DoubleSide});
    femats.push(cnMat);
    var dnTex = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Saculs/Nessi-Virtual/master/Nessi2k/Nessi%20Nezilla_05_2048px.jpg");
    var dnMat = new THREE.MeshLambertMaterial({map: dnTex,side: THREE.DoubleSide});
    femats.push(dnMat);

    var dgTex = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Saculs/Nessi-Virtual/master/Nessi2k/Nessi%20Nezilla_06_2048px.jpg");
    var dgMat = new THREE.MeshLambertMaterial({map: dgTex,side: THREE.DoubleSide});
    femats.push(dgMat);

    var dcTex = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Saculs/Nessi-Virtual/master/Nessi2k/Nessi%20Nezilla_07_2048px.jpg");
    var dcMat = new THREE.MeshLambertMaterial({map: dcTex,side: THREE.DoubleSide});
    femats.push(dcMat);

      var contactloader = new GLTFLoader(manager);
      
contactloader.load( "models/canvas270.glb", function(gltf){
  var contact = gltf.scene;

    contact.scale.set(7.5,15,-15);

  contact.position.set(- 50, 22, -100);
  contact.rotation.y = getRadian(-90);

  contact.visible = true;
  contact.material = dcMat;
  contact.traverse(function (o) {
    if (o.isMesh) {
    o.material = seMat;
     var i;
    for (i = 0; i < 3; i++) {
      //var p = new THREE.Mesh(new THREE.PlaneGeometry( 1, 1), vlajkaMat);

      //var p = new THREE.Mesh(new THREE.PlaneGeometry(18, 27), new THREE.MeshLambertMaterial({side: THREE.DoubleSide}));
      ///p.scale.set(1,1,1);
      //initPlane(p);

      var p = o.clone();
      p.scale.set(10,20.25,-13.5);
    p.rotation.y = getRadian(-90);
      p.position.set(i * 50 - 0, 22, -100);
      //p.rotation.y = getRadian(-90);
      if(i < (femats.length)) p.material = femats[1+i] ;
      //p.name = fellasList[i];
      scene.add(p);
      //planes.push(p);
    }
    }
  });
  scene.add(contact);
});

var i;
    for (i = 0; i < 7; i++) {
      //var p = new THREE.Mesh(new THREE.PlaneGeometry( 1, 1), vlajkaMat);

      var p = new THREE.Mesh(new THREE.PlaneGeometry(18, 27), new THREE.MeshLambertMaterial({side: THREE.DoubleSide}));
      p.scale.set(1.5,1.5,1.5);
      //initPlane(p);

      
      p.position.set(i * 50 - 50, 22, -100);
      //p.rotation.y = getRadian(-90);
      if(i < (femats.length)) p.material = femats[i] ;
      //p.name = fellasList[i];
      scene.add(p);
      //planes.push(p);
    }
    var ufoloader = new GLTFLoader(manager);
   ufoloader.load( "models/interior4.glb", function(gltf){
   ufo = gltf.scene;

    ufo.scale.set(15,15,15);

  ufo.position.set(- 0, 0.50, 60);
  ufo.rotation.y = getRadian(-90);

  ufo.visible = true;



  ufo.traverse(function (o) {
    if (o.isMesh) {
    console.log("UFO");
    }
  });
  scene.add(ufo);

},
  // called while loading is progressing
  function ( xhr ) {

      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

  }
  );
  }	
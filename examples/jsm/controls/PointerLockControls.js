import {
	Euler,
	EventDispatcher,
	Vector3
} from "../../../build/three.module.js";

var mobile
mobile = false;
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

var ww = document.body.clientWidth / 2;
var wh = document.body.clientHeight / 2;

var h = window.innerHeight;

var PointerLockControls = function (camera, domElement) {

	if (isMobile) { mobile = true; } else { mobile = false; }

	if (domElement === undefined) {
		console.warn('THREE.PointerLockControls: The second parameter "domElement" is now mandatory.');
		domElement = document.body;
	}

	this.domElement = domElement;
	this.isLocked = false;

	var scope = this;

	var changeEvent = { type: 'change' };
	var lockEvent = { type: 'lock' };
	var unlockEvent = { type: 'unlock' };

	var euler = new Euler(0, 0, 0, 'YXZ');

	var PI_2 = Math.PI / 2;
	var PI_2y = Math.PI / 3.8;

	var PI_2_mobile = Math.PI / 9;

	var vec = new Vector3();

	var clientX, clientY;
	var tsClientX, tsClientY;
	var xfromtouch = 0;
	var yfromtouch = 0;
	var lastxpos = 0;
	var lastypos = 0;

	function onTouch(e) {
		e.preventDefault();

		tsClientX = e.touches[0].clientX;
		tsClientY = e.touches[0].clientY;
		//console.log(tsClientX, tsClientY);
		//console.log("device/2", ww, h);
		//euler.setFromQuaternion( camera.quaternion );
		//lastxpos = euler.x;
		//lastypos = euler.y;
	}
	function onTouchMove(e) {
		clientY = tsClientY - e.touches[0].clientY;
		clientX = e.touches[0].clientX - tsClientX;
		//xfromtouch = clientX-ww;
		//yfromtouch = clientY-(h-100) ;
		euler.setFromQuaternion(camera.quaternion);
		euler.y += lastypos + xfromtouch + clientX * 0.0025;
		euler.x -= lastxpos + yfromtouch + clientY * 0.0025;
		euler.x = Math.max(- PI_2y, Math.min(PI_2y, euler.x));
		//euler.y = Math.max( - PI_2, Math.min( PI_2, euler.y ) );
		tsClientY = e.touches[0].clientY;
		tsClientX = e.touches[0].clientX;
		camera.quaternion.setFromEuler(euler);
		scope.dispatchEvent(changeEvent);
		//console.log("TouchMove", clientX, clientY);

	};
	function onTouchEnd(e) {
	};
	function onMouseMove(event) {

		if (scope.isLocked === false) return;

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		euler.setFromQuaternion(camera.quaternion);

		euler.y -= movementX * 0.002;
		euler.x -= movementY * 0.002;

		euler.x = Math.max(- PI_2, Math.min(PI_2, euler.x));

		//euler.y = Math.max( - PI_2y, Math.min( PI_2y, euler.y ) );

		camera.quaternion.setFromEuler(euler);
		scope.dispatchEvent(changeEvent);
	}

	function onPointerlockChange() {
		if (document.pointerLockElement === scope.domElement) {
			scope.dispatchEvent(lockEvent);
			scope.isLocked = true;
		} else {
			scope.dispatchEvent(unlockEvent);
			scope.isLocked = false;
		}
	}

	function onPointerlockError() {
		console.log('THREE.PointerLockControls: Unable to use Pointer Lock API');
	}

	this.connect = function () {
		document.addEventListener('mousemove', onMouseMove, false);
		document.addEventListener('touchstart', onTouch, false);
		document.addEventListener('touchmove', onTouchMove, false);
		document.addEventListener('pointerlockchange', onPointerlockChange, false);
		document.addEventListener('pointerlockerror', onPointerlockError, false);
	};

	this.disconnect = function () {
		document.removeEventListener('mousemove', onMouseMove, false);
		document.removeEventListener('touchend', onTouchEnd, false);
		document.removeEventListener('touchmove', onTouchMove, false);
		document.removeEventListener('pointerlockchange', onPointerlockChange, false);
		document.removeEventListener('pointerlockerror', onPointerlockError, false);
	};

	this.dispose = function () {
		this.disconnect();
	};

	this.getObject = function () { // retaining this method for backward compatibility
		return camera;
	};

	this.getDirection = function () {
		var direction = new Vector3(0, 0, - 1);
		return function (v) {
			return v.copy(direction).applyQuaternion(camera.quaternion);
		};
	}();

	this.moveForward = function (distance) {
		vec.setFromMatrixColumn(camera.matrix, 0);
		vec.crossVectors(camera.up, vec);
		camera.position.addScaledVector(vec, distance);
	};

	this.moveRight = function (distance) {
		vec.setFromMatrixColumn(camera.matrix, 0);
		camera.position.addScaledVector(vec, distance);
	};

	if (mobile == true) {
		this.lock = function () {
			scope.isLocked = true;
			this.connect();
		};
	}
	else {
		this.lock = function () {
			this.domElement.requestPointerLock();
		};
	}

	this.unlock = function () {
		//document.exitPointerLock();
	};
	this.connect();
};

PointerLockControls.prototype = Object.create(EventDispatcher.prototype);
PointerLockControls.prototype.constructor = PointerLockControls;

export { PointerLockControls };

#pragma strict

public var TILE_SIZE = 64;
public var tileEngine : tile_engine;
public var guy_prefab : GameObject;

function Start() {
	// tileEngine.cameraLookat(0, 0); TODO
	for (var i = 0; i < 5; i++) {
		Instantiate(guy_prefab);
	}
}

function Update() {
}


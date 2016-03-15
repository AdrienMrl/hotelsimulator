#pragma strict

public var TILE_SIZE = 64;
public var tileEngine : tile_engine;
public var guy_prefab : GameObject;
public var reception_prefab : GameObject;
public var background_prefab : GameObject;
public var text_bubble_prefab : GameObject;
public var money_prefab : GameObject;
private var player_money : int = 200;

static function getInstance() {
	return GameObject.Find("GameEngine").GetComponent(gameEngine);
}

function Start() {
	// tileEngine.cameraLookat(0, 0); TODO
	for (var i = 0; i < 1; i++) {
		Instantiate(guy_prefab);
	}
	
	reception.spawn(4, 10, gameEngine.getInstance().reception_prefab);
	reception.spawn(8, 10, gameEngine.getInstance().reception_prefab);
	reception.spawn(12, 14, gameEngine.getInstance().reception_prefab);
	reception.spawn(12, 12, gameEngine.getInstance().reception_prefab);

}

function earnMoney(amount : int, parent : GameObject) {
	var money : GameObject = Instantiate(money_prefab);
	money.transform.position = parent.transform.position;
	money.transform.position.z = -10;
	money.GetComponent.<tchitching_controller>().setValue(amount);
	money.transform.position.y += 0.05;
	player_money += amount;
}

function Update() {
}


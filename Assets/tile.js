#pragma strict

public class tile extends hotelEntity {

	private var _gameEngine : gameEngine;

	enum Type {
		EMPTY,
		TARGET,
		OBSTACLE,

		// DEBUG TYPES
		START,
		PATH
	}

	private var type : Type = Type.EMPTY;

	function Awake() {
		_gameEngine = GameObject.Find("GameEngine").GetComponent(gameEngine);
	}

	function setType(t : Type) {
		type = t;
		paint();
	}

	function setZLayer(_z_layer : int) {
		transform.position.z = _z_layer;
	}

	function paint() {

		var color : Color;

		switch (type) {
			case Type.EMPTY:
				color = Color.blue;
				break;
			case Type.OBSTACLE:
				color = Color.black;
				break;
			case Type.TARGET:
				color = Color.red;
				break;
			case Type.START:
				color = Color.green;
				break;
			default:
				color = Color.red;
				break;
		}

		GetComponent(SpriteRenderer).color = color;
	}

}

#pragma strict

public interface paintable {
	function paint();
}

public class hotelEntity extends MonoBehaviour implements paintable {
	
	protected var tilePosX : int;
	protected var tilePosY : int;

	function setUpTiled(px : int, py : int) {
		tilePosX = px;
		tilePosY = py;

		transform.position.x = transform.localScale.x * tilePosX;
		transform.position.y = transform.localScale.y * tilePosY;

		paint();
	}

	function setUp(px : float, py : float) {
		transform.position.x = px;
		transform.position.y = py;

		paint();
	}

	function paint() {
	}
}

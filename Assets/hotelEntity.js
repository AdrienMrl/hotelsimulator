#pragma strict

public interface paintable {
	function paint();
}

public class hotelEntity extends MonoBehaviour implements paintable {

	public var tilePosX : int;
	public var tilePosY : int;

	function setUpTiled(px : int, py : int) {
		tilePosX = px;
		tilePosY = py;

    recompute_pos();
		paint();
	}

  protected function rescale(factor : float) {
    transform.localScale.x = factor;
    transform.localScale.y = factor;
  }

  protected function getTileSize() {
    var sprite : Sprite = Resources.Load.<Sprite>("sprites/carrelage");

    return sprite.bounds.size.x;
  }

  protected function recompute_pos() {

    var TILE_SIZE : float = getTileSize();
		transform.position.x = TILE_SIZE * tilePosX;
		transform.position.y = TILE_SIZE * tilePosY;

  }

	function setUp(px : float, py : float) {

		transform.position.x = px;
		transform.position.y = py;
		paint();
	}

	function paint() {
	}
}

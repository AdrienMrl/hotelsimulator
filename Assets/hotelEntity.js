#pragma strict

public class hotelEntity extends MonoBehaviour {

	public var tilePosX : int;
	public var tilePosY : int;

	function setTiledPos(px : int, py : int) {
		tilePosX = px;
		tilePosY = py;
		transform.position.z = 0.2 * tilePosY;
	}
	
	function setUpTiled(px : int, py : int) {
		setTiledPos(px, py);
    	recompute_pos();
	}

  protected function rescale(factor : float) {
    transform.localScale.x = factor;
    transform.localScale.y = factor;
  }

  static function getTileSize() {
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
	}
}

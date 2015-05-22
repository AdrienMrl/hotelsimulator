#pragma strict

public class humanController extends MonoBehaviour {

	private var _tile : tile;

	function Start() {
		_tile = GetComponent(tile);
		_tile.setType(tile.Type.START);
		_tile.setUpTiled(3, 3);
		_tile.setZLayer(-1);
	}
}

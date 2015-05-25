#pragma strict

public var _tile_engine : tile_engine;

public class humanController extends MonoBehaviour {

	private var _tile : Tile;

	function Start() {
		_tile = GetComponent(Tile);
		_tile.addSprite(new HumanSprite());
		_tile.setUpTiled(3, 3);
		_tile.setZLayer(-1);

		var astar = new AStar(_tile, TileData.getInstance().world.getTileClass(12, 16) as Tile);
	}
}

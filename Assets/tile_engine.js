#pragma strict

function Start() {

	TileData.getInstance();
}

function getAStar() : AStar {
	return new AStar(null, null);
}

public class TileData {
	public var world : TiledWorld;
	public var tile_prefab : GameObject;
	private static var tile_data : TileData;

	function TileData() {
		tile_prefab = Resources.Load("tile_prefab") as GameObject;
	}

	public static function getInstance() : TileData {
		if (tile_data == null) {
			tile_data = new TileData();
			tile_data.world = new TiledWorld(10, 10);
		}
		return tile_data;
	}
}

public class AStar {

	private var final_path : GameObject[] = new GameObject[10];
	private var start : hotelEntity;
	private var target : hotelEntity;

	function AStar(start : hotelEntity, target : hotelEntity) {
		this.start = start;
		this.target = target;
		compute();
		draw_final_path();
	}

	function compute() {
		final_path[0] = TileData.getInstance().world.getTile(5, 5);
		final_path[1] = TileData.getInstance().world.getTile(6, 5);
		final_path[2] = TileData.getInstance().world.getTile(7, 5);
		final_path[3] = TileData.getInstance().world.getTile(8, 4);
	}

	function draw_final_path() {
		for (var _tile : GameObject in final_path) {
			if (_tile == null)
				continue;
			_tile.GetComponent(tile).setType(new CarrelageSprite());
			_tile.GetComponent(tile).setZLayer(-1);
		}
	}
}

public class TiledWorld {

	private var sx : int;
	private var sy : int;
	private var tiles : GameObject[,];
	
	function makeTile(x : int, y : int, type : TileType) {
			tiles[x, y] = GameObject.Instantiate(TileData.getInstance().tile_prefab);
			tiles[x, y].GetComponent(tile).setType(type);
			tiles[x, y].GetComponent(tile).setUpTiled(x, y);
	}

	function TiledWorld(sizex : int, sizey : int) {
		this.sx = sizex;
		this.sy = sizey;
		
		tiles = new GameObject[sizex, sizey];
		
		for (var i = 0; i < sizex; i++) {
			for (var j = 0; j < sizey; j++) {
				makeTile(i, j, new CarrelageSprite());
			}
				
		}
	}

	function getTile(x : int, y : int) : GameObject {

		return tiles[x, y]; // TODO: check for good coordinates
	}
}

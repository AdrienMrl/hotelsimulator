#pragma strict

public var tile_prefab : GameObject;

public class TiledWord {

	private var sx : int;
	private var sy : int;
	private var tiles : GameObject[,];
	
	function TiledWord(sizex : int, sizey : int, tile_prefab : GameObject) {
		this.sx = sizex;
		this.sy = sizey;
		
		tiles = new GameObject[sizex, sizey];
		
		for (var i = 0; i < sizex; i++) {
			for (var j = 0; j < sizey; j++) {
				tiles[i, j] = GameObject.Instantiate(tile_prefab);
				tiles[i, j].GetComponent(tile).setUp(i, j);
			}
				
		}
	}
}


function Start () {
	var world = new TiledWord(20, 20, tile_prefab);
}

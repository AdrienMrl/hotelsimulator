#pragma strict

import System.Collections.Generic;

function Start() {

	TileData.getInstance();
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
			tile_data.world = new TiledWorld(20, 20);
		}
		return tile_data;
	}
}

public class AStar {

	private var final_path : List.<Tile> = new List.<Tile>();
	private var start : hotelEntity;
	private var target : hotelEntity;
	private var worldSize : int;
	private var world : TiledWorld;

	private class Node implements System.IComparable {
		var tile : Tile;
		var gcost : int;
		public var fcost : int;
		var pointing : Node;
		var closed : System.Boolean = false;
		var opened : System.Boolean = false;

		function Node(tile : Tile) {
			this.tile = tile;
		}

		function px() {
			return tile.tilePosX;
		}
		function py() {
			return tile.tilePosY;
		}

		function CompareTo(a) : int {
			var na : Node = a as Node;
			return - (fcost - na.fcost);
		}
	}

	private var grid : Node[,];

	function AStar(start : Tile, target : Tile) {
		this.start = start;
		this.target = target;

		// lets build the local grid
		world = TileData.getInstance().world;
		grid = new Node[world.sx, world.sy];
		for (var i = 0; i < world.sx; i++)
			for (var j = 0; j < world.sx; j++)
				grid[i, j] = new Node(world.getTileClass(i, j));

		worldSize = i * j;
		compute();
		draw_final_path();
	}

	function distFromTarget(e : Node) {
		return Mathf.Abs(e.px() - target.tilePosX) +
 			     Mathf.Abs(e.py() - target.tilePosY);
	}

	function getNode(x : int, y : int) {
		if (x < 0 || y < 0 || x >= world.sx || y >= world.sy)
			return null;
		return grid[x, y];
	}

	function getTile(x : int, y : int) {
		if (x < 0 || y < 0)
			return null;
		return TileData.getInstance().world.getTileClass(x, y);
	}

	function compute() {
		var openedSet = new List.<Node>(worldSize);
		var neighbours = [
			[-1, -1], [0, -1], [1, -1],
			[-1,  0], [0,  0], [1,  0],
			[-1,  1], [0,  1], [1,  1]
		];

		openedSet.Add(grid[start.tilePosX, start.tilePosY]);

		while (openedSet.Count != 0) {

			openedSet.Sort();
			var node : Node = openedSet[0];
			openedSet.RemoveAt(0);
			node.closed = true;

			for (var dir : int[] in neighbours) {
				var neighbour : Node = getNode(node.tile.tilePosX + dir[0], node.tile.tilePosY + dir[1]);

				if (neighbour == null || neighbour.closed)
					continue;

				if (neighbour.tile.tilePosX == target.tilePosX &&
					  neighbour.tile.tilePosY == target.tilePosY) {

						neighbour.pointing = node;
						make_final_path(neighbour);
						return;
				}

				if (!neighbour.opened) {
					openedSet.Add(neighbour);
					neighbour.opened = true;
				}

				var neighbour_g_cost = node.gcost + Mathf.Sqrt((Mathf.Abs(dir[0]) + Mathf.Abs(dir[0])) * 10);
				if (neighbour.pointing == null || neighbour.gcost > neighbour_g_cost) {
					neighbour.gcost = neighbour_g_cost;
					neighbour.pointing = node;
				}
				neighbour.fcost = neighbour.gcost + distFromTarget(neighbour);
				openedSet.Add(neighbour);
			}
		}
	}

	function make_final_path(end : Node) {

		var current = end;
		while (current.px() != start.tilePosX &&
					 current.py() != start.tilePosY) {
			final_path.Add(world.getTileClass(current.px(), current.py()));
			current = current.pointing;
		}
	}

	function draw_final_path() {
		for (var _tile : Tile in final_path) {
			if (_tile == null)
				continue;
			_tile.sprites.Clear();
			_tile.setZLayer(-1);
		}
	}
}

public class TiledWorld {

	public var sx : int;
	public var sy : int;
	private var tiles : GameObject[,];

	function makeTile(x : int, y : int, sprite : TileType) {
			tiles[x, y] = GameObject.Instantiate(TileData.getInstance().tile_prefab);
			tiles[x, y].GetComponent(Tile).addSprite(sprite);
			tiles[x, y].GetComponent(Tile).setUpTiled(x, y);
			return tiles[x, y];
	}

	function TiledWorld(sizex : int, sizey : int) {
		this.sx = sizex;
		this.sy = sizey;

		tiles = new GameObject[sizex, sizey];

		for (var i = 0; i < sizex; i++) {
			for (var j = 0; j < sizey; j++) {
				var t = makeTile(i, j, new CarrelageSprite());
				if (Random.Range(0, 3) == 0)
					t.GetComponent(Tile).addSprite(new PlantSprite());
			}

		}
	}

	function getTile(x : int, y : int) : GameObject {

		return tiles[x, y]; // TODO: check for good coordinates
	}

	function getTileClass(x : int, y : int) : Tile {
		return tiles[x, y].GetComponent(Tile);
	}
}

#pragma strict

import System.Collections.Generic;

public class AStar {

	public var final_path : List.<Node> = new List.<Node>();
	private var start : Node; // TODO: merge with the line below
	private var target : Node;
	private var worldSize : int;
	private var world : Grid;

	private class AStarNode implements System.IComparable {
		var tile : Node;
		var gcost : int;
		public var fcost : int;
		var pointing : AStarNode;
		var closed : System.Boolean = false;
		var opened : System.Boolean = false;

		function AStarNode(tile : Node) {
			this.tile = tile;
		}

		function px() {
			return tile.positionOnGrid.x;
		}

		function py() {
			return tile.positionOnGrid.y;
		}

		function CompareTo(a) : int {
			var na : AStarNode = a as AStarNode;
			return fcost - na.fcost;
		}
	}

	private var grid : AStarNode[,];

	function AStar(start : Node, target : Node) {
		this.start = start;
		this.target = target;

		// lets build the local grid
		// OPTIMISATION: do not build this each time
		world = Grid.instance;
		grid = new AStarNode[world.size.x, world.size.y];
		for (var i = 0; i < world.size.x; i++)
			for (var j = 0; j < world.size.y; j++)
				grid[i, j] = new AStarNode(world.getNodeAt(Vector2(i, j)));

		worldSize = i * j;
		compute();
		//draw_final_path();
	}

	function distFromTarget(e : AStarNode) {
		return (Mathf.Abs(e.px() - target.positionOnGrid.x) +
 			     Mathf.Abs(e.py() - target.positionOnGrid.y)) * 10;
	}

	function getNode(x : int, y : int) {
		if (x < 0 || y < 0 || x >= world.size.x || y >= world.size.y)
			return null;
		return grid[x, y];
	}

	function getTile(x : int, y : int) {
		if (x < 0 || y < 0)
			return null;
		return world.getNodeAt(Vector2(x, y));
	}

	function compute() {
		var openedSet = new List.<AStarNode>(worldSize);
		var neighbours = [
			[-1, -1], [0, -1], [1, -1],
			[-1,  0], [0,  0], [1,  0],
			[-1,  1], [0,  1], [1,  1]
		];

		var startNode = grid[start.positionOnGrid.x, start.positionOnGrid.y];
		openedSet.Add(startNode);
		startNode.opened = true;

		while (openedSet.Count != 0) {

			openedSet.Sort();
			var node : AStarNode = openedSet[0];
			openedSet.RemoveAt(0);
			node.closed = true;

			for (var dir : int[] in neighbours) {
				var neighbour : AStarNode =
					getNode(node.tile.positionOnGrid.x + dir[0],
									node.tile.positionOnGrid.y + dir[1]);

				var ntype: Node.Type = neighbour.tile.type;

				if (neighbour == null || neighbour.closed || ntype == Node.Type.Obstacle)
					continue;

				if (neighbour.tile.positionOnGrid.x == target.positionOnGrid.x &&
					  neighbour.tile.positionOnGrid.y == target.positionOnGrid.y) {

						neighbour.pointing = node;
						make_final_path(neighbour);
						return;
				}



				var neighbour_g_cost = node.gcost + Mathf.Sqrt((Mathf.Abs(dir[0]) + Mathf.Abs(dir[1]))) * 10;
				if (!neighbour.opened || neighbour.gcost > neighbour_g_cost) {
					neighbour.gcost = neighbour_g_cost;
					neighbour.pointing = node;
					neighbour.fcost = neighbour.gcost + distFromTarget(neighbour);
					if (!neighbour.opened) {
						openedSet.Add(neighbour);
						neighbour.opened = true;
					}
				}
			}
		}
	}

	function make_final_path(end : AStarNode) {

		var current = end;
		while (current.px() != start.positionOnGrid.x ||
					 current.py() != start.positionOnGrid.y) {
			final_path.Add(world.getNodeAt(Vector2(current.px(), current.py())));
			current = current.pointing;
		}
		final_path.Reverse();
	}

	function getNextPath() {
		return final_path.Count == 0 ? null : final_path[0];
	}

	function popPath() {
		final_path.RemoveAt(0);
	}
}

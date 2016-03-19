#pragma strict

class DijkstraGrid {
  var size = Vector2.zero;
  public var map: int[,];

  function DijkstraGrid() {
    size = Grid.instance.size;
    map = new int[size.x, size.y];
    for (var i = 0; i < size.x; i++) {
      for (var j = 0; j < size.y; j++) {
        map[i, j] = -2;
      }
    }
  }

  function isValid(position: Vector2) {
      return position.x >= 0 &&
             position.y >= 0 &&
             position.x < size.x &&
             position.y < size.y;
  }

  function setValue(value: int, position: Vector2) {
    if (isValid(position))
      map[position.x, position.y] = value;
  }

  function getValue(position: Vector2) : int {
    return isValid(position) ? map[position.x, position.y] : -1;
  }
}

class Dijkstra extends MonoBehaviour {

  static var directions = [
    Vector2(1, 0),
    Vector2(1, -1),
    Vector2(0, -1),
    Vector2(-1, -1),
    Vector2(-1, 0),
    Vector2(-1, 1),
    Vector2(0, 1),
    Vector2(1, 1)
  ];

  static function getDistanceFromNeighbour(direction: Vector2) {

      if (direction.x == 0 || direction.y == 0)
        return 10;
      else
        return 14;
  }

/*
  static function computeDists(output_grid: DijkstraGrid, node: Node) {

    if (node.isObstacle) {
      output_grid.setValue(-1, node);
      return;
    }

    var distance = output_grid.getValue(node.positionOnGrid);

    if (distance == -1)
      return;

    for (d in directions) {

      var point = node.positionOnGrid + d;

      dist =  + getDistanceFromNeighbour(d);
      if (minDist == -1 || dist < minDist) {
        minDist = dist;
        minNode = Grid.instance.getNodeAt(point);
      }
    }

    if (minDist == -1)
      return;

    if (distance == -2 || distance > minDist)
      output_grid.setValue(minDist, node);

  }

  static function makeMap(node: Node): DijkstraGrid {

    var output_grid = DijkstraGrid();

    if (node.isObstacle()) {
      print("pathfinding should not be set to obstacle");
      return output_grid;
    }

    output_grid.setValue(0, node.positionOnGrid);
    computeDists(output_grid, node);
    return output_grid;
  }

  */

  static function getClosestNode(map: DijkstraGrid, center: Node): Node {

    var position = center.positionOnGrid;
    var min_distance = -1;
    var closest_node: Node = null;

    for (d in directions) {

      var point = position + d;
      var dist = map.getValue(point);

      if (dist < 0) {
        continue;
      }

      dist += getDistanceFromNeighbour(d);

      if (min_distance != -1 && dist >= min_distance)
        continue;

      min_distance = dist;
      closest_node = Grid.instance.getNodeAt(point);
    }

    return closest_node;
  }

  static function getDistance(map: DijkstraGrid, node: Node) {

    if (node.isObstacle()) {
      return -1;
    }

    var closest_node = getClosestNode(map, node);

    if (closest_node == null)
      return -1;

    var dist = map.getValue(closest_node.positionOnGrid);
    if (dist < 0)
      return dist;
    return dist + getDistanceFromNeighbour(node.positionOnGrid - closest_node.positionOnGrid);

  }


  static function makeMap(node: Node): DijkstraGrid {

    var output_grid = DijkstraGrid();

    var open_nodes = Queue();
    output_grid.setValue(0, node.positionOnGrid);

    open_nodes.Enqueue(node);

    while (open_nodes.Count != 0) {

      var core_node: Node = open_nodes.Dequeue() as Node;

      if (core_node == -1)
        continue;

      if (core_node.type == Node.Type.Obstacle) {
        output_grid.setValue(-1, core_node.positionOnGrid);
        continue;
      }


      for (d in directions) {
        var point = core_node.positionOnGrid + d;

        if (!output_grid.isValid(point))
          continue;

        var node_neighbour = Grid.instance.getNodeAt(point);
        var dist_point = output_grid.getValue(node_neighbour.positionOnGrid);
        var dist_current = output_grid.getValue(core_node.positionOnGrid)
          + getDistanceFromNeighbour(d);

        if (dist_point == -2 || dist_current < dist_point) {
          output_grid.setValue(dist_current, node_neighbour.positionOnGrid);
          open_nodes.Enqueue(node_neighbour);
        }
      }
    }

    return output_grid;
  }

  static function showOutputGrid(grid: DijkstraGrid) {

    for (var i = 0; i < grid.size.x; i++)
      for (var j = 0; j < grid.size.y; j++) {
        var label = Instantiate(Resources.Load("distance_label")) as GameObject;
        label.GetComponent.<TextMesh>().text = grid.map[i, j].ToString();
        label.GetComponent.<TextMesh>().anchor = TextAnchor.LowerLeft;
        label.transform.position = Grid.instance.getNodeAt(Vector2(i, j)).getWorldPos();
      }

  }

}

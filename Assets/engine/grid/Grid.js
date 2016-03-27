#pragma strict

public class Grid {

  public static var instance = Grid(Vector2(50, 50));

  public  var size: Vector2;
  public var grid: Node[,];

  function makeGrid() {
    var grd = new Node[size.x, size.y];

    for (var i = 0; i < size.x; i++) {
      for (var j = 0; j < size.y; j++) {
        grd[i, j] = new Node(Node.Type.Empty, Vector2(i, j));
      }
    }

    return grd;
  }

  function toggleDebug() {
    var inst = GridDebugDisplay.instance;
    inst.showGrid = !inst.showGrid;
  }

  function Grid(s: Vector2) {
    size = s;
    grid = makeGrid();
  }


  /*
  * --- MOVING THINGS AROUND ---
  */

  function moveTo(movable: Movable) {
  }

  /*
  * ---
  */


  /*
  * --- READ/WRITE TO THE GRID API ---
  */

  static function getNodeAt(position: Vector2) : Node {
    var grid = instance.grid;
    return isNodeValid(position) ? grid[position.x, position.y] : null;
  }

  function setNodeTypeAt(position: Vector2, type: Node.Type) {
    getNodeAt(position).type = type;
  }

  /*
  * --- HELPERS ---
  */
  static function worldPointToGrid(point: Vector3) {
    return Vector2(point.x * Node.tileSize + Node.tileSize / 2.0,
                   point.z * Node.tileSize + Node.tileSize / 2.0);
  }

  static function isNodeValid(position: Vector2) {
      return position.x >= 0 &&
             position.y >= 0 &&
             position.x < Grid.instance.size.x &&
             position.y < Grid.instance.size.y;
  }

  static function isNodeObstacle(position: Vector2) {
    if (!isNodeValid(position)) {
      return true;
    }

    return Grid.getNodeAt(position).type == Node.Type.Obstacle;
  }

  // TODO: randomize this
  static function obtainValidNeighbouringPos(at: Vector2): Vector2 {
    var surroundings = [
      Vector2(1, 0),
      Vector2(0, 1),
      Vector2(-1, 0),
      Vector2(0, -1)
    ];

    for (d in surroundings) {
      var node = at + d;
      if (!isNodeObstacle(node)) {
        return node;
      }
    }
    return at;
  }

}

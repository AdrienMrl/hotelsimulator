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
  function getNodeAt(position: Vector2) : Node {
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

}

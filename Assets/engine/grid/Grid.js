#pragma strict

public class Grid {

  public static var instance = Grid(Vector2(40, 60));

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
  * --- READ THE GRID API ---
  */
  function getNodeAt(position: Vector2) : Node {
    return grid[position.x, position.y];
  }
}

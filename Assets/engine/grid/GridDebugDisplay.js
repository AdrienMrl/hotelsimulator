#pragma strict

public class GridDebugDisplay extends MonoBehaviour {

  static public var instance = GameObject.Find("engine").AddComponent.<GridDebugDisplay>();
  public var showGrid = false;

  function Update() {
    if (showGrid)
      drawGrid();
  }

  function drawGrid() {

    for (node in Grid.instance.grid) {
      var node_size = Node.tile_size;

      var node_pos = node.getWorldPos();

      var p1 = Vector3(node_pos.x, 0.1, node_pos.z);
      var p2 = Vector3(node_pos.x, 0.1, node_pos.z + node_size);
      var p3 = Vector3(node_pos.x + node_size, 0.1, node_pos.z);

      Debug.DrawLine(p1, p2, Color.blue, Time.deltaTime, true);
      Debug.DrawLine(p1, p3, Color.blue, Time.deltaTime, true);

      var grid_size = Grid.instance.size;

      if (node.positionOnGrid.x == grid_size.x - 1) {
        var p4x = Vector3(node_pos.x + node_size, 0.1, node_pos.z + node_size);

        Debug.DrawLine(p3, p4x, Color.blue, Time.deltaTime, true);
      }

      if (node.positionOnGrid.y == grid_size.y - 1) {
        var p4y = Vector3(node_pos.x + node_size, 0.1, node_pos.z + node_size);

        Debug.DrawLine(p2, p4y, Color.blue, Time.deltaTime, true);
      }
    }
  }
}

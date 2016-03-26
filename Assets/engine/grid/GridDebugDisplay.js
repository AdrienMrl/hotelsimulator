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
      var nodeSize = Node.tileSize;

      var nodePos = node.getWorldPos();

      var p1 = Vector3(nodePos.x, 0.1, nodePos.z);
      var p2 = Vector3(nodePos.x, 0.1, nodePos.z + nodeSize);
      var p3 = Vector3(nodePos.x + nodeSize, 0.1, nodePos.z);

      Debug.DrawLine(p1, p2, Color.blue, Time.deltaTime, true);
      Debug.DrawLine(p1, p3, Color.blue, Time.deltaTime, true);

      var gridSize = Grid.instance.size;

      if (node.positionOnGrid.x == gridSize.x - 1) {
        var p4x = Vector3(nodePos.x + nodeSize, 0.1, nodePos.z + nodeSize);

        Debug.DrawLine(p3, p4x, Color.blue, Time.deltaTime, true);
      }

      if (node.positionOnGrid.y == gridSize.y - 1) {
        var p4y = Vector3(nodePos.x + nodeSize, 0.1, nodePos.z + nodeSize);

        Debug.DrawLine(p2, p4y, Color.blue, Time.deltaTime, true);
      }
    }
  }
}

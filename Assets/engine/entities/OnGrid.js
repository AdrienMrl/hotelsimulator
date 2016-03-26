#pragma strict

class OnGrid extends MonoBehaviour {

  var current_node: Node;
  var meta: Meta;
  var obj_name: String;

  function Start() {
  }

  function setup(name: String) {

    obj_name = name;

    meta = Meta.meta[name] as Meta;
  }

  function Update() {
  }

  function geometryToGrid(x: int, y: int) {

    if (meta.geometry == null) {
      if (meta.isObstacle)
        Grid.instance.setNodeTypeAt(current_node.positionOnGrid, Node.Type.Obstacle);
      return;
    }

    var geo = meta.geometry;
    var node_pos = current_node.positionOnGrid;

    for (var i = 0; i < geo.GetLength(1); i++) {
      for (var j = 0; j < geo.GetLength(0); j++) {
        if (geo[j, i] == 1)
          Grid.instance.getNodeAt(Vector2(j + node_pos.x, i + node_pos.y)).type = Node.Type.Obstacle;
      }
    }

  }

  function wasReposed(x: int, y: int) {
    current_node = Grid.instance.getNodeAt(Vector2(x, y));

    geometryToGrid(x, y);
  }

  function repos(x: int, y: int) {
      repos(Vector2(x, y));
  }

  function repos(pos: Vector2) {
    current_node = Grid.instance.getNodeAt(pos);
    transform.position = current_node.getWorldPos() + Vector3(0, 0.01, 0);
    wasReposed(pos.x, pos.y);
  }

}

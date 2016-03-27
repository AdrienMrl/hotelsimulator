#pragma strict

class OnGrid extends IglooObject {

  var currentNode: Node;
  var meta: Meta;
  var objName: String;

  function Start() {
    super.Start();
  }

  function setup(name: String) {

    objName = name;

    meta = Meta.meta[name] as Meta;
    if (meta == null) {
      meta = Meta.defaultMeta;
    }

  }

  function Update() {
    super.Update();
  }

  function geometryToGrid(x: int, y: int) {

    if (meta.geometry == null) {
      if (meta.isObstacle)
        Grid.instance.setNodeTypeAt(currentNode.positionOnGrid, Node.Type.Obstacle);
      return;
    }

    var geo = meta.geometry;
    var nodePos = currentNode.positionOnGrid;

    for (var i = 0; i < geo.GetLength(1); i++) {
      for (var j = 0; j < geo.GetLength(0); j++) {
        if (geo[j, i] == 1)
          Grid.instance.getNodeAt(Vector2(j + nodePos.x, i + nodePos.y)).type = Node.Type.Obstacle;
      }
    }

  }

  function wasReposed(x: int, y: int) {
    currentNode = Grid.instance.getNodeAt(Vector2(x, y));

    geometryToGrid(x, y);
  }

  function repos(x: int, y: int) {
      repos(Vector2(x, y));
  }

  function repos(pos: Vector2) {
    currentNode = Grid.instance.getNodeAt(pos);
    transform.position = currentNode.getWorldPos() + Vector3(0, 0.01, 0);
    wasReposed(pos.x, pos.y);
  }
}

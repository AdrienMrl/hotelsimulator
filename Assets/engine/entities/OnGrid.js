#pragma strict

class OnGrid extends MonoBehaviour {

  var current_node: Node;
  var meta: Meta;
  var obj_name: String;

  function Start() {
    meta = Meta.getMetaFor(obj_name);
  }

  function Update() {
  }

  function geometryToGrid(x: int, y: int) {

    print("setting geometry to " + meta.geometry[0, 0]);
//    var geometry = Spawner.prefab_meta['desk']

  }

  function wasReposed(x: int, y: int) {
    current_node = Grid.instance.getNodeAt(Vector2(x, y));

    if (meta != null)
      geometryToGrid(x, y);
  }

  function repos(x: int, y: int) {
      repos(Vector2(x, y));
  }

  function repos(pos: Vector2) {
    current_node = Grid.instance.getNodeAt(pos);
    transform.position = current_node.getWorldPos();
    wasReposed(pos.x, pos.y);
  }

}

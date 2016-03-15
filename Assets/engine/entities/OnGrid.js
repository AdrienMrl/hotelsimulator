#pragma strict

class OnGrid extends MonoBehaviour {

  var current_node: Node;

  function repos(pos: Vector2) {
    current_node = Grid.instance.getNodeAt(pos);
    transform.position = current_node.getWorldPos();
  }

  function Update() {
    print(gameObject);
  }
}

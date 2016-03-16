#pragma strict

class Guy extends Movable {

  function Start() {

    repos(Vector2(0, 0));

    var astar = AStar(current_node, Grid.instance.getNodeAt(Vector2(10, 7)));
    var path = astar.final_path;
    var queue = Queue(path);
    setQueue(queue);
  }

  function Update() {
    super.Update();
  }
}

#pragma strict

class Guy extends Movable {

  function Start() {

    repos(Vector2(0, 0));

    var queue = Queue([Grid.instance.getNodeAt(Vector2(10, 5))]);
    queue.Enqueue(Grid.instance.getNodeAt(Vector2(5, 9)));
    setQueue(queue);
  }

  function Update() {
    super.Update();
  }
}

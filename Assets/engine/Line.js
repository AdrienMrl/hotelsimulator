#pragma strict

class Line {

  var direction: Vector2;
  var origin: Vector2;
  var queue = new Queue();
  var endOfQueue: Interactive;

  function Line(origin: Vector2, direction: Vector2) {

      direction.Normalize();

      this.direction = direction;
      this.origin = origin;
      createEndOfQueue(origin);
  }

  function createEndOfQueue(at: Vector2) {
    endOfQueue = Spawner.spawnEmptyInteractive(origin, "endOfQueue");
    endOfQueue.repos(at);
  }

  function enqueue(obj: Movable) {
    queue.Enqueue(obj);
    obj.driver.moveTowards(endOfQueue);

    var endOfQueuePos = endOfQueue.entrance.node.positionOnGrid;
    var nextQueuePos = endOfQueuePos + direction;

    if (Grid.isNodeObstacle(nextQueuePos)) {
      nextQueuePos = Grid.obtainValidNeighbouringPos(endOfQueuePos);
    }

    createEndOfQueue(nextQueuePos);
  }

  function nextPeople(): Movable {
    var movable = queue.Dequeue() as Movable;
    return movable;
  }
}

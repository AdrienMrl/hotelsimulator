#pragma strict

class InteractiveWithLine extends Interactive {
  var line: Line;

  function Start() {
      super.Start();

      var serviceEntrance = entrance.node.positionOnGrid + Vector2(0, 2);

      line = new Line(entrance.node.positionOnGrid,
        entrance.node.positionOnGrid - serviceEntrance);
  }
}

class Interactive extends OnGrid {

  public var entrance: Target;
  public var entranceRelativePos = Vector2(0, 0);
  public var available = true;

  function repos(pos: Vector2, facing: Vector2) {

    super.repos(pos);
    setEntranceNode(facing);

  }

  function setEntranceNode(facing: Vector2) {

    var entranceNode: Node =
      Grid.instance.getNodeAt(currentNode.positionOnGrid + entranceRelativePos);
    entrance = new Target(entranceNode, facing);
  }

  function Start() {
    super.Start();
  }

  class Target {

    var node: Node;
    var facing: Vector2;
    var dijkstra_grid: DijkstraGrid;

    function Target(n: Node, facing: Vector2) {
      this.facing = facing;
      this(n);
    }

    function Target(n: Node) {
      node = n;
      dijkstra_grid = Dijkstra.makeMap(node);
    }

    function tellMeTheWay(me: Movable): Node {

      if (me.currentNode == node) {
        return null;
      }

      return Dijkstra.getClosestNode(dijkstra_grid, me.currentNode);
    }
  }
}

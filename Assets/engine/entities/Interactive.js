#pragma strict

class Interactive extends OnGrid {

  public var entrance: Target;
  public var entranceRelativePos = Vector2(0, 0);
  public var available = true;

  function repos(pos: Vector2) {

    super.repos(pos);

    setEntranceNode();
  }

  function setEntranceNode() {

    var entranceNode: Node =
      Grid.instance.getNodeAt(currentNode.positionOnGrid + entranceRelativePos);
    entrance = Target(entranceNode);
  }

  function Start() {
    super.Start();
  }

  class Target {

    var node: Node;
    var dijkstra_grid: DijkstraGrid;

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

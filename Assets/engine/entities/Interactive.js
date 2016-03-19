#pragma strict

class Interactive extends OnGrid {

  public var entrance: Target;

  function repos(pos: Vector2) {

    super.repos(pos);

    setEntranceNode();
  }

  function setEntranceNode() {

    var entrance_node: Node = Grid.instance.getNodeAt(Vector2(current_node.positionOnGrid.x, current_node.positionOnGrid.y - 1));
    entrance = Target(entrance_node);
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

      if (me.current_node == node) {
        return null;
      }

      return Dijkstra.getClosestNode(dijkstra_grid, me.current_node);
    }
  }
}

#pragma strict

class Interactive extends OnGrid {

  public var entrance: Target;
  public var entrance_relative_pos = Vector2(0, 0);
  public var available = true;

  function repos(pos: Vector2) {

    super.repos(pos);

    setEntranceNode();
  }

  function setEntranceNode() {

    var entrance_node: Node =
      Grid.instance.getNodeAt(current_node.positionOnGrid + entrance_relative_pos);
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

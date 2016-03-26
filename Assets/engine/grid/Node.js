#pragma strict

class Node {
  enum Type {
    Empty,
    Obstacle,
    Guy
  }

  public var type: Type;
  public var positionOnGrid: Vector2;

  static public var tileSize = 1;

  function Node(t: Type, pos: Vector2) {
      type = t;
      positionOnGrid = pos;
  }

  function getWorldPos() {
    return Vector3(positionOnGrid.x * tileSize, 0, positionOnGrid.y * tileSize);
  }

  function isObstacle() {
    return type == Type.Obstacle;
  }
}

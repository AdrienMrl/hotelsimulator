#pragma strict

class Node {
  enum Type {
    Empty,
    Obstacle,
    Guy
  }

  public var type: Type;
  public var positionOnGrid: Vector2;

  static public var tile_size = 1;

  function Node(t: Type, pos: Vector2) {
      type = t;
      positionOnGrid = pos;
  }

  function getWorldPos() {
    return Vector3(positionOnGrid.x * tile_size, 0, positionOnGrid.y * tile_size);
  }

  function isObstacle() {
    return type == Type.Obstacle;
  }
}

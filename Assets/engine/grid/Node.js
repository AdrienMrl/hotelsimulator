#pragma strict

class Node {
  enum Type {
    Empty,
    Obstacle,
    Guy
  }

  public var type;
  public var positionOnGrid: Vector2;

  static public var tile_size = 2;

  function Node(t, pos: Vector2) {
      type = t;
      positionOnGrid = pos;
  }

  function getWorldPos() {
    return Vector3(positionOnGrid.x * tile_size, 0, positionOnGrid.y * tile_size);
  }
}

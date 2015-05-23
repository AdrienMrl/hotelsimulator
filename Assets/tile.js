#pragma strict

public class TileType {
  public var sprite : Sprite;
  enum Type {
    FLOOR,
    TARGET,
    OBSTACLE,

    // DEBUG TYPES
    START,
    PATH
  }
  public var type : Type = Type.FLOOR;
  public var scale : float = 1;
}

public class CarrelageSprite extends TileType {
  public function CarrelageSprite() {
    sprite = Resources.Load.<Sprite>("sprites/carrelage_sprite");
  }
}
public class HumanSprite extends TileType {
  public function HumanSprite() {
    sprite = Resources.Load.<Sprite>("sprites/male_sprite");
    scale = 1;
  }
}

public class tile extends hotelEntity {

  private var _gameEngine : gameEngine;
  var tile_type : TileType;

  function Awake() {
    _gameEngine = GameObject.Find("GameEngine").GetComponent(gameEngine);
  }

  function setType(type : TileType) {
    tile_type = type;
    transform.localScale.x = type.scale;
    transform.localScale.y = type.scale;
    paint();
  }

  function setZLayer(_z_layer : int) {
    transform.position.z = _z_layer;
  }

  function paint() {
    if (tile_type == null)
      return;
    GetComponent(SpriteRenderer).sprite = tile_type.sprite;
  }

}

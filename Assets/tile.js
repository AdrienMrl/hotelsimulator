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
    sprite = Resources.Load.<Sprite>("sprites/carrelage");
  }
}
public class HumanSprite extends TileType {
  public function HumanSprite() {
    sprite = Resources.Load.<Sprite>("sprites/human_male");
    scale = 1;
  }
}
public class PlantSprite extends TileType {
  public function PlantSprite() {
    sprite = Resources.Load.<Sprite>("sprites/plant1");
    type = type.OBSTACLE;
  }
}

public class Tile extends hotelEntity {

  private var _gameEngine : gameEngine;
  var tile_type : TileType;

  function Awake() {
    _gameEngine = GameObject.Find("GameEngine").GetComponent(gameEngine);
  }

  function setType(type : TileType) {

    tile_type = type;
    if (type != null) {
      transform.localScale.x = type.scale;
      transform.localScale.y = type.scale;

      // if it is a big sprite, we have to place it correctly
      var sprite : Sprite = type.sprite;
      if (sprite != null) {
        var diff = sprite.bounds.size.y - getTileSize();
        if (diff > 0)
          transform.position.y += diff;
      }
    }
    paint();
  }

  function setZLayer(_z_layer : int) {
    transform.position.z = _z_layer;
  }

  function paint() {

    var sprite : Sprite = null;

    if (tile_type != null)
      sprite = tile_type.sprite;

    GetComponent(SpriteRenderer).sprite = sprite;
  }

}

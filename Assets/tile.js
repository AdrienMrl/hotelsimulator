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
  public var zdepth : float = 0;
  public var gameObject : GameObject;
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
    zdepth = -0.1;
  }
}
public class PlantSprite extends TileType {
  public function PlantSprite() {
    sprite = Resources.Load.<Sprite>("sprites/plant1");
    type = type.OBSTACLE;
    zdepth = -0.1;
  }
}

public class Tile extends hotelEntity {

  private var _gameEngine : gameEngine;
  var sprites = new List.<TileType>();
  
  function Awake() {
    _gameEngine = GameObject.Find("GameEngine").GetComponent(gameEngine);
  }

  function addSprite(type : TileType) {

	if (type == null)
		return;
	type.gameObject = instantiateSprite(type);
    sprites.Add(type);
    transform.localScale.x = type.scale;
    transform.localScale.y = type.scale;

      // if it is a big sprite, we have to place it correctly
      var sprite : Sprite = type.sprite;
      if (sprite != null) {
        var diff = sprite.bounds.size.y - getTileSize();
        if (diff > 0)
          type.gameObject.transform.localPosition.y += diff / 2;
      }
  }
  
  function isObstacle() {
 
  	for (var sprite:TileType in sprites)
  		if (sprite.type == TileType.Type.OBSTACLE)
  			return true;
  	return false;
  }

  function setZLayer(_z_layer : int) {
    transform.position.z = _z_layer;
  }

  function instantiateSprite(sprite : TileType) {
		var new_sprite_go : GameObject =
			Instantiate(Resources.Load.<GameObject>("sprite_prefab"));
    	new_sprite_go.GetComponent(SpriteRenderer).sprite = sprite.sprite;
    	new_sprite_go.transform.parent = transform;
    	new_sprite_go.transform.localPosition = Vector3(0, 0, 0);
    	new_sprite_go.transform.localPosition.z = sprite.zdepth;
    	return new_sprite_go;
    }
}

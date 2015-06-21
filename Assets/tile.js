#pragma strict

public class HotelSprite {
  public var sprite : Sprite;
  
  // TODO: delete this enum
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
  public var tilesize : Vector2 = Vector2(1, 1);
  public var gameObject : GameObject;
}

public class CarrelageSprite extends HotelSprite {
  public function CarrelageSprite() {
    sprite = Resources.Load.<Sprite>("sprites/carrelage");
    zdepth = 0.1;
  }
}
public class HumanSprite extends HotelSprite {
  public function HumanSprite() {
    sprite = Resources.Load.<Sprite>("sprites/human_male");
    scale = 1;
    zdepth = 0;
  }
}
public class PlantSprite extends HotelSprite {
  public function PlantSprite() {
    sprite = Resources.Load.<Sprite>("sprites/plant1");
    type = type.OBSTACLE;
    zdepth = 0;
  }
}
public class GrassSprite extends HotelSprite {
  public function GrassSprite() {
  	sprite = Resources.Load.<Sprite>("sprites/pelouse");
    zdepth = 0.2;
  }
}

public class ReceptionSprite extends HotelSprite {
	public function ReceptionSprite() {
		sprite = Resources.Load.<Sprite>("sprites/reception");
		tilesize.x = 4;
		tilesize.y = 2;
	}
}

public class Tile extends MonoBehaviour {

  private var _gameEngine : gameEngine;
  var sprites = new List.<HotelSprite>();
  public var posX : int;
  public var posY : int;
  
  // the parent can take more than one tile
  public var parent : hotelEntity;
  
  public function Tile(x : int, y : int, parent : hotelEntity) {
  	posX = x;
  	posY = y;
  	this.parent = parent;
  }
  
  public function getWorldPosition() : Vector3 {
  	
  } 
  
  private class Pathfinder { // might be better off in tile_engine.js
	  var target : Tile;
	  var parent : hotelEntity;
	  var pathfinding : AStar;
	  
	  function Pathfinder(parent : hotelEntity, target : Tile) {
	  	this.target = target;
	  	this.parent = parent;
	  	pathfinding = new AStar(parent.getTile(), target);
	  }
	  	
	  static function close(a : Vector3, b : Vector3) {
	     var diff = a - b;
	if (Mathf.Abs(diff.x) < 0.03 &&
		Mathf.Abs(diff.y) < 0.03)
		return true;
	return false;
}

	  function updatePosition() {
	  
	  	var next_path : Tile = pathfinding.getNextPath();
	  	if (next_path == null)
	  		return false;
	  
	    var target = next_path.transform.position;
	    var spriteOffset = parent.getSpriteOffset();
	    target.y += spriteOffset.y;
	    target.x += spriteOffset.x;
   	    parent.move(Vector3.MoveTowards(parent.transform.position,
   	      target, parent.speed * Time.deltaTime));

//   	    if (tile_engine.isTileCollision(parent.getTile(), pathfinding.getNextPath())) {
		if (close(parent.transform.position, target)) {
   	    	//parent.setTiledPos(next_path.posX, next_path.posY); // TODO: mabe restoring this instruction instead of converting world pos to tile pos at each frame would be more optimised
   	    	pathfinding.popPath();
   	    }
   	    return true;
	  }
  }
  
  function Awake() {
    _gameEngine = GameObject.Find("GameEngine").GetComponent(gameEngine);
  }
 	
  function setUpTiled(x : int, y : int) {
  	posX = x;
  	posY = y;
  	transform.position = tile_engine.worldPosFromTilePos(Vector2(x, y), CarrelageSprite().sprite);
  }
  
  function addSprite(type : HotelSprite) {

	if (type == null)
		return;
	type.gameObject = instantiateSprite(type);
    sprites.Add(type);

    type.gameObject.transform.parent = transform;
    type.gameObject.transform.localPosition.y += type.sprite.bounds.size.y -
    	CarrelageSprite().sprite.bounds.size.y;
    type.gameObject.transform.localPosition.z = type.zdepth;
  }
  
  function isObstacle() {
 
 	if (parent != null)
  		return true;
  	
  	for (var sprite:HotelSprite in sprites)
  		if (sprite.type == HotelSprite.Type.OBSTACLE)
  			return true;
  	
  	return false;
  }

 
  function instantiateSprite(sprite : HotelSprite) {
		var new_sprite_go : GameObject =
			Instantiate(Resources.Load.<GameObject>("sprite_prefab"));
    	new_sprite_go.GetComponent(SpriteRenderer).sprite = sprite.sprite;
    	new_sprite_go.transform.parent = transform;
    	new_sprite_go.transform.localPosition = Vector3(0, 0, 0);
    	new_sprite_go.transform.localPosition.z = sprite.zdepth;
    	return new_sprite_go;
   }
    

}

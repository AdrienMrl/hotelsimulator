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
    zdepth = -0.1;
  }
}
public class HumanSprite extends TileType {
  public function HumanSprite() {
    sprite = Resources.Load.<Sprite>("sprites/human_male");
    scale = 1;
    zdepth = -1;
  }
}
public class PlantSprite extends TileType {
  public function PlantSprite() {
    sprite = Resources.Load.<Sprite>("sprites/plant1");
    type = type.OBSTACLE;
    zdepth = -1;
  }
}
public class GrassSprite extends TileType {
  public function GrassSprite() {
  	sprite = Resources.Load.<Sprite>("sprites/pelouse");
  }
}

public class Tile extends hotelEntity {

  private var _gameEngine : gameEngine;
  var sprites = new List.<TileType>();
  private var speed : float = 0.6;
  
  private class Pathfinder {
	  var target : Tile;
	  var parent : Tile;
	  var pathfinding : AStar;
	  
	  function Pathfinder(parent : Tile, target : Tile) {
	  	this.target = target;
	  	this.parent = parent;
	  	pathfinding = new AStar(parent, target);
	  }
	  	
	  function updatePosition() {
	  
	  	var next_path = pathfinding.getNextPath();
	  	if (next_path == null)
	  		return false;
	  
   	    parent.transform.position = Vector3.MoveTowards(parent.transform.position,
   	      next_path.transform.position, parent.speed * Time.deltaTime);
   	    if (tile_engine.isTileCollision(parent, pathfinding.getNextPath())) {
   	    	parent.setTiledPos(next_path.tilePosX, next_path.tilePosY);
   	    	pathfinding.popPath();
   	    }
   	    return true;
	  }
  }
  
  private var pathfinder : Pathfinder;
  
  function Awake() {
    _gameEngine = GameObject.Find("GameEngine").GetComponent(gameEngine);
  }
  
  function moveTowards(target : Tile) {
  	this.pathfinder = new Pathfinder(this, target);
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

  function instantiateSprite(sprite : TileType) {
		var new_sprite_go : GameObject =
			Instantiate(Resources.Load.<GameObject>("sprite_prefab"));
    	new_sprite_go.GetComponent(SpriteRenderer).sprite = sprite.sprite;
    	new_sprite_go.transform.parent = transform;
    	new_sprite_go.transform.localPosition = Vector3(0, 0, 0);
    	new_sprite_go.transform.localPosition.z = sprite.zdepth;
    	return new_sprite_go;
   }
    
   function Update() {
     if (pathfinder != null) {
     	if (pathfinder.updatePosition() == false)
     		pathfinder = new Pathfinder(this, 
     		 TileData.getInstance().world.getTileClass(Random.Range(0, 20), Random.Range(0, 20)) as Tile);
     }
   }
}

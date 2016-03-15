#pragma strict

public class hotelEntity extends MonoBehaviour {

	public var tilePos : Vector2;
	public var sprite : HotelSprite;
	public var speed : float = 0.6;
	private var pathfinder : Tile.Pathfinder;

	static function spawn(x : int, y : int, what : GameObject) {
		var obj = Instantiate(what);
		obj.GetComponent.<hotelEntity>().setUpTiled(x, y);
	}
	
	function unplugFromTileEngine() {
	}
	
	function plugToTileEngine() {
		for (var i = 0; i < sprite.tilesize.x; i++) {
			for (var j = 0; j < sprite.tilesize.y; j++) {
				var tile = tile_engine.getTile(i + tilePos.x, j + tilePos.y);
				tile.parent = this;
			}
		}
	}
	
	function setUpTiled(px : int, py : int) {
	
		unplugFromTileEngine();
		tilePos = Vector2(px, py);
		plugToTileEngine();
    	recompute_pos();
	}
	
	function setSprite(hsprite : HotelSprite) {
		this.sprite = hsprite;
		GetComponent.<SpriteRenderer>().sprite = hsprite.sprite;
	}

  protected function rescale(factor : float) {
    transform.localScale.x = factor;
    transform.localScale.y = factor;
  }

  static function getTileSize() {
    var sprite : Sprite = Resources.Load.<Sprite>("sprites/carrelage");

    return sprite.bounds.size.x;
  }
  
  public function getTiledPos() {
  	return Vector2(transform.position.x / getTileSize(), transform.position.y / getTileSize());
  }

  function move(x : float, y : float, z : float) {
    transform.position.x = x;
    transform.position.y = y;
    transform.position.z = z;
    
    //transform.position.z = y / 10f;
  }
 
  function move(x : float, y : float) {
    transform.position.x = x;
    transform.position.y = y;
    transform.position.z = y / 10f + sprite.zdepth;
  } 
  
  function move(where : Vector3) {
    //transform.position = where;
  	move(where.x, where.y, where.z);
  }
  
  public function getSpriteOffset() {
  	return Vector2(sprite.sprite.bounds.size.x - getTileSize(),
  		sprite.sprite.bounds.size.y - getTileSize());
  }
  
  protected function recompute_pos() {
    var TILE_SIZE : float = getTileSize();
    
	transform.position = tile_engine.worldPosFromTilePos(tilePos, sprite.sprite);
  }

  function getTile() : Tile {
	var tilePos : Vector2 = getTiledPos();
	return TileData.getInstance().world.getTileClass(tilePos.x, tilePos.y);
  }

 
  function moveTowards(target : Tile) {
  	this.pathfinder = new Tile.Pathfinder(this, target);
  }
  	
	function say(text : String) {
		var text_object = Instantiate(gameEngine.getInstance().text_bubble_prefab);
		text_object.transform.parent = transform;
		text_object.transform.position = transform.position;
		text_object.transform.position.z -= 1;
		
		var sprite_bounds = GetComponent.<SpriteRenderer>().sprite.bounds;
		
		text_object.transform.position.y += sprite_bounds.size.y;
		text_object.transform.position.x -= sprite_bounds.extents.x * 1.5;
		text_object.GetComponent.<TextMesh>().text = text;
	}
  
  
  
  function Update() {
    if (pathfinder != null) {
      if (pathfinder.updatePosition() == false) {
    	pathfinder = new Tile.Pathfinder(this, 
        TileData.getInstance().world.getTileClass(Random.Range(0, 20), Random.Range(0, 20)) as Tile);
    	gameEngine.getInstance().earnMoney(Random.Range(-100, 100), this.gameObject);
    	say("Thank you!");
      }
    }
  }
}

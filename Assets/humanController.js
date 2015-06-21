#pragma strict

// considere using inheritance instead
public class humanController extends MonoBehaviour {

	private var _hotelEntity : hotelEntity;

	function Start() {
		_hotelEntity = GetComponent(hotelEntity);
		_hotelEntity.setSprite(new HumanSprite());
		_hotelEntity.setUpTiled(3, 3);
		_hotelEntity.moveTowards(TileData.getInstance().world.getTileClass(3, 3) as Tile);
	}

}

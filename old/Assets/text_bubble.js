#pragma strict

function Start () {
	var background = Instantiate(gameEngine.getInstance().background_prefab);
	background.transform.position = transform.position;
	background.transform.parent = transform;
	background.transform.position.z += 0.1;
	
	var text_bounds = GetComponent.<TextMesh>().GetComponent.<Renderer>().bounds;
	var background_bounds = background.GetComponent.<SpriteRenderer>().sprite.bounds;
	
	background.transform.localScale.x = text_bounds.size.x / background_bounds.size.x;
	background.transform.localScale.y = text_bounds.size.y / background_bounds.size.y;
	
	background.transform.position.x += text_bounds.extents.x;
	background.transform.position.y -= text_bounds.extents.y;
	
	// because the text shader scale is 0.1
	background.transform.localScale *= 10;
	
	Destroy(gameObject, 2);
}

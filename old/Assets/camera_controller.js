#pragma strict

private var cam : Camera;
private final var CAMERASPEED = 3;
private var worldBounds : Vector2[] = new Vector2[4];
private var cameraBounds : Vector2[] = new Vector2[4];

function Start () {
	cam = GetComponent(Camera);
	worldBounds = TileData.getInstance().world.getWorldBounds();
    cameraBounds = getCamBounds(cam.orthographicSize, transform.position);
}

function getCamBounds(zoom : float, cpos : Vector3) {
		
	var vertExtend = zoom;
	var horzExtend = vertExtend * Screen.width / Screen.height;
	
	var res_cameraBounds = [
		Vector2(cpos.x - horzExtend, cpos.y + vertExtend),
		Vector2(cpos.x + horzExtend, cpos.y + vertExtend),
		Vector2(cpos.x - horzExtend, cpos.y - vertExtend),
		Vector2(cpos.x + horzExtend, cpos.y - vertExtend)
	];
	return res_cameraBounds;
}

function isCameraInBounds(cam_bounds : Vector2[]) {

	return cam_bounds[0].x > worldBounds[0].x &&
	       cam_bounds[0].y < worldBounds[0].y &&
	       cam_bounds[3].x < worldBounds[3].x &&
	       cam_bounds[3].y > worldBounds[3].y;
}

function showBounds(bounds : Vector2[]) {
	for (var e:Vector2 in bounds) {
		print(e);
	}
}

function Update () {
	
	var next_bounds : Vector2[];
	
	var future_zoom = cam.orthographicSize *
		(1 + -Input.GetAxis("Mouse ScrollWheel") * Time.deltaTime * 100);

	var nextPosition = transform.position;
	if (Input.GetKey(KeyCode.LeftArrow))
		nextPosition.x -= Time.deltaTime * CAMERASPEED;
	if (Input.GetKey(KeyCode.DownArrow))
		nextPosition.y -= Time.deltaTime * CAMERASPEED;
	if (Input.GetKey(KeyCode.RightArrow))
		nextPosition.x += Time.deltaTime * CAMERASPEED;
	if (Input.GetKey(KeyCode.UpArrow))
		nextPosition.y += Time.deltaTime * CAMERASPEED;
		
	if (future_zoom != cam.orthographicSize || nextPosition != transform.position) {
		next_bounds = getCamBounds(future_zoom, nextPosition);

		// the camera must not go out of the world	
		if (isCameraInBounds(next_bounds)) {
			if (future_zoom > 0.1)
				cam.orthographicSize = future_zoom;
			transform.position = nextPosition;
			cameraBounds = next_bounds;
		}
	}	
}
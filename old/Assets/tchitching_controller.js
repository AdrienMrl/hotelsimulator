#pragma strict

private var wave_speed : float = 7;
private var wave_amplitude : float = 0.04;
private var elapsed : float = 0;
private var basex : float;
private var fade_out_speed : float = 1;
private var mesh : TextMesh;

function setValue(val : int) {

	mesh = GetComponent.<TextMesh>();
	basex = transform.position.x;

	if (val > 0) {
		mesh.font.material.color.r = 0;
		mesh.font.material.color.g = 0.2;
		mesh.font.material.color.b = 0;
	}
	if (val < 0) {
		mesh.font.material.color.r = 0.2;
		mesh.font.material.color.g = 0;
		mesh.font.material.color.b = 0;
	}
	mesh.text = val + "$";
}

function Update () {

	elapsed += Time.deltaTime;
	transform.position.x = basex + Mathf.Sin(elapsed * wave_speed) * wave_amplitude;
	transform.position.y += Time.deltaTime * wave_speed / 100;
	if (mesh != null && elapsed > 1.3) {
		mesh.color.a -= Time.deltaTime * fade_out_speed;
		if (mesh.color.a <= 0)
			Destroy(gameObject);
	}
	if (elapsed > 5) {
		Destroy(gameObject);
	}
}
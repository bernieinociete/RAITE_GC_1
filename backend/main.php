<?php 
	require_once("./config/Config.php");

	$db = new Connection();
	$pdo = $db->connect();
	$gm = new GlobalMethods($pdo);
	$auth = new Auth($pdo);
	$post = new Post($pdo);
	$get = new Get($pdo);

	if (isset($_REQUEST['request'])) {
		$req = explode('/', rtrim(($_REQUEST['request']), '/'));
	} else {
		$req = array("errorcatcher");
	}

	switch($_SERVER['REQUEST_METHOD']) {
		case 'POST':
			switch($req[0]) {
				// AUTH
				case 'login':
					$d = json_decode(file_get_contents("php://input"));
					echo json_encode($auth->login($d));
				break;

				case 'register':
					$d = json_decode(file_get_contents("php://input"));
					echo json_encode($auth->register($d));
				break;
				// AUTH

				// CART
				case 'addToCart':
					$d = json_decode(file_get_contents("php://input"));
					echo json_encode($gm->insert('tbl_cart', $d));
				break;

				case 'addQuantity':
					$d = json_decode(file_get_contents("php://input"));
					echo json_encode($gm->update('tbl_cart', $d, "cart_id = $req[1]"));
				break;

				case 'subtractQuantity':
					$d = json_decode(file_get_contents("php://input"));
					echo json_encode($gm->update('tbl_cart', $d, "cart_id = $req[1]"));
				break;
				// CART

				// ORDER
				case 'placeOrder':
					$d = json_decode(file_get_contents("php://input"));
					echo json_encode($post->placeOrder($d));
				break;
				// ORDER

				default:
					http_response_code(400);
					echo "Invalid Route";
				break;
			}
		break;

		case 'GET':
			switch ($req[0]) {
				// USER 
				case 'user':
					if(count($req)>1){
						echo json_encode($gm->exec_query($req[0], $req[1]));
					} else {
						echo json_encode($gm->exec_query($req[0], null));
					}
				break;
				// USER

				// PRODUCT 
				case 'product':
					if(count($req)>1){
						echo json_encode($gm->exec_query($req[0], $req[1]));
					} else {
						echo json_encode($gm->exec_query($req[0], null));
					}
				break;
				// PRODUCT

				default:
				http_response_code(400);
				echo "Bad Request";
				break;
			}
			break;

		default:
			http_response_code(403);
			echo "Please contact the Systems Administrator";
		break;
	}
?>
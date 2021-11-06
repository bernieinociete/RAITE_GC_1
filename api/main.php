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
				// USERS
				case 'user':
					if(count($req)>1){
						echo json_encode($get->user($req[1]));
					} else {
						echo json_encode($get->user(null));
					}
				break;
				// USERS

				// SHIP SPEED
				case 'ship_speed':
					if(count($req)>1){
						echo json_encode($gm->exec_query($req[0], $req[1]));
					} else {
						echo json_encode($gm->exec_query($req[0], null));
					}
				break;
				// SHIP SPEED

				// SHIP
				case 'ship':
					if(count($req)>1){
						echo json_encode($gm->exec_query($req[0], $req[1]));
					} else {
						echo json_encode($gm->exec_query($req[0], null));
					}
				break;
				
				case 'addShip':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($gm->insert('tbl_ship', $d));
				break;

				case 'updateShip':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($gm->update("tbl_ship", $d, "ship_id=$req[1]"));
				break;
				// SHIP

				// CREW
				case 'crew':
					if(count($req)>1){
						echo json_encode($gm->exec_query($req[0], $req[1]));
					} else {
						echo json_encode($gm->exec_query($req[0], null));
					}
				break;

				case 'addCrew':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					$crew_contract = [];
					foreach($_FILES['crew_contract']['name'] as $key => $value){
						
						$file = $_FILES['crew_contract']['name'][$key];
						$extension = pathinfo($file, PATHINFO_EXTENSION);

						$new_date_time = date_create();
						$date_time_format = $new_date_time->format('Y-m-d H:i:s');
						$filename = str_replace(str_split('- :'), '', $date_time_format);
						$new_file_name = "$filename$key.$extension";

						$destination = "uploads/" . $new_file_name;
						$file_tmp_name = $_FILES['crew_contract']['tmp_name'];
						$file_path = "http://localhost/RAITE_GC_Team1/api/$destination";
						array_push($crew_contract, $file_path);
						
						move_uploaded_file($_FILES['crew_contract']['tmp_name'][$key],$destination);
					}
					$d = [		
						'crew_fname' => $_POST['crew_fname'],
						'crew_mname' => $_POST['crew_mname'],
						'crew_lname' => $_POST['crew_lname'],
						'crew_contract' => $crew_contract[0],
						'rank_id' => $_POST['rank_id'],
					];

					echo json_encode($gm->insert('tbl_crew', $d));
				break;

				case 'updateCrew':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($gm->update("tbl_crew", $d, "crew_id=$req[1]"));
				break;
				// CREW

				// RANK
				case 'rank':
					if(count($req)>1){
						echo json_encode($gm->exec_query($req[0], $req[1]));
					} else {
						echo json_encode($gm->exec_query($req[0], null));
					}
				break;
				// RANK

				// TRANSACTION
				case 'addTransaction':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($gm->insert('tbl_transaction', $d));
				break;

				case 'login':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->login($d));
				break;

				default:
					http_response_code(400);
					echo "Invalid Route";
				break;
			}
		break;

		case 'GET':
			switch ($req[0]) {
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
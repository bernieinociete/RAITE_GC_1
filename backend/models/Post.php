<?php
    class Post{
        protected $pdo;

        public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
		}

		public function placeOrder($data) {
			$this->sql = "INSERT INTO tbl_order (user_id, order_total, order_grandtotal, order_shipping)
			VALUES ($data->user_id, $data->order_total, $data->order_grandtotal, $data->order_shipping)";

			try{
				if($this->pdo->query($this->sql)) {
					$id = $this->pdo->lastInsertId();

					$product_id = [];
					$order_id = [];
					$order_item_quantity = [];
					$value = [];

					for($i = 0; i < sizeof($data->product_id); $i++) {
						$product_id[] = $data->product_id[$i];
						$order_id[] = $id;
						$order_item_quantity[] = $data->order_item_quantity[$i];
						$value[] = "($product_id[$i], $order_id[$i], $order_item_quantity[$i])";
					}

					return implode(', ', $value);
				}

				return array("code"=>200, "remarks"=>"success");
			} catch (\PDOException $e) {
				$errmsg = $e->getMessage();
				$code = 403;
			}
			return $this->sendPayload($data, $remarks, $msg, $code);
		}

        public function sendPayload($payload, $remarks, $message, $code) {
			$status = array("remarks"=>$remarks, "message"=>$message);
			http_response_code($code);
			return array(
				"status"=>$status,
				"payload"=>$payload,
				'prepared_by'=>'Bernie L. Inociete Jr., Developer',
				"timestamp"=>date_create());
		} 
    }
?>
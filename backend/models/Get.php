<?php  
	class Get {
		protected $pdo;

		public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
		}

		public function user($filter_data) {

			$this->sql = "SELECT * FROM tbl_user";

            if($filter_data == null) {
                $this->sql .= " WHERE user_role = 1 ORDER BY user_createdAt DESC";
            } else {
                $this->sql .= " WHERE user_role = 1 AND user_id = $filter_data ORDER BY user_createdAt DESC";
            }
			$data = array(); $code = 0; $msg= ""; $remarks = "";
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) { array_push($data, $rec);}
					$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
				}
			} catch (\PDOException $e) {
				$msg = $e->getMessage(); $code = 401; $remarks = "failed";
			}
			return $this->sendPayload($data, $remarks, $msg, $code);
		}

        public function product($filter_data) {

			$this->sql = "SELECT * FROM tbl_product";

            if($filter_data == null) {
                $this->sql .= "  LEFT JOIN tbl_user ON tbl_user.user_id = tbl_product.user_id 
                LEFT JOIN tbl_category ON tbl_category.category_id = tbl_product.category_id
                LEFT JOIN tbl_subcategory ON tbl_subcategory.subcategory_id = tbl_product.subcategory_id
                WHERE tbl_product.product_status=1 AND tbl_product.product_qty > 0 ORDER BY product_createdAt DESC";
            } else {
                $this->sql .= " LEFT JOIN tbl_user ON tbl_user.user_id = tbl_product.user_id 
                LEFT JOIN tbl_category ON tbl_category.category_id = tbl_product.category_id
                LEFT JOIN tbl_subcategory ON tbl_subcategory.subcategory_id = tbl_product.subcategory_id
                WHERE tbl_product.product_status=1 AND tbl_product.product_qty > 0 AND tbl_user.user_id = $filter_data ORDER BY product_createdAt DESC";
            }

			$data = array(); $code = 0; $msg= ""; $remarks = "";
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) { array_push($data, $rec);}
					$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
				}
			} catch (\PDOException $e) {
				$msg = $e->getMessage(); $code = 401; $remarks = "failed";
			}
			return $this->sendPayload($data, $remarks, $msg, $code);
		}

        public function order($filter_data) {

			$this->sql = "SELECT * FROM tbl_orders LEFT JOIN tbl_user ON tbl_user.user_id = tbl_orders.user_id";

            if($filter_data == null) {
                $this->sql .= " WHERE order_status = 3 ORDER BY order_created_at DESC";
            } else {
                $this->sql .= " WHERE order_status = 3 AND order_id = $filter_data ORDER BY order_created_at DESC";
            }
			$data = array(); $code = 0; $msg= ""; $remarks = "";
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) { array_push($data, $rec);}
					$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
				}
			} catch (\PDOException $e) {
				$msg = $e->getMessage(); $code = 401; $remarks = "failed";
			}
			return $this->sendPayload($data, $remarks, $msg, $code);
		}

		public function sellerRating($filter_data) {

			$this->sql = "SELECT * FROM tbl_rating
				INNER JOIN tbl_product ON tbl_product.product_id = tbl_rating.product_id
				LEFT JOIN tbl_user ON tbl_user.user_id = tbl_product.user_id";

			if($filter_data != null) {
				$this->sql .= " WHERE tbl_product.user_id=$filter_data";
			}

			$data = array(); $code = 0; $msg= ""; $remarks = "";
			try {
				if ($res = $this->pdo->query($this->sql)->fetchAll()) {
					foreach ($res as $rec) { array_push($data, $rec);}
					$res = null; $code = 200; $msg = "Successfully retrieved the requested records"; $remarks = "success";
				}
			} catch (\PDOException $e) {
				$msg = $e->getMessage(); $code = 401; $remarks = "failed";
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
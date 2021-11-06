<?php
    class Post{
        protected $pdo;

        public function __construct(\PDO $pdo) {
			$this->pdo = $pdo;
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
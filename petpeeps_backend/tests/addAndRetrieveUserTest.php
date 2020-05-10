<?php
use PHPUnit\Framework\TestCase;
require('controller/controller.php');

final class AddAndRetrieveUserTest extends TestCase {
	private	$createdAccounts = [];

	public function test_can_add_a_user_and_retrieve_the_added_user() {
		
		//Arrange
		$login = 'login';
		$email = 'email@gmail.com';
		$uid = 'uid';

		//Act
		//Create user
		$this->createUser($login, $email, $uid);
		
		//Retrieve added user info
		getUserInfo($uid);
		$retrievedOutput = $this->getActualOutput();
		
		$regexOutput = '/\{(?=.*user_type)(?=.*login).*\}/';
		
		$retrievedUserInfo = array();
		preg_match($regexOutput, $retrievedOutput, $retrievedUserInfo);

		$retrievedUserInfoObj = json_decode($retrievedUserInfo[0]);

		$retrievedLogin = $retrievedUserInfoObj->login;

		//Assert
		$this->assertEquals(
			$login, $retrievedLogin
		);
	}

	private function createUser($login, $email, $uid) {
		createUser($login, $email, $uid);
	  array_push($this->createdAccounts, $uid);
	}

	protected function tearDown(): void {
		//After each test, delete all created accounts from the db 
		foreach ($this->createdAccounts as $uid) {
			removeAccount($uid);
		}
	}
}

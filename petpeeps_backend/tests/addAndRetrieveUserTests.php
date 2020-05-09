<?php
use PHPUnit\Framework\TestCase;
require('../controller/controller.php');

final class AddAndRetrieveUserTests extends TestCase {
	
	public function can_add_a_user_and_retrieve_the_added_user() {
		
		//Arrange
		$login = 'login';
		$email = 'email@gmail.com';
		$uid = 'uid';

		//Act
		//Create user
		createUser($login, $email, $uid);

		//Retrieve added user info
		$userInfo = getUserInfo($uid);

		//Assert
		//verify the user details
		$this->assertStringContainsStringIgnoringCase(
			$login
			, $userInfo->login
		);

		//Delete user
		removeAccount($uid);
	}
}

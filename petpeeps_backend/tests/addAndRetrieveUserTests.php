<?php
use PHPUnit\Framework\TestCase;
require('../controller/controller.php');

final class AddAndRetrieveUserTests extends TestCase {
	
	public function can_add_a_user_and_retrieve_the_added_user() {
		
		//user info
		//....James
		//..Sam

		//create user
		create_user('James');
		create_user('Sam');

		//retrieve added user
		$user = retrieveUser('Sam');

		//verify the user details
		//$user != null
		//$user->name == $expectedUserName

		//delete user
	}
}

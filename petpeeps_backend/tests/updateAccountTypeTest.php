<?php
use PHPUnit\Framework\TestCase;
require_once('controller/controller.php');

final class UpdateAccountTypeTest extends TestCase {
	private	$createdAccounts = [];

	public function test_can_update_account_type() {
		
		$login = 'login';
		$email = 'email@gmail.com';
		$uid = 'uid';
		$accountType = 'personal';

		$this->createUser($login, $email, $uid);
		
		updateAccountType($accountType, $uid);

		getUserInfo($uid);

		$retrievedOutput = $this->getActualOutput();
		
		$regexOutput = '/\{(?=.*user_type)(?=.*login).*\}/';
		
		$retrievedUserInfo = array();
		preg_match($regexOutput, $retrievedOutput, $retrievedUserInfo);
		$retrievedUserInfoObj = json_decode($retrievedUserInfo[0]);
		$retrievedAccountType = $retrievedUserInfoObj->user_type;

		$this->assertEquals(
			$accountType, $retrievedAccountType
		);
	}

	private function createUser($login, $email, $uid) {
	  createUser($login, $email, $uid);
	  array_push($this->createdAccounts, $uid);
	}

	protected function tearDown(): void {
		foreach ($this->createdAccounts as $uid) {
			removeAccount($uid);
		}
	}
}

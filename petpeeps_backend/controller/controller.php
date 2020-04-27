<?php
    require_once("./model/MemberManager.php");

    function getUserInfo($uid) {
        $userInfoManager = new MemberManager();
        $userInfo = $userInfoManager->getUserInfo($uid);
        //getMember confirms userId, password is checked below
        if($userInfo){
            echo json_encode($userInfo);
        } else {
            $err = array('this user doesn\'t exist in our db');
            echo json_encode($err);
        }
    }

    function updateAccountType($accountType,$uid) { 
        $accountChanger = new MemberManager();
        $accTypeChanged = $accountChanger->editMember($accountType,$uid);
        if($accTypeChanged){
            echo json_encode($accTypeChanged);
        } else {
            $err = array('this user doesn\'t exist in our db');
            echo json_encode($err);
        }

    }

    function createUser($login,$email,$uid) { 
        $accountWomb = new MemberManager();
        $accBirth = $accountWomb->addMember($login,$email,$uid);
        if($accBirth){
            echo json_encode($accBirth);
        } else {
            $err = array('our backend failed to make a user');
            echo json_encode($err);
        }

    }

    function removeAccount($uid) { 
        $accountTomb = new MemberManager();
        $accDeath = $accountTomb->deleteProfile($uid);
        if($accDeath){
            echo json_encode($accDeath);
        } else {
            $err = array('our backend failed to remove a user');
            echo json_encode($err);
        }

    }
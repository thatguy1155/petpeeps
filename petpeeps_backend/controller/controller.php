<?php
    require_once("./model/MemberManager.php");

    function getUserInfo($uid) {
        $userInfoManager = new MemberManager();
        $errors = array(
            "context" => "signIn"
        );
       
        $userInfo = $userInfoManager->getUserInfo($uid);
        //getMember confirms userId, password is checked below
        if($userInfo){
            echo json_encode($userInfo);
        } else {
            $err = array('this user doesn\'t exist in our db');
            echo json_encode($err);
        }

    }
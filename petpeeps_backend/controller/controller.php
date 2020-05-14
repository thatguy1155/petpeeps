<?php

    require_once("./model/MemberManager.php");
    require_once("./model/PetManager.php");
    require_once("./model/BizManager.php");

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
        $accountCreator = new MemberManager();
        $accBirth = $accountCreator->addMember($login,$email,$uid);
        if($accBirth){
            echo json_encode($accBirth);
        } else {
            $err = array('our backend failed to make a user');
            echo json_encode($err);
        }

    }

    function removeAccount($uid) { 
        $accountDestroyer = new MemberManager();
        $accDeath = $accountDestroyer->deleteProfile($uid);
        if($accDeath){
            echo json_encode($accDeath);
        } else {
            $err = array('our backend failed to remove a user');
            echo json_encode($err);
        }

    }


    function getPets($owner_id) {
        $getPetManager = new PetManager();
        $petsReceived = $getPetManager->getPets($owner_id);
        if($petsReceived){
            echo json_encode($petsReceived);
        } else {
            $err = array('we couldn\'t retrieve your pets');
            echo json_encode($err);
        }

    }

    function createPet($owner_id,$name,$breed,$size) {
        $makePetManager = new PetManager();
        $petMade = $makePetManager->addPet($owner_id,$name,$breed,$size);
        if($petMade){
            echo json_encode($petMade);
        } else {
            $err = array('we couldn\'t create an account for your pet');
            echo json_encode($err);
        }
    }

    function createBiz($user_id,$bizName,$bizType,$bizHrs,$bizAddr,$bizTel,$bizSite,$socialMediaArr,$menuArray) {
        $bizManager = new BizManager();

        $bizMade = $bizManager->addBiz($user_id,$bizName,$bizType,$bizHrs,$bizAddr,$bizTel,$bizSite);
        $bizId = $bizManager->getBizId($user_id);

        for ($i=0; $i<count($socialMediaArr); $i++) {
            $socialMediaDb = $bizManager->addBizSocMedia($bizId['id'], $socialMediaArr[$i]['media'], $socialMediaArr[$i]['link']);
        }

        for ($i=0; $i<count($menuArray); $i++) {
            $menuDb = $bizManager->addBizMenu($bizId['id'], $menuArray[$i]['name'], $menuArray[$i]['price'], $menuArray[$i]['calories']);
        }

        if($bizInfo){
            echo json_encode($bizInfo);
        } else {
            $err = array('we couldn\'t create an account for your business');
            echo json_encode($err);
        }
    }

    function editPet($name,$breed,$size,$pet_id) {
        $editPetManager = new PetManager();
        $petChanged = $editPetManager->editPet($name,$breed,$size,$pet_id);
        if($petChanged){
            echo json_encode($petChanged);
        } else {
            $err = array('we couldn\'t update your pet\'s information');
            echo json_encode($err);
        }

    }

    function updatePetPic($pet_id,$url) {
        $petPicManager = new PetManager();
        $petPicChanged = $petPicManager->updatePetPic($pet_id,$url);
        if($petPicChanged){
            echo json_encode($petPicChanged);
        } else {
            $err = array('we couldn\'t update your pet pic');
            echo json_encode($err);
        }

    }

    function updateProfilePic($id,$url) {     
        $profilePicManager = new MemberManager();
        $profilePicChanged = $profilePicManager->updateProfilePic($id,$url);
        if($profilePicChanged){
            echo json_encode($profilePicChanged);
        } else {
            $err = array('we couldn\'t update your pet pic');
            echo json_encode($err);
        }

    }

    function getPetPicLink($id) {
        $picLinkManager = new PetManager();
        $petPicLink = $picLinkManager->getPetLink($id);
        return $petPicLink;

    }

    function getProfilePicLink($id) {
        $picLinkManager = new MemberManager();
        $profilePicLink = $picLinkManager->getPicLink($id);
        return $profilePicLink;

    }
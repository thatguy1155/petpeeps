<?php

    require_once("./model/MemberManager.php");
    require_once("./model/PetManager.php");

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
            $err = array('we couldn\'t retrieve your pets');
            echo json_encode($err);
        }

    }

    function editPet($name,$breed,$size,$pet_id) {
        $editPetManager = new PetManager();
        $petChanged = $editPetManager->editPet($name,$breed,$size,$pet_id);
        if($petChanged){
            echo json_encode($petChanged);
        } else {
            $err = array('we couldn\'t retrieve your pets');
            echo json_encode($err);
        }

    }

    function deletePet($name,$breed,$size,$pet_id) {
        $deletePetManager = new PetManager();
        $petChanged = $deletePetManager->deletePet($name,$breed,$size,$pet_id);
        if($petChanged){
            echo json_encode($petChanged);
        } else {
            $err = array('we couldn\'t delete your pets');
            echo json_encode($err);
        }

    }
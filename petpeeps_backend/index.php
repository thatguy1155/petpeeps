<?php

require("./controller/controller.php");
try {
    $action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';
    $uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '';
    //so if you're trying to upload any file to the backend, you need to use
    //a new superglobal variable $_FILES that works like $_REQUEST only it looks for files
    //it sends an array of info along with the file including the file name, type etc.,
    //here we're designating $filename as the name of the file which we designated as 'file' back in the frontend
    $filename = isset($_FILES['file']['name']) ? $_FILES['file']['name'] : '';
    

    
    if (isset($_REQUEST['action'])) {
        if ($action === 'getUserInfo') {
            getUserInfo($uid); 
        } else if ($action === 'updateAccountType') {
            $accountType = isset($_REQUEST['accType']) ? $_REQUEST['accType'] : '';
            updateAccountType($accountType,$uid);
        } else if ($action === 'createUser') {
            $login = isset($_REQUEST['login']) ? $_REQUEST['login'] : '';
            $email= isset($_REQUEST['email']) ? $_REQUEST['email'] : '';
            createUser($login,$email,$uid);
        } else if ($action === 'removeAccount') {
            removeAccount($uid);
        } else if ($action === 'makeDirectory') {
            //function to make the directory
            $name = isset($_REQUEST['name']) ? $_REQUEST['name'] : '';
            $name = htmlspecialchars($name);
            if (!file_exists('./uploads/'.$name)) {
                mkdir('./uploads/'.$name, 0777, true);
                echo 'directory created';
            } else {
                echo 'directory exists';
            }
        } else if ($action === 'getPets') {
            $owner_id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
            getPets($owner_id);
        } else if ($action === 'createPet') {
            $owner_id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
            $name = isset($_REQUEST['name']) ? $_REQUEST['name'] : '';
            $breed = isset($_REQUEST['breed']) ? $_REQUEST['breed'] : '';
            $size = isset($_REQUEST['size']) ? $_REQUEST['size'] : '';
            createPet($owner_id,$name,$breed,$size);
        }
        else if ($action === 'editPet') {
            $pet_id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
            $name = isset($_REQUEST['name']) ? $_REQUEST['name'] : '';
            $breed = isset($_REQUEST['breed']) ? $_REQUEST['breed'] : '';
            $size = isset($_REQUEST['size']) ? $_REQUEST['size'] : '';
            editPet($name,$breed,$size,$pet_id);
        } 
        else if ($action === 'deletePet') {
            $pet_id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
            editPet($pet_id);
        } 
        else if ($action === 'updatePetPicInDB') {
            $pet_id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
            $url = isset($_REQUEST['url']) ? $_REQUEST['url'] : '';
            updatePetPic($pet_id,$url);
        }
        else if ($action === 'updateProfilePicInDB') {
            $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
            $url = isset($_REQUEST['url']) ? $_REQUEST['url'] : '';
            echo $id;
            updateProfilePic($id,$url);
        }
        else if ($action === 'deleteOldPetPic') {
            $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
            $link = getPetPicLink($id);
            $newLink = str_replace("http://dogpeeps",'.',$link['picURL']); //since we're doing this locally instead of via a server, replace the server url w relative path
            unlink($newLink);
            echo 'deleted:' .$link['picURL'];
        }
        else if ($action === 'deleteOldProfilePic') {
            $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
            $link = getProfilePicLink($id);
            $newLink = str_replace("http://dogpeeps",'.',$link['profile_pic']); //since we're doing this locally instead of via a server, replace the server url w relative path
            unlink($newLink);
            echo 'deleted:' .$link['picURL'];
        }
        //if there's a set filename, hence a file submitted...
    } else if (isset($filename)) {
        //username was appended to form data seperately from the file so it comes to us via $_request
        $name = isset($_REQUEST['username']) ? $_REQUEST['username'] : '';
        //we use $name here to direct us to the eponymous directory inside the uploads folder
        $uploaddir = './uploads/' .$name .'/';
        $uploadfile = $uploaddir . basename($filename);

        // Valid file extensions
        $valid_extensions = array("jpg","jpeg","png","pdf");

        // File extension
        $extension = pathinfo($filename, PATHINFO_EXTENSION);

        // Check extension
        if(in_array(strtolower($extension),$valid_extensions) ) {

            // Upload file

            //to get this to work:
            //-- go to the http-vhosts.conf and inside the directory tag for dogpeeps add the line:
            //****php_admin_value upload_tmp_dir /absolute/path/to/your/petpeeps_backend/tmp***
            //^when files are uploaded, they're first moved to a temp file in the server
            //they are then moved from there to the designated uploads folder.
            //the above line redirects it to a new temp file in the same server instead of the defailt one in apache

            //if you still have errors:
            //and go to the terminal to petpeeps_backend and chmod 777 tmp and chmod 777 uploads
            //probably not the best solution but it go everything to work. Here's hope no one is tryig to hack people's dog pics
            
            //this statement moves the files from our temp directory to the new directory in the uploads folder
            if(move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)){
                echo $filename;
            }else{
                echo "loading error";
            }
        }else{
        echo 0;
        }   
    }
}
    catch(PDOException $e) {
        $PDOArray = [];
        $msg = $e->getMessage();
        $code = $e->getCode();
        $line = $e->getLine();
        $file = $e->getFile();
        array_push($PDOArray, $msg, $code, $line, $file);
        print_r($PDOArray);
    }
    catch(Exception $e) {
        $ExceptionArray = [];
        $msg = $e->getMessage();
        $code = $e->getCode();
        $line = $e->getLine();
        $file = $e->getFile();
        array_push($ExceptionArray, $msg, $code, $line, $file);
        print_r($ExceptionArray);
    }

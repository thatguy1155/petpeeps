<?php
require("./controller/controller.php");
try {
    $action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';
    
    if (isset($_REQUEST['action'])) {
        if ($action === 'getUserInfo') {
            $uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '';
            getUserInfo($uid); 
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

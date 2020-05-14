<?php   
require_once('model/Manager.php');


    
class BizManager extends Manager {

  function __construct() {
    parent::__construct();
  }

  public function addBiz($owner_id,$bizName,$bizType,$bizHrs,$bizAddr,$bizTel,$bizSite,$socialMediaArr,$menu) {
    $name = htmlspecialchars($bizName);
    $type = htmlspecialchars($bizType);
    $bizHrs = htmlspecialchars($bizHrs);
    $addr = htmlspecialchars($bizAddr);
    $tel = htmlspecialchars($bizTel);
    $webSite = htmlspecialchars($bizSite);
    $addPet = $this->_db->prepare("INSERT INTO pet(name, size, breed, owner_id) VALUES(:name, :size, :breed, :owner_id)");
    $addPet->bindParam(':name',$name,PDO::PARAM_STR);
    $addPet->bindParam(':size',$type,PDO::PARAM_STR);
    $addPet->bindParam(':biz_hrs',$bizHrs,PDO::PARAM_STR);
    $addPet->bindParam(':address',$addr,PDO::PARAM_STR);
    $addPet->bindParam(':tel',$tel,PDO::PARAM_INT);
    $addPet->bindParam(':web_site',$webSite,PDO::PARAM_STR);
    $addPet->bindParam(':social_media',$socialMediaArr,PDO::PARAM_STR);////////////////////////////////
    $addPet->bindParam(':menu',$menu,PDO::PARAM_STR);/////////////////////////
    $addPet->bindParam(':owner_id',$owner_id,PDO::PARAM_INT);
    $status = $addPet->execute();
    if (!$status) {
        throw new PDOException('Impossible to add this pet!');
    }
    $addPet->closeCursor();
    return "pet created";  
  }
}
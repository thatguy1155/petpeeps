<?php   
require_once('model/Manager.php');


    
class BizManager extends Manager {

  function __construct() {
    parent::__construct();
  }

  public function getBizId($user_id) {
    $bizId = $this->_db->prepare("SELECT id FROM business WHERE user_id = :userId");
    $bizId->bindParam(':userId',$user_id,PDO::PARAM_STR);
    $res = $bizId->execute();
    if(!$res) {
        throw new PDOException('Impossible to get business ID!');
    }
    return $bizId->fetch(PDO::FETCH_ASSOC);
  }

  public function addBiz($user_id,$bizName,$bizType,$bizHrs,$bizAddr,$bizTel,$bizSite) {
    $name = htmlspecialchars($bizName);
    $type = htmlspecialchars($bizType);
    $bizHrs = htmlspecialchars($bizHrs);
    $city = htmlspecialchars($bizAddr['si']);
    $gu = htmlspecialchars($bizAddr['gu']);
    $dong = htmlspecialchars($bizAddr['dong']);
    $danji = htmlspecialchars($bizAddr['danji']);
    $tel = htmlspecialchars($bizTel);
    $webSite = htmlspecialchars($bizSite);

    $addBiz = $this->_db->prepare("INSERT INTO business(name, type, biz_hrs, webSite, tel, city, gu, dong, danji, user_id) VALUES(:name, :type, :biz_hrs, :web_site, :tel, :city, :gu, :dong, :danji, :user_id)");
    $addBiz->bindParam(':name',$name,PDO::PARAM_STR);
    $addBiz->bindParam(':type',$type,PDO::PARAM_STR);
    $addBiz->bindParam(':biz_hrs',$bizHrs,PDO::PARAM_STR);
    $addBiz->bindParam(':web_site',$webSite,PDO::PARAM_STR);
    $addBiz->bindParam(':tel',$tel,PDO::PARAM_STR);
    $addBiz->bindParam(':city',$city,PDO::PARAM_STR);
    $addBiz->bindParam(':gu',$gu,PDO::PARAM_STR);
    $addBiz->bindParam(':dong',$dong,PDO::PARAM_STR);
    $addBiz->bindParam(':danji',$danji,PDO::PARAM_STR);
    $addBiz->bindParam(':user_id',$user_id,PDO::PARAM_INT);
    $status = $addBiz->execute();
    if (!$status) {
      throw new PDOException('Impossible to add business!');
    }
    $addBiz->closeCursor();
    return "biz created";  
  }

  public function addBizSocMedia($bizId, $media, $link) {
    $bizId = htmlspecialchars($bizId);
    $media = htmlspecialchars($media);
    $link = htmlspecialchars($link);

    $addSocMed = $this->_db->prepare("INSERT INTO social_media (biz_id, platform, link) VALUES (:bizId, :media, :link)");
    $addSocMed->bindParam(':bizId',$bizId,PDO::PARAM_INT);
    $addSocMed->bindParam(':media',$media,PDO::PARAM_STR);
    $addSocMed->bindParam(':link',$link,PDO::PARAM_STR);
    $status = $addSocMed->execute();
    if (!$status) {
      throw new PDOException('Impossible to add social media!');
    }
    $addSocMed->closeCursor();
    return "social media was added to db";
  }

  public function addBizMenu($bizId, $menuItem, $price, $calories) {
    $bizId = htmlspecialchars($bizId);
    $menuItem = htmlspecialchars($menuItem);
    $price = htmlspecialchars($price);
    $calories = htmlspecialchars($calories);

    $addMenu = $this->_db->prepare("INSERT INTO menu(item, price, calories, biz_id) VALUES(:menuItem, :price, :calories, :bizId)");
    $addMenu->bindParam(':menuItem',$menuItem,PDO::PARAM_STR);
    $addMenu->bindParam(':price',$price,PDO::PARAM_INT);
    $addMenu->bindParam(':calories',$calories,PDO::PARAM_INT);
    $addMenu->bindParam(':bizId',$bizId,PDO::PARAM_INT);
    $status = $addMenu->execute();
    if (!$status) {
      throw new PDOException('Impossible to add menu!');
    }
    $addMenu->closeCursor();
    return "menu items were added to db";
  }

  public function getAllBiz($userId) {
    $biz = $this->_db->prepare("SELECT id, name, type, biz_hrs, website, tel, city, gu, dong, danji FROM business ");
    $biz->bindParam(':userId', $userId, PDO::PARAM_INT);
    $resp = $biz->execute();
    if(!$resp) {
      throw new PDOException('Unable to retrieve businesses from this user');
    }

    $allBiz = array();

    while ($bizRow = $biz->fetch()) {
      $bizSocialMedia = $this->getProfileBizSocMed($bizRow["id"]);
      $bizMenu = $this->getProfileBizMenu($bizRow["id"]);
      $bizRow["socialMediaArr"] = $bizSocialMedia;
      $bizRow["menu"] = $bizMenu;
      array_push($allBiz, $bizRow);
    };

    return $allBiz;
  }

  public function getProfileBizSocMed($bizId) {
    $bizSocMed = $this->_db->prepare('SELECT biz_id, platform, link FROM social_media WHERE biz_id = :bizId');
    $bizSocMed->bindParam(':bizId', $bizId, PDO::PARAM_INT);
    $resp = $bizSocMed->execute();
    if(!$resp) {
      throw new PDOException('Unable to retrieve social media from this business');
    }
    $bizSocMedItems = $bizSocMed->fetchAll();
    return $bizSocMedItems;        

  }

  public function getProfileBizMenu($bizId) {
    $bizMenu = $this->_db->prepare('SELECT item, price, calories, biz_id FROM menu WHERE biz_id = :bizId');
    $bizMenu->bindParam(':bizId', $bizId, PDO::PARAM_INT);
    $resp = $bizMenu->execute();
    if(!$resp) {
      throw new PDOException('Unable to retrieve businesses from this user');
    }
    $bizMenuItems = $bizMenu->fetchAll();
    return $bizMenuItems;        
  }
}

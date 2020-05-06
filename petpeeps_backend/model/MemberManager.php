<?php   
    require_once('model/Manager.php');


    
    class MemberManager extends Manager {

        function __construct() {
            parent::__construct();
        } 


        public function addMember($login,$email,$uid) {
            $email = htmlspecialchars($email);
            $login = htmlspecialchars($login);      
            $addMember = $this->_db->prepare("INSERT INTO user(login, email, uid) VALUES(:login, :email, :uid)");
            $addMember->bindParam(':login',$login,PDO::PARAM_STR);
            $addMember->bindParam(':email',$email,PDO::PARAM_STR);
            $addMember->bindParam(':uid',$uid,PDO::PARAM_STR);
            $status = $addMember->execute();
            if (!$status) {
                throw new PDOException('Impossible to add the member!');
            }
            $addMember->closeCursor();
            return "member created";  
        } 

        public function getUserInfo($uid) {
            $members = $this->_db->prepare("SELECT id, login, user_type, profile_pic FROM user WHERE uid = :uid");
            $members->bindParam(':uid',$uid,PDO::PARAM_STR);
            $resp = $members->execute();
            if(!$resp) {
                throw new PDOException('Invalid username or password!');
            }
            return $members->fetch();
        }

        public function getPicLink($id) {
            $pics = $this->_db->prepare("SELECT profile_pic FROM user WHERE id = :id");
            $pics->bindParam(':id',$id,PDO::PARAM_INT);
            $resp = $pics->execute();
            if(!$resp) {
                throw new PDOException('Invalid username or password!');
            }
            $picLink = $pics->fetch();
            return $picLink;
        }

        public function editMember($accountType,$uid) {    
            $editMember = $this->_db->prepare("UPDATE user SET user_type = :user_type WHERE uid = :uid");
            $editMember->bindParam(':user_type',$accountType,PDO::PARAM_STR);
            $editMember->bindParam(':uid',$uid,PDO::PARAM_STR);
            $status = $editMember->execute();
            if (!$status) {
                throw new PDOException('Impossible to edit profile!');
            }
            return "db updated";
            $editMember->closeCursor();  
        }

        public function deleteProfile($uid) {
            echo($uid);
            $member = $this->_db->prepare("DELETE FROM user WHERE uid = :uid");
            $member->bindParam(':uid',$uid,PDO::PARAM_STR);
            $resp = $member->execute();
            if(!$resp) {
                throw new PDOException('Oh Shit, You\'re Immortal!');
            }
            $member->closeCursor();
            return "member successfully removed";
        }

        public function updateProfilePic($id,$url){
            
            $editProfilePic = $this->_db->prepare("UPDATE user SET profile_pic = :profile_pic WHERE id = :id");
            $editProfilePic->bindParam(':id',$id,PDO::PARAM_INT);
            $editProfilePic->bindParam(':profile_pic',$url,PDO::PARAM_STR);
            $status = $editProfilePic->execute();
            if (!$status) {
                throw new PDOException('Impossible to update profile pic!');
            }
            return "db updated";
            $editProfilePic->closeCursor();  
        }
    }


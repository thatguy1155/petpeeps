<?php   
    require_once('model/Manager.php');


    
    class PetManager extends Manager {

        function __construct() {
            parent::__construct();
        } 


        public function addPet($owner_id,$name,$breed,$size) {
            $name = htmlspecialchars($name);
            $breed = htmlspecialchars($breed);      
            $addPet = $this->_db->prepare("INSERT INTO pet(name, size, breed, owner_id) VALUES(:name, :size, :breed, :owner_id)");
            $addPet->bindParam(':name',$name,PDO::PARAM_STR);
            $addPet->bindParam(':size',$size,PDO::PARAM_STR);
            $addPet->bindParam(':breed',$breed,PDO::PARAM_STR);
            $addPet->bindParam(':owner_id',$owner_id,PDO::PARAM_INT);
            $status = $addPet->execute();
            if (!$status) {
                throw new PDOException('Impossible to add this pet!');
            }
            $addPet->closeCursor();
            return "pet created";  
        } 

        public function getPets($owner_id) {
            $pets = $this->_db->prepare("SELECT id, name, size, breed FROM pet WHERE owner_id = :owner_id");
            $pets->bindParam(':owner_id',$owner_id,PDO::PARAM_INT);
            $resp = $pets->execute();
            if(!$resp) {
                throw new PDOException('Invalid username or password!');
            }
            $allPets = $pets->fetchAll();
            return $allPets;
        }

        public function editPet($name,$breed,$size,$pet_id) { 
            $name = htmlspecialchars($name);
            $breed = htmlspecialchars($breed);    
            $editPet = $this->_db->prepare("UPDATE pet SET name = :name, size = :size, breed = :breed WHERE id = :id");
            $editPet->bindParam(':name',$name,PDO::PARAM_STR);
            $editPet->bindParam(':size',$size,PDO::PARAM_STR);
            $editPet->bindParam(':breed',$breed,PDO::PARAM_STR);
            $editPet->bindParam(':id',$pet_id,PDO::PARAM_INT);
            $status = $editPet->execute();
            if (!$status) {
                throw new PDOException('Impossible to edit pet!');
            }
            return "db updated";
            $editPet->closeCursor();  
        }

        // public function deleteProfile($uid) {
        //     echo($uid);
        //     $member = $this->_db->prepare("DELETE FROM user WHERE uid = :uid");
        //     $member->bindParam(':uid',$uid,PDO::PARAM_STR);
        //     $resp = $member->execute();
        //     if(!$resp) {
        //         throw new PDOException('Oh Shit, You\'re Immortal!');
        //     }
        //     $member->closeCursor();
        //     return "member successfully removed";
        // }
    }


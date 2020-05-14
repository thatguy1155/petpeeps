<?php   
    require_once('model/Manager.php');


    
    class PetManager extends Manager {

        function __construct() {
            parent::__construct();
        } 


        public function addPet($owner_id,$name,$breed,$size,$age) {
            $name = htmlspecialchars($name);
            $breed = htmlspecialchars($breed);
            $age = htmlspecialchars($age);      
            $addPet = $this->_db->prepare("INSERT INTO pet(name, size, breed, age, owner_id) VALUES(:name, :size, :breed, :age, :owner_id)");
            $addPet->bindParam(':name',$name,PDO::PARAM_STR);
            $addPet->bindParam(':size',$size,PDO::PARAM_STR);
            $addPet->bindParam(':breed',$breed,PDO::PARAM_STR);
            $addPet->bindParam(':age',$age,PDO::PARAM_STR);
            $addPet->bindParam(':owner_id',$owner_id,PDO::PARAM_INT);
            $status = $addPet->execute();
            if (!$status) {
                throw new PDOException('Impossible to add this pet!');
            }
            //return the id for the row that you just inserted
            $petId = $this->_db->lastInsertId();
            return $petId;  
        } 

        public function getPets($owner_id) {
            $pets = $this->_db->prepare("SELECT id, name, size, breed, age, picURL FROM pet WHERE owner_id = :owner_id");
            $pets->bindParam(':owner_id',$owner_id,PDO::PARAM_INT);
            $resp = $pets->execute();
            if(!$resp) {
                throw new PDOException('Invalid username or password!');
            }
            $allPets = $pets->fetchAll();
            return $allPets;
        }

        public function getPetLink($id) {
            $pets = $this->_db->prepare("SELECT picURL FROM pet WHERE id = :id");
            $pets->bindParam(':id',$id,PDO::PARAM_INT);
            $resp = $pets->execute();
            if(!$resp) {
                throw new PDOException('Invalid username or password!');
            }
            $picLink = $pets->fetch();
            return $picLink;
        }


        public function editPet($name,$breed,$size,$pet_id,$age) { 
            $name = htmlspecialchars($name);
            $breed = htmlspecialchars($breed);
            $age = htmlspecialchars($age);    
            $editPet = $this->_db->prepare("UPDATE pet SET name = :name, size = :size, breed = :breed, age = :age WHERE id = :id");
            $editPet->bindParam(':name',$name,PDO::PARAM_STR);
            $editPet->bindParam(':size',$size,PDO::PARAM_STR);
            $editPet->bindParam(':breed',$breed,PDO::PARAM_STR);
            $editPet->bindParam(':age',$age,PDO::PARAM_STR);
            $editPet->bindParam(':id',$pet_id,PDO::PARAM_INT);
            $status = $editPet->execute();
            if (!$status) {
                throw new PDOException('Impossible to edit pet!');
            }
            return "db updated";
            $editPet->closeCursor();  
        }

        public function deletePet($pet_id) {  
            $deletePet = $this->_db->prepare("DELETE FROM pet WHERE id = :id");
            $deletePet->bindParam(':id',$pet_id,PDO::PARAM_INT);
            $status = $deletePet->execute();
            if (!$status) {
                throw new PDOException('pet not deleted');
            }
            $deletePet->closeCursor();  
            return "pet deleted";
        }

        public function updatePetPic($pet_id,$url){
            $editPetPic = $this->_db->prepare("UPDATE pet SET picURL = :picURL WHERE id = :id");
            $editPetPic->bindParam(':id',$pet_id,PDO::PARAM_INT);
            $editPetPic->bindParam(':picURL',$url,PDO::PARAM_STR);
            $status = $editPetPic->execute();
            if (!$status) {
                throw new PDOException('Impossible to update pet pic!');
            }
            return "db updated";
            $editPetPic->closeCursor();  
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


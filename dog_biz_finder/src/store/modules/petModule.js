import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import axios from 'axios'

Vue.use(Vuex);

const state = {
    pets: [
        // {   id:0,
        //     name:"biscuit",
        //     size:'small',
        //     breed:'pomeranian',
        //     age:2
        // },
        // {   id:4,
        //     name:"charlie",
        //     size:'big',
        //     breed:'laborador',
        //     age:4
        // },
        // {   id:75,
        //     name:"getrude",
        //     size:'medium',
        //     breed:'english bulldog',
        //     age:6
        // },
        // {   id:105,
        //     name:"frankie",
        //     size:'small',
        //     breed:'chihwahwa',
        //     age:12
        // },
    ]
        
    
};

const mutations = {
    SET_PETS(state, payload) {
        state.pets = payload;
    },
    //mutation used when people edit their pet info
    //because state.pets has many pet objects, find the one with the same id as the one you modified
    //we will need to update this later when we add age
    UPDATE_ONE_PET(state, payload){
        state.pets.forEach(element => {
            if(element.id === payload.id){
                element.name = payload.name,
                element.breed = payload.breed,
                element.size = payload.size
            }
        });
    },
    //mutation ran when you submit the add pet form
    ADD_ONE_PET(state, payload){
        state.pets.push(payload)
    }
};

const actions = {
    getPets,
    createPet,
    editPet
};

const getters = {
    petList: (state) => state.pets,
    
};

//get the user id from db associated with that user id
//this function is used in getPets() and createPets()
function getUserId(user) {
    let uid = user.uid
    let accountIdResponse = axios.get(`http://dogpeeps?action=getUserInfo&uid=${uid}`)
        .then(res => {
            console.log(res.data['id'])
            return res.data['id']
        })
        .catch(err => console.log(err))
    return accountIdResponse

}



//Get all of the pets associated with that user
async function getPets({ commit }) {
    let currUser = firebase.auth().currentUser;
    const id = await getUserId(currUser)
    const response = await axios.get(`http://dogpeeps?action=getPets&id=${id}`);
    console.log(response.data)
    commit('SET_PETS',response.data);//do the mutation below w provided data   
}



// //create a pet

async function createPet({commit}, creationParams) {
    let currUser = firebase.auth().currentUser;
    const id = await getUserId(currUser)
    const params = new URLSearchParams();
    params.append('action', 'createPet');
    params.append('id', id);
    params.append('name', creationParams.name);
    params.append('breed', creationParams.breed);
    params.append('size', creationParams.size);
    await axios.post('http://dogpeeps', params) 
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))
    //after the info has been added to the db, then make a new object in state.pets
    //this will need to be updated when we implement age
    commit("ADD_ONE_PET",{
        name:creationParams.name,
        breed:creationParams.breed,
        size:creationParams.size
    })

}


//edit pet info

async function editPet({commit}, creationParams) {
    const params = new URLSearchParams();
    params.append('action', 'editPet');
    params.append('id', creationParams.id);
    params.append('name', creationParams.name);
    params.append('breed', creationParams.breed);
    params.append('size', creationParams.size);
    await axios.post('http://dogpeeps', params) //)
        //after the db has the new member, send the user to the home page
        .then(res => {
            console.log(res.data)
            //creationParams.router.push('/');
        })
        .catch(err => console.log(err))
    //update the state after updating the db
    commit('UPDATE_ONE_PET',{
        id:creationParams.id,
        name:creationParams.name,
        breed:creationParams.breed,
        size:creationParams.size
    })
}

// //Delete user's account, after first reauthenticating the user
// function deleteUser(a, parameters) {
//     let currUser = firebase.auth().currentUser;
//     console.log('deleteUser() params', parameters)
//         //Call reauthenticate, pass on reauthResult(Boolean); if true (reauthentication successful) then delete account
//     reauthenticate(parameters.currentPw).then((reauthResult) => {
//         if (reauthResult) {
//             currUser
//                 .delete()
//                 .then(function() {
//                     const params = new URLSearchParams();
//                     params.append('action', 'removeAccount');
//                     params.append('uid', currUser.uid);
//                     axios.post('http://dogpeeps', params) //)
//                         .then(res => {
//                             console.log(res.data)
//                         })
//                         .catch(err => console.log(err))
//                         //After deleting the account, log the user out 
//                     logout(parameters.router);
//                 })
//                 .catch(function(error) {
//                     console.log("Delete user unsuccessful", error);
//                 });
//         }
//     });
// }




export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
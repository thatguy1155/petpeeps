import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import axios from 'axios'

Vue.use(Vuex);

const state = {
    user: {
        name: "",
        email: "",
        accountType: "",
        signInMethod: "",
        uid: ""
    }
};

const mutations = {
    LOAD_USER(state, payload) {
        state.user = payload;
        console.log(payload)
    }
};

const actions = {
    getCurrentUser,
    updatePw,
    deleteUser,
    updateAccountType,
    createUser
};

const getters = {
    accountType: (state) => state.user.accountType,
    signInMethod: (state) => state.user.signInMethod,
    getUid: (state) => state.user.uid
};

//get the accountType from the db if any
function getAccountType(user){
    let uid = user.uid
    //take the uid returned from firebase go find a user with the uid in db and return their user type if any
    let accountTypeResponse = axios.get(`http://dogpeeps?action=getUserInfo&uid=${uid}`)
        .then(res => {
            console.log(res.data['user_type'])
            return res.data['user_type'] 
        })
        .catch(err => console.log(err))   
        return accountTypeResponse
         
}




//____________DO YOU NEED TO EDIT/UPDATE THE DB? CHECK THIS OUT__________________________

//for some reason axios kinda sucks when it comes to posting things to the db in a 
//form-like fashion. The default syntax for axios.post that I saw online had us posting a simple js object
//where "params" is now

//that generated no errors in js but php was like "what object? I don't see shit"
//oddly enough passing these objects through a URLSearchParams object made the parameters visible to php
//my understanding is that URLSearchParams translates it into a format similar to URL parameters.

//this function updates the user type when you click on the business/personal box

function updateAccountType(a,accountParams) {
    const params = new URLSearchParams();
    params.append('action', 'updateAccountType');
    params.append('accType', accountParams.accType);
    params.append('uid', accountParams.uid);
    axios.post('http://dogpeeps',params)
        .then(res => {
            console.log(res.data)  
        })
        .catch(err => console.log(err))
}




//here I made this an async function and use "await"
// this is because it was committing "LOAD_USER" before it got the account type
// from the backend. "await" tells the function to chill until it gets the axios Response
// in getAccountType. 
//it's the same as putting the commit(LOAD_USER) in a .then()

//Get current user objet from firbase
async function getCurrentUser({ commit }) {
    let currUser = firebase.auth().currentUser;
    let accountTypeResult = await getAccountType(currUser)
    console.log(currUser.providerData[0].providerId);
    commit("LOAD_USER", {
        name: currUser.displayName,
        email: currUser.email,
        accountType: accountTypeResult,
        signInMethod: currUser.providerData[0].providerId,
        uid: currUser.uid
    });
}

//Reauthenticate the current user's password before carrying out security-sensitive actions
function reauthenticate(currentPw) {
    let currentUser = firebase.auth().currentUser;
    let credential = firebase.auth.EmailAuthProvider.credential(
        currentUser.email,
        currentPw
    );
    //Return true if credentials are correct and pass the value
    return currentUser
        .reauthenticateWithCredential(credential)
        .then(() => {
            console.log("reauthentication success");
            return true;
        })
        .catch((error) => {
            console.log("reauthentication failed", error);
            // if password is incorrect, notify the user so they know to try and reenter current pw
            if (error.code === "auth/wrong-password") {
                alert('You\'ve entered the wrong password. Please try again.');
            } else if (error.code === "auth/too-many-requests") {
                alert('You\'ve had too many attempts. Try again in a bit! :)');
            }
            return false;
        });
}

//Update the current user's password, after first reauthenticating the user
function updatePw(a, parameters) {
    let currentUser = firebase.auth().currentUser;
    //Call reauthenticate, pass on reauthResult(Boolean); if true (reauthentication successful) then update password
    reauthenticate(parameters.currentPw).then((reauthResult) => {
        if (reauthResult) {
            currentUser
                .updatePassword(parameters.confirmPw)
                .then(() => {
                    console.log("Password update successful");
                    //After updating pw, log user out so they can sign back in with new pw
                    logout(parameters.router);
                })
                .catch(function(error) {
                    console.log("Password update unsuccessful ", error);
                });
        }
    });
}

//create a user

function createUser(a,creationParams){
    console.log(creationParams.email)
    //make the user
    firebase.auth().createUserWithEmailAndPassword(creationParams.email,creationParams.password)
        //after you make the user, then update their display name
        .then(() => {
            let currUser = firebase.auth().currentUser;
            currUser.updateProfile({
                displayName : creationParams.username
            })
            //after you update their display name send the other details to the backend
            .then(() =>{
                const params = new URLSearchParams();
                params.append('action', 'createUser');
                params.append('login', currUser.displayName);
                params.append('email', creationParams.email);
                params.append('uid', currUser.uid);
                axios.post('http://dogpeeps',params)//)
                    //after the db has the new member, send the user to the home page
                    .then(res => {
                    console.log(res.data)
                    alert(`account created for ${creationParams.email}`)
                    creationParams.router.push('/'); 
                    })
                    .catch(err => console.log(err))
            })   
        },
        err => {
            alert(err.message)
        })
}

//Delete user's account, after first reauthenticating the user
function deleteUser(a, parameters) {
    let currUser = firebase.auth().currentUser;
    //Call reauthenticate, pass on reauthResult(Boolean); if true (reauthentication successful) then delete account
    reauthenticate(parameters.currentPw).then((reauthResult) => {
        if (reauthResult) {
            currUser
                .delete()
                .then(function() {
                    const params = new URLSearchParams();
                    params.append('action', 'removeAccount');
                    params.append('uid', currUser.uid);
                    axios.post('http://dogpeeps',params)
                        .then(res => {
                            console.log(res.data)  
                        })
                        .catch(err => console.log(err))
                    //After deleting the account, log the user out 
                    logout(parameters.router);
                })
                .catch(function(error) {
                    console.log("Delete user unsuccessful", error);
                });
        }
    });
}



//Log current user out
function logout(router) {
    firebase
        .auth()
        .signOut()
        .then(() => {
            router.go({ path: router.path });
            console.log("signout successful");
        });
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
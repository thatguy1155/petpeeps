import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

const state = {
    user: {
        name: "",
        email: "",
        accountType: "",
        signInMethod: ""
    }
};

const mutations = {
    LOAD_USER(state, payload) {
        state.user = payload;
    }
};

const actions = {
    getCurrentUser,
    updatePw,
    deleteUser
};

const getters = {
    accountType: (state) => state.user.accountType,
    signInMethod: (state) => state.user.signInMethod
};


//Get current user objet from firbase
function getCurrentUser({ commit }) {
    let currUser = firebase.auth().currentUser;
    console.log(currUser.providerData[0].providerId);
    commit("LOAD_USER", {
        name: currUser.displayName,
        email: currUser.email,
        accountType: "personal",
        signInMethod: currUser.providerData[0].providerId
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

//Delete user's account, after first reauthenticating the user
function deleteUser(a, parameters) {
    let currUser = firebase.auth().currentUser;
    console.log('deleteUser() params', parameters)
        //Call reauthenticate, pass on reauthResult(Boolean); if true (reauthentication successful) then delete account
    reauthenticate(parameters.currentPw).then((reauthResult) => {
        if (reauthResult) {
            currUser
                .delete()
                .then(function() {
                    console.log("Delete user successful");
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
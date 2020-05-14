import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import axios from "axios";

Vue.use(Vuex);

const state = {
  bizArray: [
    // {
    //     bizName: "Woof Cafe",
    //     bizType: "Cafe",
    //     bizHrs: "Everyday: 11am - 9pm",
    //     bizAddr: "서울특별시 중구 을지로7가 2-1",
    //     bizTel: "02-9343-3567",
    //     bizSite: "www.thejunglerestaurant.co.uk",
    //     socialMediaArr: {
    //         instagram: "www.instagram.com",
    //         naver: "www.blog.naver.com",
    //     },
    //     menu: [
    //         { item: "pasta", price: "9000", calories: "900" },
    //         { item: "pizza", price: "22000", calories: "1500" },
    //     ],
    // },
    // {
    //     bizName: "Safari",
    //     bizType: "Restaurant",
    //     bizHrs: "Everyday: 11am - 9pm",
    //     bizAddr: "서울특별시 중구 을지로6가 18-17",
    //     bizTel: "02-9343-3567",
    //     bizSite: "www.thejunglerestaurant.co.uk",
    //     socialMediaArr: {
    //         facebook: "www.facebook.com",
    //         twitter: "www.twitter.com",
    //     },
    //     menu: [
    //         { item: "pasta", price: "9000", calories: "900" },
    //         { item: "pizza", price: "22000", calories: "1500" },
    //     ],
    // },
  ],
};

const mutations = {
  SET_BIZ(state, payload) {
    state.bizArray = payload;
  },
  //mutation used when people edit their pet info
  //because state.pets has many pet objects, find the one with the same id as the one you modified
  //we will need to update this later when we add age
  UPDATE_ONE_BIZ(state, payload) {
    state.bizArray.forEach((element) => {
      if (element.id === payload.id) {
        (element.name = payload.name),
          (element.breed = payload.breed),
          (element.size = payload.size);
      }
    });
  },
  //mutation ran when you submit the add pet form
  ADD_ONE_BIZ(state, payload) {
    state.bizArray.push(payload);
  },
};

const actions = {
  getBiz,
  addBizDb,
  editBiz,
};

const getters = {};

//get the user id from db associated with that user id
//this function is used in getPets() and createPets()
function getUserId(user) {
  let uid = user.uid;
  let accountIdResponse = axios
    .get(`http://dogpeeps?action=getUserInfo&uid=${uid}`)
    .then((res) => {
      return res.data["id"];
    })
    .catch((err) => console.log(err));
  return accountIdResponse;
}

//Get all of the businesses associated with that user
async function getBiz({ commit }) {
  let currUser = firebase.auth().currentUser;
  const id = await getUserId(currUser);
  const response = await axios.get(`http://dogpeeps?action=getBiz&id=${id}`);
  const allBizList = [];
  for (let i=0; i<response.data.length; i++) {
    let respData = response.data[i];
    let fullAddress = respData.city + ' ' + respData.gu + ' ' + respData.dong;
    allBizList.push({
      bizName: respData.name,
      bizType: respData.type,
      bizHrs: respData.hours,
      bizAddr: fullAddress,
      bizTel: respData.bizTel,
      bizSite: respData.bizType,
      socialMediaArr: respData.socialMediaArr,
      menu: respData.menu
    });
  }
  commit("SET_BIZ", allBizList);
}

// //create a biz

async function addBizDb({ commit }, creationParams) {
  let currUser = firebase.auth().currentUser;
  const id = await getUserId(currUser);
  creationParams["id"] = id;
  creationParams["action"] = "createBiz";

  await axios
    .post("http://dogpeeps/", creationParams)
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
  //after the info has been added to the db, then make a new object in state.pets
  //this will need to be updated when we implement age
  commit("ADD_ONE_BIZ", {
    // bizName: creationParams.bizName,
    // bizType: creationParams.bizType,
    // bizHrs: creationParams.bizHrs,
    // bizAddr: creationParams.bizAddr,
    // bizTel: creationParams.bizTel,
    // bizSite: creationParams.bizType,
    // socialMediaArr: creationParams.socialMediaArr,
    // menu: creationParams.menu,
  });
}

//edit biz info

async function editBiz({ commit }, creationParams) {
  const params = new URLSearchParams();
  params.append("action", "editPet");
  params.append("id", creationParams.id);
  params.append("name", creationParams.name);
  params.append("breed", creationParams.breed);
  params.append("size", creationParams.size);
  await axios
    .post("http://dogpeeps", params) //)
    //after the db has the new member, send the user to the home page
    .then((res) => {
      console.log(res.data);
      //creationParams.router.push('/');
    })
    .catch((err) => console.log(err));
  //update the state after updating the db
  commit("UPDATE_ONE_BIZ", {
    id: creationParams.id,
    name: creationParams.name,
    breed: creationParams.breed,
    size: creationParams.size,
  });
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

import Vue from 'vue'
//import Vuex from 'vuex'

import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Contact from '../views/Contact.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import firebase from 'firebase'


Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        redirect: '/login'
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
        meta: {
            requiresGuest: true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


//nav guards
router.beforeEach((to, from, next) => {
    //check for requiredAuth guard
    if (to.matched.some(record => record.meta.requiresAuth)) {
        //check if NOT logged in to firebase
        if (!firebase.auth().currentUser) {
            //go to login page
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            //proceed to route
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        //check if user Is logged in to firebase
        if (firebase.auth().currentUser) {
            //go to home page
            next({
                path: '/',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            //proceed to route
            next();
        }

    } else {
        next();
    }
})



// //this function checks to see if a page requires login
// //if the user isn't logged in then it sends them to the login page
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (!store.getters.isLoggedIn) {
//       next({name: 'Login'})
//     } else {
//       next() // go to wherever I'm going
//     }
//   } else {
//     next() // does not require auth, make sure to always call next()!
//   }
// })

export default router
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
/* import the fontawesome core */

const firebaseConfig = {
    apiKey: "AIzaSyBetH-Vk9IsooEmfUr7B_f5BRV9fngWoa0",
    authDomain: "flitter-a21af.firebaseapp.com",
    projectId: "flitter-a21af",
    storageBucket: "flitter-a21af.appspot.com",
    messagingSenderId: "85562441417",
    appId: "1:85562441417:web:41d4689f4f18fb13241718"
};


initializeApp(firebaseConfig);
const db = getFirestore()

createApp(App).use(store).use(router).mount('#app')

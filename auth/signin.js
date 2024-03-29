import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
//get and child is for login
import {
  getDatabase,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
//signInWithEmailAndPassword name explains itself
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

//from firebase new profile from my end
const firebaseConfig = {
  apiKey: "AIzaSyA4feQcdAThIbE_RD78jk2TjcwIggh0oT8",
  authDomain: "tunesc-f096a.firebaseapp.com",
  databaseURL: "https://tunesc-f096a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tunesc-f096a",
  storageBucket: "tunesc-f096a.appspot.com",
  messagingSenderId: "325789524945",
  appId: "1:325789524945:web:452aa57a09d83fc978f6f0",
  measurementId: "G-6V8SN7DF1E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);

let EmailLogInp = document.getElementById("email-login");
let PassLogInp = document.getElementById("password-login");
let LoginForm = document.getElementById("LoginForm");

let LoginUser = (evt) => {
  evt.preventDefault();

  signInWithEmailAndPassword(auth, EmailLogInp.value, PassLogInp.value)
    .then((credentials) => {
      //rest of the info will be put into the realtime database
      //console.log(credentials)
      //get retrieves info in db
      get(child(dbref, "UsersAuthList/" + credentials.user.uid)).then(
        (snapshot) => {
          if (snapshot.exists) {
            //localStorage para permanently logged in sa browser nila
            sessionStorage.setItem(
              "user-info",
              JSON.stringify({
                name: snapshot.val().name,
                //the object is converted to string then malalagay sa sessionStorage
              })
            );
            sessionStorage.setItem(
              "user-creds",
              JSON.stringify(credentials.user)
            );
            //this redirects the page after logging in, user profile for the mean time
            window.location.href = "Connect.html";
          }
        }
      );
    })
    .catch((error) => {
      //show error, refactor this later to a popup
      alert(error.message);
      console.log(error.code);
      console.log(error.message);
    });
};

LoginForm.addEventListener("submit", LoginUser);

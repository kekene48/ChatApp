// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore, addDoc, Timestamp, onSnapshot, getDocs } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKJ1vl3R5b3Ou0TNS0MBrieLjjvaY74j8",
  authDomain: "myfirstfirebaseproject-4d803.firebaseapp.com",
  databaseURL: "https://myfirstfirebaseproject-4d803-default-rtdb.firebaseio.com",
  projectId: "myfirstfirebaseproject-4d803",
  storageBucket: "myfirstfirebaseproject-4d803.appspot.com",
  messagingSenderId: "564634534334",
  appId: "1:564634534334:web:83bf64a80257995e0239ef",
  measurementId: "G-QYSMKVXN0R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//Inititalize Firestore
export const db = getFirestore(app)

//CollectionRef
export const colRef = collection(db, 'chats')


class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = colRef;
    }
    async addChat(message) {
        let now = new Date();
        let chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: Timestamp.fromDate(now)
        }

        const response = await addDoc(colRef, chat)
        return response
    }
    getChats() {
        //code below uses getDocs
        // getDocs(colRef)
        // .then(snapshot => {
        //     snapshot.docs.forEach(doc => console.log(doc.data()))
        // })
        // .catch(err => console.log(err))

        //while this one uses a listener(whenever the database changes, I console.log the database)
        onSnapshot(colRef, (snapshot) => {
            snapshot.docs.forEach(doc => console.log(doc.data()))
        })
    }
}

const chatroom = new Chatroom('gaming', 'kelvin')
// console.log(chatroom)
chatroom.addChat('itsa me Mario')
chatroom.getChats()
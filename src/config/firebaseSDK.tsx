import React, { useEffect } from 'react';
import firebase from 'firebase'


class FirebaseSDK extends React.Component<{a: string}> {

    construtor() {
        const config = {
            apiKey: "apiKey",
            authDomain: "projectId.firebaseapp.com",
            // For databases not in the us-central1 location, databaseURL will be of the
            // form https://[databaseName].[region].firebasedatabase.app.
            // For example, https://your-database-123.europe-west1.firebasedatabase.app
            databaseURL: "https://databaseName.firebaseio.com",
            storageBucket: "bucket.appspot.com"
        };
        if (!firebase.app.length) {
            firebase.initializeApp(config);
        }
        // Get a reference to the database service
        //var database = firebase.database();

    }

    login = async (login: string, password: string, sucess: () => {}, failed: () => { }) => {
        await firebase
            .auth()
            .signInWithEmailAndPassword(login, password)
            .then(sucess, failed);
    }

    criarUsuario = async (login: string, password: string, nome: string) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(login, password)
            .then(
                () => {
                    var user = firebase.auth().currentUser;
                    console.log("Firebase CurrentUser =>", user);
                    user?.updateProfile({ displayName: nome })
                        .then(() => { console.log("Firebase DisplayName =>", nome); },
                              () => { console.log("Firebase DisplayName Erro =>", nome); }
                        )
                }, yhuu
                                                 ´p--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                (error: Error) => {
                    console.log("Firebase Erro =>", { erro: typeof error, mensagem: error.message });
                }
        )
    }
}


//const FirebaseSDK: React.Cla = () => {

//    useEffect(() => {

//        // Set the configuration for your app
//        // TODO: Replace with your project's config object
//        const config = {
//            apiKey: "apiKey",
//            authDomain: "projectId.firebaseapp.com",
//            // For databases not in the us-central1 location, databaseURL will be of the
//            // form https://[databaseName].[region].firebasedatabase.app.
//            // For example, https://your-database-123.europe-west1.firebasedatabase.app
//            databaseURL: "https://databaseName.firebaseio.com",
//            storageBucket: "bucket.appspot.com"
//        };
//        firebase.initializeApp(config);

//        // Get a reference to the database service
//        var database = firebase.database();
//    });

//    return (<></>);
//}



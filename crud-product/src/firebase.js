import * as firebase from 'firebase';

var firebaseConfig = {
	apiKey: 'AIzaSyDWZ8hH_r-thnYFhwYgBFbmIYaGid9ppOM',
	authDomain: 'milkteashop-4565d.firebaseapp.com',
	databaseURL: 'https://milkteashop-4565d.firebaseio.com',
	projectId: 'milkteashop-4565d',
	storageBucket: 'milkteashop-4565d.appspot.com',
	messagingSenderId: '211198335221',
	appId: '1:211198335221:web:05113e736a60861b100dbc',
	measurementId: 'G-7CMBMYCJEG',
};

var fire = firebase.initializeApp(firebaseConfig);
export const DB = fire.database();
export const Storage = fire.storage();
 


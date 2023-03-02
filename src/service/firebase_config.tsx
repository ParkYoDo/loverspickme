//firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

//firebase 설정 관련 개인정보
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
};

//firebaseConfig 정보로 firebase 시작
const app = initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장 후 export
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
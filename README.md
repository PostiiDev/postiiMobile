# postiiMobile
server is deploy on 
# https://railway.app/
# To run this app you follow this steps 


1- run this commande in terminal 

create a new folder 

cd to the folder postiiBackend and excute this commande 
git clone https://github.com/PostiiDev/postiibackend.git

git checkout khadija

npm install


2 - git clone https://github.com/PostiiDev/postiiMobile.git

cd to directory posttiMibile and excute this comande 

npm install 
npm run android 


go to src/atom/authtication.js 
and change the ip adress from your local wifi proprety

export const apiUrl = atom({
    key: 'apiUrl',
    default : 'http://{chnage this to you ip adress}'
})

always add http://0.0.0.0 you ip dont forget http://

enjoy working !!



1- 

npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

2 - 
cd android 

3 - 
./gradlew assembleDebug


path in folder 
\postiiMobile\android\app\build\outputs\apk\debug
4- upload to https://wetransfer.com/








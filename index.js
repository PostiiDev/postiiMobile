/**
 * @format
 */

import {AppRegistry, ActivityIndicator, View, SafeAreaView} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {RecoilRoot} from 'recoil';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

const RecoilApp = () => {
  return (
    <>
      <RecoilRoot>
        <React.Suspense
          fallback={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="#6c5ce7" />
            </View>
          }>
          <PaperProvider>
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
              <App />
            </SafeAreaView>
          </PaperProvider>
        </React.Suspense>
      </RecoilRoot>
    </>
  );
};
AppRegistry.registerComponent(appName, () => RecoilApp);

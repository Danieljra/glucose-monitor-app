import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar, View } from 'react-native';
import { store, persistor } from './src/store';
import MainApp from './src/MainApp';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate
        // eslint-disable-next-line react-native/no-inline-styles
        loading={<View style={{flex: 1, backgroundColor: '#FFFFFF'}} />}
        persistor={persistor}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFFFFF"
        />
        <MainApp />
      </PersistGate>
    </Provider>
  );
};

export default App;

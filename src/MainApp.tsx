import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';

const MainApp: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return isAuthenticated ? <HomeScreen /> : <LoginScreen />;
};

export default MainApp;


import { Background } from './src/components/Background/';
import { StatusBar} from 'react-native';

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black

} from '@expo-google-fonts/inter';

import { Routes } from './src/routes';
import {Loading} from './src/components/Loading';

import './src/services/notificationConfigs';
import {getPushNotificationToken} from './src/services/getPushNotificationToken';
import { Subscription} from 'expo-modules-core'
import { useRef, useEffect} from 'react';

import * as Notifications from 'expo-notifications';



export default function App() {

  const getNotificationListener = useRef<Subscription>()
  const ResponseNotificationListener = useRef<Subscription>()

  useEffect(()=>{
    getPushNotificationToken();
  })

  useEffect(()=>{
    getNotificationListener.current = Notifications.addNotificationReceivedListener((notification) =>{
      console.log(notification);
    });

    ResponseNotificationListener.current = Notifications.addNotificationResponseReceivedListener((response) =>{
      console.log(response);
    });

    //limpa as notificações da memória
    return ()=>{ 
      if(getNotificationListener.current && ResponseNotificationListener.current){
        Notifications.removeNotificationSubscription(getNotificationListener.current);
        Notifications.removeNotificationSubscription(ResponseNotificationListener.current);
      }
    }
  }, [])

  const [fontsLoaded]= useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  
  })
  return (
    <Background>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading/> }
    </Background>
  );
}





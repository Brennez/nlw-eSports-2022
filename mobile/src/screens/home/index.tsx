import { Image, FlatList} from 'react-native';
import { useEffect, useState } from 'react';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { styles } from './styles';

import {SafeAreaView} from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

import  imgLogo  from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({id, title, bannerUrl}:GameCardProps) {
    navigation.navigate('game', {id, title, bannerUrl}); //parametros para a próxima página
  }

  useEffect(()=>{
    fetch('http://192.168.1.57:3000/games')
    .then(response => response.json())
    .then(data => setGames(data));
  }, [])

 
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={imgLogo}
          style={styles.logo}
        />
        <Heading title='Encontre seu duo!' subtitle='Selecione o game que deseja jogar...'/>

        <FlatList 
          data={games}
          keyExtractor={item => item.id}
          renderItem={({item})=>(  
              <GameCard
              data={item}
              onPress={() => handleOpenGame(item)} //quando a função tem parametros chama assim
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal

          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
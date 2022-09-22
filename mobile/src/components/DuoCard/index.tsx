import { View } from 'react-native';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';

export interface DuoCardProps{
  id: string;
  hoursEnd: string;
  hoursStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props{
  data: DuoCardProps
}

export function DuoCard({data}:Props) {
  
  return (
    <View style={styles.container}>
      <DuoInfo 
        label='Nome'
        value={data.name}
      />
      <DuoInfo 
        label='Tempo de jogo'
        value={`${data.yearsPlaying} ano(s)`}
      />
      <DuoInfo 
        label='Disponibilidade'
        value={`${data.weekDays.length} dias \u2022 ${data.hoursStart.split(':')[0]}h - ${data.hoursEnd.split(':')[0]}h`}
      />
      <DuoInfo 
        label='Chamada de áudio?'
        value='Sim'
      />
    </View>
  );
}
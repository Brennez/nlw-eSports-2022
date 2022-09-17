import React from 'react';
import { View, Text, ViewProps } from 'react-native';

interface props extends ViewProps{
  title: string;
  subtitle: string;
}

import { styles } from './styles';

export function Heading({title, subtitle, ...rest}: props) {
  return (
    <View style={styles.container}{...rest}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </View> 
  );  
}
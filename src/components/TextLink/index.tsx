import React from 'react';
import { Text, TextProps,StyleProp, ViewStyle } from 'react-native';
import { styles } from './styles';

type Props = TextProps & {
    value: string;
    action: ()=>void;
    style?: StyleProp<ViewStyle>;

}

export default function TextLink({ value, action, style }: Props){
    return(
        <Text style={style?style:styles.link} onPress={action}>
            {value}
        </Text>
    );
}
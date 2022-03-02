import React from "react";

import { Text, TextProps, Switch } from 'react-native';
import { styles } from "./styles";

type Props = TextProps & {
    value: string;
    nomeEstilo: string;
}

export default function SimpleText({ value, nomeEstilo }: Props) {
    return(

        <Text style={
            (()=>{switch(nomeEstilo){
            case 'textoBotaoPurble': return styles.textoBotaoPurble;
            default: return styles.textSimples        
            }
            })()}>
            {value}
        </Text>
    );
}
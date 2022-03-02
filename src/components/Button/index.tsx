import React from "react";
import { TouchableOpacity } from 'react-native';
import SimpleText from "../SimpleText";
import { styles } from "./styles";

export default function ButtonComponent(props: any) {
    return(
        <TouchableOpacity style={styles.button} onPress={props.actionPress}>
            <SimpleText value={props.value} nomeEstilo={props.nomeestilo}></SimpleText>
        </TouchableOpacity>
    );
}
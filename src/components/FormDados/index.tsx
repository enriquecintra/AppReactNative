import React from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from '../FormDados/styles';
import TextTitle from '../TextTitle';
import SimpleText from '../SimpleText';
import { IUsuario } from '../../services/UsuarioServices';

import moment from 'moment'

export default function FormDados(props?: IUsuario) {
    //console.log("FormDados => ", props)


    var data = props ? moment(props.dataAceitePolitica).format("DD/MM/yyyy") : moment().format("dd/MM/yyyy");
    var hora = props ? moment(props.dataAceitePolitica).format("hh:mm") : moment().format("hh:mm");

    return (
        <View style={styles.container}>
            <TextTitle title="Meus Dados" />
            <SimpleText nomeEstilo="" value={props?.nome || ""} />
            <SimpleText nomeEstilo="" value={props?.email || ""} />
            <Text>Perfil: {props?.role}</Text>
            <Text>Ultimo Acesso: {data} as {hora}</Text>
        </View>
    );
}

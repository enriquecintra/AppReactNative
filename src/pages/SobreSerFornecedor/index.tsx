import React, { useContext } from 'react';
import AuthContext from '../../contexts/auth'; 
import FormDados from '../../components/FormDados';
import TextTitle from '../../components/TextTitle';
import SimpleText from '../../components/SimpleText';
import { Text, View} from 'react-native';
import { styles } from './styles';
import { AppScreens } from '../../routes/AppStackParamList';
import ButtonComponent from '../../components/Button';

export default function SobreSerFornecedor() {

    //const { user } = useContext(AuthContext);

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <View style={{ margin: 20 }}>
                <Text style={styles.titulo}>Fonecedores no aplicativo</Text>
                <Text style={styles.descricao}>Dentro do aplicativo do seu provedor você encontrará produtos e serviços de fornecedores que utilizam a OPPI como meio de comunicação de clientes para fornecedores, podendo conversar e interagir diretamente com ele através do canal de chat.</Text>
                <Text style={styles.titulo}>Como cadastrar sua loja!</Text>
                <Text style={styles.descricao}>Para cadastrar sua loja, bastar clicar no botão abaixo e preencher seu cadastro como fornecedor. É importante ler as regras de política Privacidade</Text>
            </View>
            <View style={styles.container}>
                <ButtonComponent
                    actionPress={() => { }}
                    value="Seja um Fornecedor"
                    nomeestilo="textoBotaoPurble"
                />
            </View>
        </View>
    );
}
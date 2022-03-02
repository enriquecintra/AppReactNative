import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';
import { padding } from '../../styles/mixins';

export const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 30,
        backgroundColor: Colors.BRANCO,
        alignItems: 'center',
        height:100
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.BRANCO
    },
    logo: {
        width: "40%",
        height: "40%",
        opacity:1,
        alignItems: 'center',
        flex:1,
        top:10
      },
      logoHeaderLogin: {
        top:10,
        width: "40%",
        height: "40%",
        opacity:1,
        alignItems: 'center',
        flex:1
      },
      containerHeaderLogin: {
        backgroundColor: Colors.PRETO,
        alignItems: 'center',
        alignContent:"center",
        height: 200
    },
});
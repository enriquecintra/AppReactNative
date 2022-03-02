import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export const styles = StyleSheet.create({
    listaProvedor: {
        flexDirection: 'column',
        display: 'flex',
        marginLeft: 20,
        marginTop: 10,
        marginRight: 20,
        backgroundColor: Colors.PURPLE,
        // height: 100,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius:50
    },
    textoListaProvedor: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.BRANCO,
        padding: 0,
        alignItems: "center",
        alignContent: "center",
        textAlign: "center"
    },
    container: {
        flex: 1,
        backgroundColor: Colors.BRANCO
    }, 
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.BRANCO,
        padding: 0,
        alignItems: "center"
    },
    containerInformativo: {
        top:0,
        alignItems: "center",
        justifyContent: "center"
    },
    textoInformativo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.ROSA,
        padding: 10,
        alignItems: "center"
    },
    button: {
        marginTop: 10,
        height: 60,
        backgroundColor: 'green',
        borderRadius: 50,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
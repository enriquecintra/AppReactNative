import { StyleSheet } from "react-native";
import { Colors } from '../../../styles';

export const styles = StyleSheet.create({

    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
        alignItems: 'center',

    },
    container: {
        alignItems: 'center',
        paddingTop: 30
    },
    inputContainer: {
        margin: 30,
        alignItems: 'stretch',
    },
    topImage: {
        margin: 20,
    },

    input: {
        borderRadius: 50,
        marginBottom: 20,
        height: 60,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch',
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
    },
    buttonBack: {
        marginTop: 10,
        height: 60,
        backgroundColor: 'cyan',
        borderRadius: 50,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});
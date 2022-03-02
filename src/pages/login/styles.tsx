import { StyleSheet } from "react-native";
import { Colors } from '../../styles';

export const styles = StyleSheet.create({
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
        alignItems: 'stretch' 
    },
    container: {
        flex: 1,
        backgroundColor: Colors.BRANCO
    }, 
});
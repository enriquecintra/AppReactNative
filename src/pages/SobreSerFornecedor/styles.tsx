import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export const styles = StyleSheet.create({
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.PRIMARIA,
        paddingBottom: 10
    },
    descricao: {
        paddingBottom: 10,
        textAlign: 'justify'
    },
    container: { margin: 20 }
});
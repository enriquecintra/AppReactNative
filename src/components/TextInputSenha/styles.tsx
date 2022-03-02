import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export const styles = StyleSheet.create({
    input: {
        width:'90%',
        height: 58,
        fontSize: 16,
        paddingHorizontal: 24,
        backgroundColor: Colors.BRANCO,
        borderRadius: 50,
        alignItems:"stretch",
    },
    inputAreaCampoSenha:{
        flexDirection:'row',
        backgroundColor:Colors.BRANCO,
        borderRadius: 50,
        height: 60,
        alignItems:"stretch",
        borderColor:Colors.PURPLE,
        borderWidth:1,
        marginBottom: 10,
    },
    iconEye:{
        flex:1,
        right:10,
        top:4,
        width:"8%",
        height:50,
        justifyContent:"center"
    },

});
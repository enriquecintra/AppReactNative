import { StyleSheet } from "react-native";
import { Colors } from "../../styles";

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
        backgroundColor: Colors.BRANCO,
        top:30
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
        backgroundColor: Colors.PURPLE,
        borderRadius: 50,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    icon:{
        flex:1,
        right:10,
        top:4,
        width:"8%",
        height:50,
        justifyContent:"center"
    },
    inputArea:{
        flexDirection:'row',
        backgroundColor:Colors.BRANCO,
        borderRadius: 50,
        height: 60,
        alignItems:"stretch",
        borderColor:Colors.PURPLE,
        borderWidth:1,
        marginBottom: 10,
    },
    linkEsqueciMinhaSenha: {
        alignSelf: "center",
        backgroundColor: "transparent",
        padding: 10,
        fontSize:20,
        color:Colors.PURPLE,
        fontWeight: 'bold',
    },
    linkPrimeiroAcesso:{
        alignSelf: "center",
        backgroundColor: "transparent",
        padding: 10,
        fontSize:16,
        color:Colors.PURPLE,
        fontWeight: 'bold',
}
    
})
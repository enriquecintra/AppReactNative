import { StyleSheet } from "react-native";
import { Colors } from "../../styles";

export const styles = StyleSheet.create({


    

    cabecalho: {
        flexDirection:"row",
        flexWrap:"wrap"
    },
    cabecalhoItem:{
        flex:0.50,
        padding:10,
        backgroundColor:Colors.ROSA
    },
    cabecalhoTexto: {
        color: Colors.BRANCO, fontWeight: 'bold'
    },
    
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: Colors.BRANCO
    },


    cardsWrapper: {
        width: '90%',
        alignSelf: 'center'

    },

    card: {
        height: 100,
        marginTop: 5,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardImgWrapper: {
        flex: 1,
    },
    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
    },
    cardTitle: {
        fontWeight: 'bold',
    },
    cardDetails: {
        fontSize: 12,
        color: '#444',
    },

    texto: { alignSelf: 'center', fontSize: 15, fontWeight: 'bold', color: '#333' },
    botao: {
        marginTop: 10,
        height: 40,
        backgroundColor: Colors.PURPLE,
        borderRadius: 50,
        justifyContent: 'center',
        marginHorizontal: 10,

    },
    textoBotao: {
        color: Colors.BRANCO,
        fontSize: 15,
    },
    
    linkSaibaMais:{
            alignSelf: "center",
            backgroundColor: "transparent",
            fontSize: 18,
            fontWeight: 'bold',
            color: Colors.PURPLE,
            padding:10
    }


});
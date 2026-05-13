import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    //Estilo principal
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    //Label dos inputs
    label:{
        width: '90%',
        marginTop: 20,
        fontSize: 16,
        marginLeft: 20,
        color: '#007BFF',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    //Campo de entrada de texto
    inputText:{
        width: '90%',
        marginTop: 10,
        padding: 10,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#007BFF',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    //Botão adicionar tarefa (flutuante)
    buttonNewTask:{
        position: 'absolute',
        width: 60,
        height: 60,
        bottom: 50,
        left: 20,
        backgroundColor: '#007BFF',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    //Estilo do texto do botão
    iconButton:{
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    //Rodapé da página
    footer:{
        backgroundColor: '#007BFF',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'flex-start',
        paddingLeft: 15
    },
    //Texto do Rodapé
    footerText:{
        color: '#fff',
        fontSize: 14,
        textAlign: 'left'
    }
})

export default styles;
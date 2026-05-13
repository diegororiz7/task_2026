import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    //Estilo principal
    container:{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20
    },
    //Seção das tarefas
    contextAllTasks:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10
    },
    //Campo de busca
    searchInput:{
        flex: 1,
        marginLeft: 8,
        paddingVertical: 8,
        fontSize: 16
    },
    //Estilo das tarefas
    task:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 5
    },
    //Ícone de excluir
    deleteTask:{
        justifyContent: 'center',
        paddingLeft: 15,
        marginRight: 10
    },
    //Descrição das tarefas
    desciptionTask:{
        flex: 1,
        backgroundColor: '#f5f5f5f5',
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 5,
        color: '#000',
        fontSize: 16
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
    //Estilo overlay (camada do modal)
    overlay:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    //Conteúdo do modal
    modalContent:{
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center'
    },
    //Texto do modal
    modalText:{
        fontSize: 16,
        marginBottom: 20
    },
    //Botão de confirmar (modal)
    buttonConfirm:{
        backgroundColor: '#4CAF50'
    },
    //Botão de cancelar (modal)
    buttonCancel:{
        backgroundColor: '#D32F2F'
    },
    //Seção de botões (manipular tarefas)
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    //Botões de manipular tarefas
    button:{
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center'
    },
    //Texto dos botões (manipular tarefas)
    buttonText:{
        color: 'white',
        fontSize: 14
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
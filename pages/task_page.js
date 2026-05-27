//Importações dos componentes e do Firebase
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput,TouchableOpacity,
    Modal, Switch, Alert, FlatList
} from 'react-native';
import database from '../config/firebase_config';
import {Picker} from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles/styles_task';


//Função principal (Listar, ordenar, buscar e manipular)
export default function Task({navigation}){

    //Variáveis iniciais
    const [task, setTask] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [hideFinished, setHideFinished] = useState(false);
    const [filteredTask, setFilteredTask] = useState([]);
    const [sortOption, setSortOption] = useState('priority');
    const [searchText, setSearchText] = useState('');

    //Função para alternar o status da tarefa
    function toggleTaskStatus(id, currentStatus){
        database.collection('Tasks').doc(id).update({
            finished: !currentStatus
        })
    }

    //Função para confirmar a exclusão da tarefa
    function confirmDeleteTask(id){
        setTaskToDelete(id);
        setShowDeleteModal(true);
    }

    //Função para excluir a tarefa
    function deleteTask(){
        if(taskToDelete){
            database.collection('Tasks').doc(taskToDelete).delete();
            setTask(prevTask => prevTask.filter(
                task => task.id !== taskToDelete
            ))
        }
    }

    //Função para cancelar a exclusão da tarefa
    function cancelDelete(){
        setShowDeleteModal(false);
    }

    //Função para formatar a data
    function formatDate(dateString){
        const date = dateString instanceof Date ?
        dateString: 
        new Date(dateString.toDate ? 
            dateString.toDate() : dateString);
        return date.toISOString().split('T')[0].split('-').reverse().join('/');
    }

    //Função para cor da tarefa
    function getPriorityColor(priority){
        switch(priority){
            case 'Urgente': return '#D32F2F';
            case 'Alta': return '#F75C00';
            case 'Média': return '#FBC02D';
            case 'Baixa': return '#6B8E23';
            default: return '#000'
        }
    }

    //Função para comparar e classificar as tarefas
    function compareTasks(a,b){
        if(sortOption === 'date'){
            const dateA = new Date(a.date.toDate ? a.date.toDate() : a.date);
            const dateB = new Date(b.date.toDate ? b.date.toDate() : b.date);
            return dateA - dateB;
        }else if(sortOption === 'priority'){
            const priorityOrder = {
                'Urgente': 1,
                'Alta': 2,
                'Média': 3,
                'Baixa': 4
            }
            return (priorityOrder || 5) - (priorityOrder || 5);
        }
        return 0;
    }

    //Função para contagem de likes
    function handleLike(id, currentLikes){
        database.collection('Tasks').doc(id).update({
            likes: (currentLikes + 1 || 0)
        })
    }

    //Função para contagem de deslikes
    function handleDeslike(id, currentDeslikes){
        database.collection('Tasks').doc(id).update({
            deslikes: (currentDeslikes + 1 || 0)
        })
    }

    //Função para buscar informações no Firebase
    useEffect(() => {
        const unsubscribe = database.collection('Tasks')
                            .onSnapshot((QuerySnapshot) => {
                                const list = [];
                                QuerySnapshot.forEach((doc) => {
                                    list.push({...doc.data(), id: doc.id})
                                });
                                setTask(list);
                            })
                            return () => unsubscribe();
    },[]);

    //UseEffect para filtrar e ordenar
    useEffect(() => {
        const filtered = task.filter((t) => {
            const matchStatus = hideFinished ?
            !t.finished : true;
            const matchSearch = t.description.toLowerCase().includes(
                searchText.toLowerCase()
            );
            return matchSearch && matchStatus;
        });
        const sorted = [...filtered].sort(compareTasks);
        setFilteredTask(sorted);
    },[task, hideFinished, searchText, sortOption]);

    return(
        <View style = {{flex: 1}}>
            {/*Ocultar tarefas personalizadas*/}
            <View style = {{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginTop: 15,
                marginBottom: 10,
                marginRight: 10
            }}>
                <Switch
                    value = {hideFinished}
                    onValueChange = {setHideFinished}
                    thumbColor = {hideFinished ? '#4CAF50' : '#EF5350'}
                    trackColor = {hideFinished ? '#4CAF50' : '#EF5350'}
                />
                <Text style = {{marginLeft: 10}}>
                    Ocultar tarefas finalizadas
                </Text>
            </View>

            {/*Selecionar tipo de ordenação*/}
            <View style = {{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginTop: 15,
                marginBottom: 10,
                paddingRight: 10
            }}>
                <Text style = {{fontWeight: 'bold', marginRight: 10}}>
                    Ordenar por:
                </Text>
                <Picker
                    style = {{width: 150}}
                    value = {sortOption}
                    onValueChange={(itemValue) => setSortOption(itemValue)}
                >
                    <Picker.Item label = 'Data' value = 'date'/>
                    <Picker.Item label = 'Prioridade' value = 'priority'/>
                </Picker>
            </View>

            {/*Buscar tarefa */}
            <View style = {{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
                borderRadius: 8,
                marginHorizontal: 10,
                marginBottom: 10,
                paddingHorizontal: 10
            }}>
                <FontAwesome name = 'search' size = {18} color = '#000'/>
                <TextInput
                    value = {searchText}
                    onChangeText = {setSearchText}
                    style = {styles.searchInput}
                    placeholder = 'Pesquise uma tarefa'
                />
            </View>

            {/*Lista de Tarefas*/}
            <FlatList
                data = {filteredTask}
                keyExtractor = {(item) => item.id}
                renderItem = {({item}) => (
                    <View style = {styles.contextAllTasks}>
                        <View style = {{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 6
                        }}>
                            <Text style = {[
                                styles.desciptionTask,
                                item.finished && {
                                    textDecorationLine: 'line-through'
                                }
                            ]}>
                                {item.description}
                            </Text>

                            <Text style = {{
                                backgroundColor: getPriorityColor(item.priority),
                                color: '#fff',
                                paddingHorizontal: 6,
                                borderRadius: 4
                            }}>
                                {item.priority}
                            </Text>

                            <Text>
                                {item.date ? 
                                    formatDate(item.date) : ''
                                }
                            </Text>
                        </View>

                        {/*Botões de ações das tarefas */}
                        <View style = {{
                            flexDirection: 'row'
                        }}>
                            {/*Botão de curtir*/}
                            <TouchableOpacity
                                style = {{marginRight: 10, alignItems: 'center'}}
                                onPress={() => handleLike(item.id, currentLikes)}
                            >
                                <FontAwesome
                                    name = 'thumbs-up'
                                    size = {20}
                                    color = '#007BFF'
                                />
                            </TouchableOpacity>
                            
                            {/*Botão de descurtir*/}
                            <TouchableOpacity
                                style = {{marginRight: 10, alignItems: 'center'}}
                                onPress={() => handleDeslike(item.id, currentDeslikes)}
                            >
                                <FontAwesome
                                    name = 'thumbs-down'
                                    size = {20}
                                    color = '#FF0000'
                                />
                            </TouchableOpacity>

                            {/*Botão de finalizar tarefa*/}
                            <TouchableOpacity
                                style = {{marginRight: 10, alignItems: 'center'}}
                                onPress={() => toggleTaskStatus(item.id, item.finished)}
                            >
                                <FontAwesome
                                    name = {item.finished ? 'undo' : 'check'}
                                    size = {20}
                                    color = '#4CAF50'
                                />
                            </TouchableOpacity>

                            {/*Botão de editar tarefa*/}
                            <TouchableOpacity
                                style = {{marginRight: 10, alignItems: 'center'}}
                                onPress={()=> navigation.navigate('AddEdit',{
                                    description: item.description,
                                    priority: item.priority,
                                    date: item.date
                                })}
                            >
                                <FontAwesome
                                    name = 'edit'
                                    size = {20}
                                    color = '#9C27B0'
                                />
                            </TouchableOpacity>

                            {/*Botão de excluir tarefa*/}
                            <TouchableOpacity
                                style = {{marginRight: 10, alignItems: 'center'}}
                                onPress={()=> confirmDeleteTask(item.id)}
                            >
                                <FontAwesome
                                    name = 'trash'
                                    size = {20}
                                    color = '#D32F2F'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            {/*Botão de adicionar tarefa*/}
            <TouchableOpacity
                style = {styles.buttonNewTask}
                onPress = {()=> navigation.navigate('AddEdit')}
            >
                <FontAwesome
                    name = 'plus'
                    size = {20}
                    color = '#FFF'
                />
            </TouchableOpacity>

            {/*Modal de exclusão*/}
            <Modal
                visible = {showDeleteModal}
                transparent
            >
                <View style = {styles.overlay}>
                    <View style = {styles.modalContent}>
                        <Text>Deseja realmente excluir a tarefa?</Text>
                        <View style = {styles.buttonContainer}>
                            <TouchableOpacity
                                style = {[styles.button, {
                                    backgroundColor: '#4CAF50',
                                    width: '45%'
                                }]}
                                onPress = {cancelDelete}
                            >
                                <Text style = {styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style = {[styles.button, {
                                    backgroundColor: '#D32F2F',
                                    width: '45%'
                                }]}
                                onPress = {deleteTask}
                            >
                                <Text style = {styles.buttonText}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
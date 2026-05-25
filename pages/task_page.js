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
                searchText.toLowerCase
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
        </View>
    );
}
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

    return(
        <View style = {{flex: 1}}>
            <Text>Teste 12-05-2026</Text>
        </View>
    );
}
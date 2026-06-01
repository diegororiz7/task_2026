//Importações de componentes e navegação
import React, {useState} from 'react';
import {View, Text, TextInput, Alert,
    TouchableOpacity, Platform
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles/styles_add_edit';
import database from '../config/firebase_config';

//Função principal (Criar e editar)
export default function AddEdit({navigation,route}){

    //Verificar se é edição
    const isEdit = route?.params?.id ? true : false;

    //Variáveis a serem manipuladas
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Média');

    //Manipulação inicial de data
    const initialDate = route?.params?.date?.toDate
        ? route.params.date.toDate()
        : route?.params?.date
        ? new Date(route.params.date)
        : new Date();

        const [date, setDate] = useState(initialDate);
        const [showDatePicker, setShowDatePicker] = useState(false);

    //Função para validar os inputs
    const validateInputs = () => {
        if(!description.trim()){
            Alert.alert('Erro', 'Informe a descrição da tarefa!');
            return false;
        }

        if(!priority.trim()){
            Alert.alert('Erro', 'Informe a prioridade da tarefa!');
            return false;
        }

        if(!date){
            Alert.alert('Erro', 'Informe a data da tarefa!');
            return false;
        }

        return true;
    }

    //Função única para salvar (adicionar ou editar)
    const handleSave = () => {
        if(!validateInputs()) return;

        const taskDate = new Date(date);
        taskDate.setHours(0,0,0,0);

        if(isEdit){
            //Editar tarefa
            database.collection('Tasks').doc(route.params.id).update({
                description: description,
                priority: priority,
                date: taskDate
            })
        }else{
            database.collection('Tasks').add({
                description: description,
                priority: priority,
                date: taskDate,
                finished: false
            })
        }

        navigation.navigate('Task');
    }

    return (
        <View style = {{flex: 1}}>

        </View>
    );
}
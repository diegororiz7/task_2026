//importações de navegação e suas telas
import React from 'react';
import {NavigationContainer} from '@react-navigation/container';
import {createStackNavigator} from '@react-navigation/stack';

//importação de páginas
import Task from './pages/task_page';
import AddEdit from './pages/add_edit_page';

//definição do Stack
const Stack = createStackNavigator();

//função principal e tela principal
export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'Task'>
        <Stack.Screen
          name = 'Task'
          component = {Task}
          options = {{
            title: 'Lista de Tarefas',
            headerTintColor: '#FFF',
            headerStyle:{
              backgroundColor: '#007BFF'
            }
          }}
        />

        <Stack.Screen
          name = 'AddEdit'
          component = {AddEdit}
          options = {({route}) => ({
            title: route?.params?.id ? 'Editar Tarefa' : 'Adicionar Tarefa',
            headerTintColor: '#fff',
            headerStyle:{
              backgroundColor: '#007BFF'
            }
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
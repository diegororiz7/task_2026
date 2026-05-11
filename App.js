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

      </Stack.Navigator>
    </NavigationContainer>
  );
}
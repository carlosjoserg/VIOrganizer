import * as React from 'react';
import { useState } from 'react';
import { Button, Text, View, StyleSheet, FlatList, Image, Alert, TouchableOpacity, Switch} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

import { Card } from 'react-native-paper';

const SALIDAS_DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Salida #1',
    refugio: 'ASS',
    fecha: '21-May-2021',
    hora: '14:00',
    referente: 'Marta',
    tareas: ['1. Limpiar jaulas', '2. Pasear perros', '3. Vacunación'],
    personas_necesarias: '10',
    personas_inscritas: '3',
    coches_inscritos: '2',
    asientos_libres: '5',
    apuntado: true,
    confirmado: false,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Salida #2',
    refugio: 'SO',
    fecha: '21-May-2021',
    hora: '14:00',
    referente: 'Jordi',
    tareas: ['1. Limpiar jaulas', '2. Pasear perros', '3. Vacunación'],
    personas_necesarias: '5',
    personas_inscritas: '3',
    coches_inscritos: '0',
    asientos_libres: '0',
    apuntado: false,
    confirmado: false,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Salida #3',
    refugio: 'O',
    fecha: '21-May-2021',
    hora: '14:00',
    referente: 'Jaime',
    tareas: ['1. Limpiar jaulas', '2. Pasear perros', '3. Vacunación'],
    personas_necesarias: '20',
    personas_inscritas: '3',
    coches_inscritos: '3',
    asientos_libres: '9',
    apuntado: true,
    confirmado: false,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Salida #4',
    refugio: 'ASS',
    fecha: '21-May-2021',
    hora: '14:00',
    referente: 'Marta',
    tareas: ['1. Limpiar jaulas', '2. Pasear perros', '3. Vacunación'],
    personas_necesarias: '2',
    personas_inscritas: '2',
    coches_inscritos: '1',
    asientos_libres: '0',
    apuntado: false,
    confirmado: false,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Salida #5',
    refugio: 'ASS',
    fecha: '21-May-2021',
    hora: '14:00',
    referente: 'Marta',
    tareas: ['1. Limpiar jaulas', '2. Pasear perros', '3. Vacunación'],
    personas_necesarias: '10',
    personas_inscritas: '3',
    coches_inscritos: '2',
    asientos_libres: '5',
    apuntado: true,
    confirmado: false,
  },
];

const SALIDAS_APUNTADAS_DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Salida #1',
    refugio: 'ASS',
    fecha: '21-May-2021',
    hora: '14:00',
    referente: 'Marta',
    tareas: ['1. Limpiar jaulas', '2. Pasear perros', '3. Vacunación'],
    personas_necesarias: '10',
    personas_inscritas: '3',
    coches_inscritos: '2',
    asientos_libres: '5',
    apuntado: true,
    confirmado: false,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Salida #3',
    refugio: 'O',
    fecha: '21-May-2021',
    hora: '14:00',
    referente: 'Jaime',
    tareas: ['1. Limpiar jaulas', '2. Pasear perros', '3. Vacunación'],
    personas_necesarias: '20',
    personas_inscritas: '3',
    coches_inscritos: '3',
    asientos_libres: '9',
    apuntado: true,
    confirmado: false,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Salida #5',
    refugio: 'ASS',
    fecha: '21-May-2021',
    hora: '14:00',
    referente: 'Marta',
    tareas: ['1. Limpiar jaulas', '2. Pasear perros', '3. Vacunación'],
    personas_necesarias: '10',
    personas_inscritas: '3',
    coches_inscritos: '2',
    asientos_libres: '5',
    apuntado: true,
    confirmado: false,
  },
];


const Salida = ({salida}) => (

  <Card style={styles.cards}>
  
  {/** El usuario puede apuntarse a varias, y se le confirma automáticamente de acuerdo a las necesidades 3 días antes, o manualmente por el referente */}
  { !(salida.apuntado) && !(salida.confirmado) &&
    <MaterialCommunityIcons style={styles.state} name="lock-open" size={36} color="lightgrey" />
  }
  { salida.apuntado && !(salida.confirmado) &&
    <MaterialCommunityIcons style={styles.state} name="lock-open-check" size={36} color="orange" />
  }

  { salida.apuntado && salida.confirmado &&
    <MaterialCommunityIcons style={styles.state} name="lock-check" size={36} color="green" />
  }

  <TouchableOpacity onPress={() => Alert.alert('Added to ' + salida.title)}>
  <View style={[{flexDirection: 'row'}, {justifyContent: 'space-around'}]}>

    <View style={[{flexDirection: 'column'}, {justifyContent: 'space-evenly'}, {alignContent: 'center'}]}>
      <Image style={styles.logo} source={require('../assets/snack-icon.png')} />
      <Text style={styles.refugio}>{salida.refugio}</Text>
    </View>

    <View style={[{flexDirection: 'column'}]}>
      <Text style={styles.salidas}>{salida.title}</Text>
      <Text style={styles.tareas}>{salida.fecha} @ {salida.hora}</Text>
      <View style={[{flexDirection: 'row-reverse'}]}>
        <FontAwesome style={styles.tareas} name="id-badge" size={24} color="black" />
        <Text style={styles.tareas}>{salida.referente}</Text>
      </View>

      <View style={[{flexDirection: 'row-reverse'}]}>
        <View style={[{flexDirection: 'row'}]}>
          <Text style={styles.tareas}>{salida.coches_inscritos}</Text>
          <FontAwesome5 style={styles.tareas} name="car-side" size={24} color="black" />
        </View>
        <View style={[{flexDirection: 'row'}]}>
          <Text style={styles.tareas}>{salida.asientos_libres}</Text>
          <MaterialCommunityIcons style={styles.tareas} name="car-seat" size={24} color="black" />
        </View>
        <View style={[{flexDirection: 'row'}]}>
          <Text style={styles.tareas}>{salida.personas_inscritas}/{salida.personas_necesarias}</Text>
          <Ionicons style={styles.tareas} name="people" size={24} color="black" />
        </View>
      </View>
    </View>

  </View>
  </TouchableOpacity>
  </Card>
  
);

export default function Salidas() {
  const insets = useSafeAreaInsets();
  const renderItem = ({ item }) => <Salida salida={item} />;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={[{flexDirection: 'column'}, {marginTop: insets.top}, styles.overall]}>
      
      <View style={[{flexDirection: 'row'}, {justifyContent: 'space-around'}, {backgroundColor: 'white'}]}>
        <Image style={styles.vilogo} source={require('../assets/logo.jpg')} />
        <View style={[{flexDirection: 'column'}]}>
          <Text style={styles.selector_text}>Mis salidas</Text>
          <Switch style={styles.selector_control}
            trackColor={{ false: '#767577', true: 'orange' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled} />
        </View>
      </View>
      
      { isEnabled &&
        <FlatList data={SALIDAS_APUNTADAS_DATA} renderItem={renderItem} keyExtractor={item => item.id} />
      }
      { !(isEnabled) &&
        <FlatList data={SALIDAS_DATA} renderItem={renderItem} keyExtractor={item => item.id} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  overall: {
    marginBottom: 70,
  },
  selector_text: {
    textAlign: 'right',
    marginTop: 10,
    marginRight: 50,
  },
  selector_control: {
    textAlign: 'right',
    marginRight: 50,
  },
  cards: {
    margin: 15,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 50,
    width: 50,
    alignContent: 'center',
  },
  salidas: {
    fontSize: 28,
    margin: 2,
    textAlign: 'right',
    alignItems: 'center',
  },
  refugio: {
    fontSize: 24,
  },
  tareas: {
    fontSize: 16,
    margin: 5,
    alignItems: 'center',
    alignContent: 'center',
  },
  state: {
    textAlign: 'center',
    margin: 10,
  },
  vilogo: {
    height: 50,
    width: 50,
    marginLeft: 40,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
});
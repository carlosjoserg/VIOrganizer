import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, FlatList, Card, TouchableOpacity, Alert, ScrollViewStickyHeader} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const REFUGIOS_DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    refugio: 'ASS',
    nombre: 'Animals \n sense sostre',
    ubicacion: '21-May-2021',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    refugio: 'PE',
    nombre: 'Projecte \n Emphatia',
    ubicacion: '21-May-2021',
  },
];

const REFUGIOS_PUNTUAL_DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    refugio: 'O',
    nombre: 'Odena',
    ubicacion: '21-May-2021',
  },
   {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    refugio: 'L4P',
    nombre: 'Life4Pitbulls',
    ubicacion: '21-May-2021',
  },
   {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    refugio: 'A',
    nombre: 'Arda',
    ubicacion: '21-May-2021',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    refugio: 'R24h',
    nombre: 'Rodamons 24h',
    ubicacion: '21-May-2021',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    refugio: 'SO',
    nombre: 'Segundas \n Oportunidades',
    ubicacion: '21-May-2021',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    refugio: 'FHH',
    nombre: 'Fundación \n Hope&Help',
    ubicacion: '21-May-2021',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    refugio: 'PAT',
    nombre: 'Protectora \n d`Animals  \n de Tàrrega',
    ubicacion: '21-May-2021',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    refugio: 'SCR',
    nombre: 'Segarra-Cervera refugi',
    ubicacion: '21-May-2021',
  },
];

const Refugio = ({refugio}) => (
  <TouchableOpacity onPress={() => Alert.alert('Informacion sobre ' + refugio.nombre)}>
  <View style={[{flexDirection: 'row'}, {justifyContent: 'space-around'}, {alignContent: 'center'}, {margin: 10}]}>

    <View style={[{flexDirection: 'column'}, {justifyContent: 'center'}, {alignContent: 'center'}, {textAlign: 'center'},]}>
      <Image style={styles.logos} source={require('../assets/snack-icon.png')} />
      <Text style={styles.refugio}>{refugio.nombre}</Text>
    </View>

  </View>
  </TouchableOpacity>
);

export default function Refugios() {
  const insets = useSafeAreaInsets();
  const renderItem = ({ item }) => <Refugio refugio={item} />;
  return (
       
    <ScrollView style={[{marginTop: insets.top}, styles.scrollView]} stickyHeaderIndices={[0]}>

      {/* sticky header */}
      <View style={[{backgroundColor: 'white'}, {alignItems: 'center'}]}>
        <Image style={styles.logo} source={require('../assets/logo.jpg')} />
      </View>

      <View style={styles.container}>
        
        <Text style={styles.paragraph}>Protectoras y entidades con actuaciones regulares</Text>
        <FlatList data={REFUGIOS_DATA} renderItem={renderItem} keyExtractor={item => item.id} horizontal={false} numColumns={2} />

        <Text style={[{margin: 30}, styles.paragraph]}>Colaboraciones puntuales</Text>
        <FlatList data={REFUGIOS_PUNTUAL_DATA} renderItem={renderItem} keyExtractor={item => item.id} horizontal={false} numColumns={3} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    padding: 10,
  },
  paragraph: {
    marginBottom: 30,
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'white'
  },
  scrollView: {
  },
  logos: {
    height: 75,
    width: 75,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  logo: {
    height: 128,
    width: 128,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 24,
  },
  refugio: {
    fontSize: 16,
    textAlign: 'center',
  },
});
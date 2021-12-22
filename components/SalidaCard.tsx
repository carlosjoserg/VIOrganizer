import * as React from "react";
import { useState } from "react";
import { Text, View, StyleSheet, Image, Alert, TouchableOpacity, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Avatar, Button, Card, Title, Paragraph, List } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const current_mobile_phone = '606909265';

import SalidasDato from "./DataTypes"

function isApuntado (personas: string[]) {
	var apuntado = false;
	personas.forEach((person) => {
		if(person === current_mobile_phone){
			apuntado = true;
		}
	});
	return apuntado;
}


const ShelterPic = props => <Avatar.Image {...props} size={42} source={require('../assets/snack-icon.png')} />
const ProfilePicReferente = props => <Avatar.Image {...props} style={[{margin: 20}]} size={42} source={require('../assets/snack-icon.png')} />

function Salida ({ salida }: SalidasDato) {
	const navigation = useNavigation();
	return (
	<Card style={[{marginTop: 10}, {marginBottom: 10}]} onPress={() => navigation.navigate("SalidaDetail", {current_salida: salida})}>
		<Card.Title title={salida.title} subtitle={salida.fecha} left={ShelterPic} right={ProfilePicReferente} />

		<Card.Content>
			<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
		</Card.Content>

		<Card.Actions style={[{justifyContent: "space-around"},]}>

			{!( isApuntado(salida.personas_inscritas) ) && !(salida.confirmada) &&
				<Button mode="outlined" onPress={() => Alert.alert('Apuntado!')} ><Text style={[{color: "grey"}]}>ME APUNTO</Text></Button>
			}
			{ isApuntado(salida.personas_inscritas) && !(salida.confirmada) && (
				<Button mode="contained" style={[{backgroundColor: 'tomato'}]} onPress={() => Alert.alert('Desapuntado!')} ><Text style={[{color: "white"}]}>APUNTADO</Text></Button>
			)}

			{ isApuntado(salida.personas_inscritas) && (salida.confirmada) && (
				<Button mode="contained" style={[{backgroundColor: 'green'}]} onPress={() => Alert.alert('Go to Chat')} ><Text style={[{color: "white"}]}>CONFIRMADO</Text></Button>
			)}

			<View style={[{ flexDirection: "row-reverse" }, {alignItems:'center'}]}>
				<View style={[{ flexDirection: "row" }, {alignItems: 'center'}, {margin: 5}]}>
					<Text style={styles.tareas}>{salida.coches_inscritos}</Text>
					<FontAwesome5 style={styles.tareas} name="car-side" size={18} color="grey" />
				</View>
				<View style={[{ flexDirection: "row" }, {alignItems: 'center'}, {margin: 5}]}>
					<Text style={styles.tareas}>{salida.asientos_libres}</Text>
					<MaterialCommunityIcons style={styles.tareas} name="car-seat" size={18} color="grey" />
				</View>
				<View style={[{ flexDirection: "row" }, {alignItems: 'center'}, {margin: 5}]}>
					<Text style={styles.tareas}>{salida.personas_inscritas.length}/{salida.personas_necesarias} </Text>
					<Ionicons style={styles.tareas} name="people" size={18} color="grey" />
				</View>
			</View>
		</Card.Actions>
	</Card>
);
}

export default Salida;

const styles = StyleSheet.create({
	tareas: {
		fontSize: 14,
		margin: 3,
		alignItems: "center",
		alignContent: "center",
		color: "grey"
	}
});

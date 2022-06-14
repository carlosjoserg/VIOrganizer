import * as React from "react";
import { useState, useEffect } from 'react';

import { Text, View, StyleSheet, Alert} from "react-native";

import { Avatar, Button, Card } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import firebase from "../lib/firebase";

/** this comes from the authentication */

function isApuntado (personas)
{
	var apuntado = false;
	personas.forEach((person): void =>
	{
		if( person.number === firebase.firebase.auth().currentUser?.phoneNumber?.substring(3, 12) )
		{
			apuntado = true;
		}
	});
	return apuntado;
}

function ShelterPic(props)
{
	return <Avatar.Image {...props} size={42} source={require('../assets/snack-icon.png')} />;
}

function ProfilePicReferente(props)
{
	return <Avatar.Image {...props} style={[{ margin: 20 }]} size={42} source={require('../assets/snack-icon.png')} />;
}

export default function Salida({salida})
{
	const navigation = useNavigation();
	const [my_salida, setSalida] = useState(salida.data());

	useEffect(() =>
	{
		/*console.log("salida card");
		console.log(salida.id);*/
	},
	[]);

	return (
		<Card style={[{marginTop: 10}, {marginBottom: 10}]} onPress={() => navigation.navigate("SalidaDetail", {current_salida: salida})}>
			<Card.Title title={my_salida.title} subtitle={my_salida.fecha.toDate().toDateString()} left={ShelterPic} right={ProfilePicReferente} />

			<Card.Content>
				<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
			</Card.Content>

			<Card.Actions style={[{justifyContent: "space-around"}]}>

				{
					!isApuntado(my_salida.personas_inscritas) && !(my_salida.confirmada) &&
					
					<Button mode="outlined" onPress={() => Alert.alert('Apuntado!')} ><Text style={[{color: "grey"}]}>ME APUNTO</Text></Button>
				}
				{
					isApuntado(my_salida.personas_inscritas) && !(my_salida.confirmada) &&
					
					<Button mode="contained" style={[{backgroundColor: 'tomato'}]} onPress={() => Alert.alert('Desapuntado!')} ><Text style={[{color: "white"}]}>APUNTADO</Text></Button>

				}

				{
					isApuntado(my_salida.personas_inscritas) && (my_salida.confirmada) &&
					
					<Button mode="contained" style={[{backgroundColor: 'green'}]} onPress={() => Alert.alert('Go to Chat')} ><Text style={[{color: "white"}]}>CONFIRMADO</Text></Button>
				}

				<View style={[{ flexDirection: "row-reverse" }, {alignItems:'center'}]}>
					<View style={[{ flexDirection: "row" }, {alignItems: 'center'}, {margin: 5}]}>
						<Text style={styles.tareas}>{my_salida.coches_inscritos}</Text>
						<FontAwesome5 style={styles.tareas} name="car-side" size={18} color="grey" />
					</View>
					<View style={[{ flexDirection: "row" }, {alignItems: 'center'}, {margin: 5}]}>
						<Text style={styles.tareas}>{my_salida.asientos_libres}</Text>
						<MaterialCommunityIcons style={styles.tareas} name="car-seat" size={18} color="grey" />
					</View>
					<View style={[{ flexDirection: "row" }, {alignItems: 'center'}, {margin: 5}]}>
						<Text style={styles.tareas}>{my_salida.personas_inscritas.length}/{my_salida.personas_necesarias} </Text>
						<Ionicons style={styles.tareas} name="people" size={18} color="grey" />
					</View>
				</View>
			</Card.Actions>
		</Card>
	);
}

const styles = StyleSheet.create(
{
	tareas:
	{
		fontSize: 14,
		margin: 3,
		alignItems: "center",
		alignContent: "center",
		color: "grey"
	}
});

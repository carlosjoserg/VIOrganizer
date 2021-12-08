import * as React from "react";
import { useState } from "react";
import { Text, View, StyleSheet, FlatList, Image, Alert, TouchableOpacity, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Avatar, Button, Card, Title, Paragraph, List } from 'react-native-paper';

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

interface SalidasDato {
	id: string;
	title: string;
	refugio: string;
	fecha: string;
	hora: string;
	referente: string;
	tareas: string[];
	personas_necesarias: string;
	personas_inscritas: string;
	coches_inscritos: string;
	asientos_libres: string;
	apuntado: boolean;
	confirmado: boolean;
}

const SALIDAS_DATA : SalidasDato[]= [
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53ab111a",
		title: "Salida #1",
		refugio: "ASS",
		fecha: "8-May-2021",
		hora: "14:00",
		referente: "Marta",
		tareas: ["1. Limpiar jaulas", "2. Pasear perros", "3. Vacunación"],
		personas_necesarias: "10",
		personas_inscritas: "3",
		coches_inscritos: "2",
		asientos_libres: "5",
		apuntado: true,
		confirmado: false,
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53a2228ba",
		title: "Salida #2",
		refugio: "SO",
		fecha: "21-May-2021",
		hora: "14:00",
		referente: "Jordi",
		tareas: ["1. Limpiar jaulas", "2. Pasear perros", "3. Vacunación"],
		personas_necesarias: "5",
		personas_inscritas: "3",
		coches_inscritos: "0",
		asientos_libres: "0",
		apuntado: false,
		confirmado: false,
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad5333328ba",
		title: "Salida #3",
		refugio: "O",
		fecha: "25-May-2021",
		hora: "14:00",
		referente: "Jaime",
		tareas: ["1. Limpiar jaulas", "2. Pasear perros", "3. Vacunación"],
		personas_necesarias: "20",
		personas_inscritas: "3",
		coches_inscritos: "3",
		asientos_libres: "9",
		apuntado: true,
		confirmado: false,
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad5344428ba",
		title: "Salida #4",
		refugio: "ASS",
		fecha: "3-Jun-2021",
		hora: "14:00",
		referente: "Marta",
		tareas: ["1. Limpiar jaulas", "2. Pasear perros", "3. Vacunación"],
		personas_necesarias: "2",
		personas_inscritas: "2",
		coches_inscritos: "1",
		asientos_libres: "0",
		apuntado: false,
		confirmado: false,
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53a5558ba",
		title: "Salida #5",
		refugio: "ASS",
		fecha: "7-Jul-2021",
		hora: "14:00",
		referente: "Marta",
		tareas: ["1. Limpiar jaulas", "2. Pasear perros", "3. Vacunación"],
		personas_necesarias: "10",
		personas_inscritas: "3",
		coches_inscritos: "2",
		asientos_libres: "5",
		apuntado: true,
		confirmado: false,
	},
];

const SALIDAS_APUNTADAS_DATA : SalidasDato[] = [
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad5666b28ba",
		title: "Salida #1",
		refugio: "ASS",
		fecha: "8-May-2021",
		hora: "14:00",
		referente: "Marta",
		tareas: ["1. Limpiar jaulas", "2. Pasear perros", "3. Vacunación"],
		personas_necesarias: "10",
		personas_inscritas: "3",
		coches_inscritos: "2",
		asientos_libres: "5",
		apuntado: true,
		confirmado: false,
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad5377728ba",
		title: "Salida #3",
		refugio: "O",
		fecha: "25-May-2021",
		hora: "14:00",
		referente: "Jaime",
		tareas: ["1. Limpiar jaulas", "2. Pasear perros", "3. Vacunación"],
		personas_necesarias: "20",
		personas_inscritas: "3",
		coches_inscritos: "3",
		asientos_libres: "9",
		apuntado: true,
		confirmado: false,
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53a8888ba",
		title: "Salida #5",
		refugio: "ASS",
		fecha: "7-Jul-2021",
		hora: "14:00",
		referente: "Marta",
		tareas: ["1. Limpiar jaulas", "2. Pasear perros", "3. Vacunación"],
		personas_necesarias: "10",
		personas_inscritas: "3",
		coches_inscritos: "2",
		asientos_libres: "5",
		apuntado: true,
		confirmado: false,
	},
];

const LeftContent = props => <Avatar.Image {...props} size={42} source={require('../assets/snack-icon.png')} />

var Salida = ({ salida }: SalidasDato) => (
	<Card style={[{marginTop: 5}]}>
		<Card.Title title={salida.title} subtitle={salida.fecha} left={LeftContent} />

		<Card.Content>
			<Paragraph style={[{textAlign: 'right'}, {color: 'grey'}]}>
				{salida.refugio} con {salida.referente}
			</Paragraph>
			<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
		</Card.Content>

		<Card.Actions>

			<View style={[{ flexDirection: "row" }, {justifyContent: "space-between"}, {alignContent: "stretch"}, {alignItems:'center'}]}>

				{!salida.apuntado && !salida.confirmado && (
					<Button mode="outlined" onPress={() => Alert.alert('Apuntado!')} ><Text style={[{color: "grey"}]}>ME APUNTO</Text></Button>
				)}
				{salida.apuntado && !salida.confirmado && (
					<Button mode="outlined" onPress={() => Alert.alert('Desapuntado!')} ><Text style={[{color: "orange"}]}>DESAPÚNTAME</Text></Button>
				)}

				{salida.apuntado && salida.confirmado && (
					<Text style={[{color: "green" }]}>CONFIRMADO!</Text>
				)}

				{/** COULD NOT FIND A WAY TO ALIGN THIS PART TO THE RIGHT, paddingRight: 40 is hardcoded */}
				<View style={[{ flexDirection: "row-reverse" }, {paddingRight: 40}, {alignItems:'center'}]}>
					<View style={[{ flexDirection: "row" }, {alignItems: 'center'}]}>
						<Text style={styles.tareas}>{salida.coches_inscritos}</Text>
						<FontAwesome5 style={styles.tareas} name="car-side" size={18} color="grey" />
					</View>
					<View style={[{ flexDirection: "row" }, {alignItems: 'center'}]}>
						<Text style={styles.tareas}>{salida.asientos_libres}</Text>
						<MaterialCommunityIcons style={styles.tareas} name="car-seat" size={18} color="grey" />
					</View>
					<View style={[{ flexDirection: "row" }, {alignItems: 'center'}]}>
						<Text style={styles.tareas}>{salida.personas_inscritas}/{salida.personas_necesarias} </Text>
						<Ionicons style={styles.tareas} name="people" size={18} color="grey" />
					</View>
				</View>
			</View>
		</Card.Actions>
	</Card>
);

export default function Salidas() {
	const insets = useSafeAreaInsets();
	const renderItem = ({ item }) => <Salida salida={item} />;
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
	return (
		<View style={[{ flexDirection: "column" }, { marginTop: insets.top }, styles.overall]}>
			<View style={[{ flexDirection: "row" }, { justifyContent: "space-around" }, { backgroundColor: "white" }]}>
				<Image style={styles.vilogo} source={require("../assets/logo.jpg")} />
				<View style={[{ flexDirection: "column" }]}>
					<Text style={styles.selector_text}>Mis salidas</Text>
					<Switch
						style={styles.selector_control}
						trackColor={{ false: "#767577", true: "orange" }}
						thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
						ios_backgroundColor="#3e3e3e"
						onValueChange={toggleSwitch}
						value={isEnabled}
					/>
				</View>
			</View>

			{isEnabled && (
				<FlatList data={SALIDAS_APUNTADAS_DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />
			)}
			{!isEnabled && <FlatList data={SALIDAS_DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />}

		</View>
	);
}

const styles = StyleSheet.create({
	overall: {
		marginBottom: 70,
	},
	selector_text: {
		textAlign: "right",
		marginTop: 10,
		marginRight: 50,
	},
	selector_control: {
		textAlign: "right",
		marginRight: 50,
	},
	tareas: {
		fontSize: 14,
		margin: 5,
		alignItems: "center",
		alignContent: "center",
		color: "grey"
	},
	vilogo: {
		height: 50,
		width: 50,
		marginLeft: 40,
		marginTop: 20,
		marginBottom: 10,
		textAlign: "left",
		alignContent: "center",
		alignItems: "center",
	},
});

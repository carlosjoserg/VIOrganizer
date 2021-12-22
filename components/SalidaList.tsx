import * as React from "react";
import { useState } from "react";
import { Text, View, StyleSheet, FlatList, Image, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const current_mobile_phone = '606909265';

import SalidasDato from "./DataTypes"

const SALIDAS_DATA : SalidasDato[]= [
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53ab111a",
		title: "Salida #1",
		refugio: "ASS",
		fecha: "8-May-2021",
		hora: "14:00",
		referente: "Marta",
		tareas: ["1. Limpiar jaulas", "2. Pasear perros", "3. Vacunación"],
		personas_necesarias: 20,
		personas_inscritas: ["606909265"],
		coches_inscritos: 2,
		asientos_libres: 5,
		confirmada: false
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53a2228ba",
		title: "Salida #2",
		refugio: "SO",
		fecha: "21-May-2021",
		hora: "14:00",
		referente: "Jordi",
		tareas: ["1. Limpiar jaulas", "2. Pasear perros", "3. Vacunación"],
		personas_necesarias: 5,
		personas_inscritas: [],
		coches_inscritos: 0,
		asientos_libres: 0,
		confirmada: false
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad5333328ba",
		title: "Salida #3",
		refugio: "O",
		fecha: "25-May-2021",
		hora: "14:00",
		referente: "Jaime",
		tareas: ["1. Limpiar jaulas", "2. Pasear perros", "3. Vacunación"],
		personas_necesarias: 20,
		personas_inscritas: [],
		coches_inscritos: 3,
		asientos_libres: 9,
		confirmada: false
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad5344428ba",
		title: "Salida #4",
		refugio: "ASS",
		fecha: "3-Jun-2021",
		hora: "14:00",
		referente: "Marta",
		tareas: ["1. Limpiar jaulas", "2. Pasear perros", "3. Vacunación"],
		personas_necesarias: 2,
		personas_inscritas: [],
		coches_inscritos: 1,
		asientos_libres: 0,
		confirmada: false
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53a5558ba",
		title: "Salida #5",
		refugio: "ASS",
		fecha: "7-Jul-2021",
		hora: "14:00",
		referente: "Marta",
		tareas: ["1. Limpiar jaulas", "2. Pasear perros", "3. Vacunación"],
		personas_necesarias: 10,
		personas_inscritas: [],
		coches_inscritos: 2,
		asientos_libres: 5,
		confirmada: false
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
		personas_necesarias: 10,
		personas_inscritas: [],
		coches_inscritos: 2,
		asientos_libres: 5,
		confirmada: false
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad5377728ba",
		title: "Salida #3",
		refugio: "O",
		fecha: "25-May-2021",
		hora: "14:00",
		referente: "Jaime",
		tareas: ["1. Limpiar jaulas", "2. Pasear perros", "3. Vacunación"],
		personas_necesarias: 20,
		personas_inscritas: [],
		coches_inscritos: 3,
		asientos_libres: 9,
		confirmada: false
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53a8888ba",
		title: "Salida #5",
		refugio: "ASS",
		fecha: "7-Jul-2021",
		hora: "14:00",
		referente: "Marta",
		tareas: ["1. Limpiar jaulas", "2. Pasear perros", "3. Vacunación"],
		personas_necesarias: 10,
		personas_inscritas: [],
		coches_inscritos: 2,
		asientos_libres: 5,
		confirmada: false
	},
];

import Salida from "./SalidaCard";

function SalidaList ({navigation}) {
	const insets = useSafeAreaInsets();
	const renderItem = ({ item }) => <Salida salida={item} />;
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	return (
		<View style={[{ flexDirection: "column" }, { marginTop: insets.top }, styles.overall]}>
			<View style={[{ flexDirection: "row" }, { justifyContent: "space-around" }, { backgroundColor: "white" }]}>
				<Image style={styles.vilogo} source={require("../assets/logo.jpg")} />
				<View style={[{ flexDirection: "row" }, {alignItems:'center'}]}>
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

			{isEnabled &&
				<FlatList data={SALIDAS_APUNTADAS_DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />
			}
			{!isEnabled &&
				<FlatList data={SALIDAS_DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />
			}

		</View>
	);
}

export default SalidaList;

const styles = StyleSheet.create({
	overall: {
		marginBottom: 70
	},
	selector_text: {
		textAlign: "right",
		marginTop: 5,
		marginRight: 5
	},
	selector_control: {
		textAlign: "right",
		marginRight: 50
	},
	vilogo: {
		height: 50,
		width: 50,
		marginLeft: 40,
		marginTop: 20,
		marginBottom: 10,
		textAlign: "left",
		alignContent: "center",
		alignItems: "center"
	}
});

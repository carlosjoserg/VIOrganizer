import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNavigation } from '@react-navigation/native';

import { Button } from 'react-native-paper';

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const current_mobile_phone = '606909265';

import SalidasDato from "./DataTypes"

function SalidaDetail ({route, navigation}) {
	const insets = useSafeAreaInsets();
	const salida = route.params.current_salida;

	return (
		<View style={[{ marginTop: insets.top }, styles.overall, { flexDirection: "column" }]}>
			<View style={[{ flexDirection: "row" }, { justifyContent: "flex-start" }, { backgroundColor: "white" }, {alignContent: "center"}]}>
				<TouchableOpacity onPress={() => navigation.navigate("Salidas")} >
					<Ionicons style={[{padding: 20}]} name="arrow-back" size={36} color="black" />
				</TouchableOpacity>
				<Text style={styles.detalle_text}>{salida.title}</Text>
			</View>
			<View style={[{ flexDirection: "column" }, { justifyContent: "center" }, {alignContent: "center"}]}>
				<Text style={styles.other_text}>{salida.fecha}</Text>
				<Text style={styles.other_text}>{salida.refugio}</Text>
				<Text style={styles.other_text}>{salida.personas_necesarias}</Text>
				<Text style={styles.other_text}>{salida.coches_inscritos}</Text>
			</View>
		</View>
	);
}

export default SalidaDetail;

const styles = StyleSheet.create({
	overall: {
		marginBottom: 70
	},
	detalle_text: {
		textAlign: "left",
		color: "black",
		fontSize: 24,
		marginTop: 20
	},
	other_text: {
		textAlign: "left",
		color: "black",
		fontSize: 16,
		marginTop: 20,
		marginLeft: 20
	}
});
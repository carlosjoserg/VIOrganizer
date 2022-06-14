import * as React from "react";
import { Text, View, StyleSheet, Image, SectionList, TouchableOpacity, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from "expo-constants";
import I18n from "../i18n";

const REFUGIOS_DATA = [
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1",
		refugio: "ASS",
		nombre: "Animals \n sense sostre",
		ubicacion: "21-May-2021",
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2",
		refugio: "PE",
		nombre: "Projecte \n Emphatia",
		ubicacion: "21-May-2021",
	},
];

const REFUGIOS_PUNTUAL_DATA = [
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba3",
		refugio: "O",
		nombre: "Odena",
		ubicacion: "21-May-2021",
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba4",
		refugio: "L4P",
		nombre: "Life4Pitbulls",
		ubicacion: "21-May-2021",
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba5",
		refugio: "A",
		nombre: "Arda",
		ubicacion: "21-May-2021",
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba6",
		refugio: "R24h",
		nombre: "Rodamons 24h",
		ubicacion: "21-May-2021",
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba7",
		refugio: "SO",
		nombre: "Segundas \n Oportunidades",
		ubicacion: "21-May-2021",
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba8",
		refugio: "FHH",
		nombre: "Fundación \n Hope&Help",
		ubicacion: "21-May-2021",
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba9",
		refugio: "PAT",
		nombre: "Protectora \n d`Animals  \n de Tàrrega",
		ubicacion: "21-May-2021",
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba0",
		refugio: "SCR",
		nombre: "Segarra-Cervera refugi",
		ubicacion: "21-May-2021",
	},
];

const DATA = [
	{
		title: 'Protectoras y entidades con actuaciones regulares',
		data: REFUGIOS_DATA
	},
	{
		title: 'Colaboraciones puntuales',
		data: REFUGIOS_PUNTUAL_DATA
	}
]

const Refugio = ({ refugio }) => (
	<TouchableOpacity onPress={() => Alert.alert("Informacion sobre " + refugio.nombre)}>
		<View
			style={
				[
					{ flexDirection: "row" },
					{ justifyContent: "space-around" },
					{ alignContent: "center" },
					{ margin: 10 },
				]
			} >
			<View style={[{ flexDirection: "column" }, { justifyContent: "center" }, { alignContent: "center" }]}>
				<Image style={styles.logos} source={require("../assets/snack-icon.png")} />
				<Text style={styles.refugio}>{refugio.nombre}</Text>
			</View>
		</View>
	</TouchableOpacity>
);

export default function Refugios()
{
	const renderItem = ({ item }) => <Refugio refugio={item} />;
	//const insets = useSafeAreaInsets();
	return (
		<View style={{marginTop: 46}}>
			{/* sticky header */}
			<View style={[{ backgroundColor: "white" }, { alignItems: "center" }]}>
				<Image style={styles.logo} source={require("../assets/logo.jpg")} />
			</View>

			<SectionList
				sections={DATA}
				renderItem={renderItem}
				keyExtractor={(item, index) => item + index}
				horizontal={false}
				renderSectionHeader={({ section: { title } }) => <Text style={styles.paragraph}>{title}</Text>}
				/>

			<View style={styles.userDiagnostics}>
				<Text style={styles.userDiagnosticsText}>
				{I18n.locale} {Constants.manifest.version} {Constants.manifest.revisionId}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create(
{
	container: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 24,
		padding: 10,
	},
	paragraph:
	{
		marginTop: 18,
		marginBottom: 30,
		fontSize: 20,
		textAlign: "left",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		backgroundColor: "white",
	},
	scrollView: {
		marginTop: 24,
	},
	logos:
	{
		height: 75,
		width: 75,
		alignItems: "center",
		justifyContent: "center",
		margin: 10,
	},
	userDiagnostics:
	{
		alignSelf: "center",
		paddingBottom: 30,
	},
	userDiagnosticsText:
	{
		alignSelf: "center",
		color: "gray",
	},
	logo:
	{
		height: 128,
		width: 128,
		alignItems: "center",
		justifyContent: "center",
		margin: 24,
	},
	refugio:
	{
		fontSize: 16,
		textAlign: "center",
	},
});

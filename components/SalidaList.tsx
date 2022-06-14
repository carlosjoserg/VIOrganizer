import * as React from "react";
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Image, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import firebase from "../lib/firebase";
import Salida from "./SalidaCard";

function SalidaList({route, navigation})
{
	const insets = useSafeAreaInsets();
	const [isFetching, setIsFetching] = useState(false);
	const [isEnabled, setIsEnabled] = useState(false);
	const [SALIDAS_DATA, SetSalidas] = useState([]);
	const [SALIDAS_APUNTADAS_DATA, SetSalidasApuntadas] = useState([]);

	function renderSalida({item})
	{
		return <Salida salida={item} />;
	}
	
	function toggleSwitch(): any
	{
		setIsEnabled((previousState) => !previousState);
		updateSalidas();
		return;
	}

	const Header = () => (
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
	)

	function updateSalidas()
	{
		firebase.db.collection("salidas").onSnapshot((querySnapshot) =>
		{
			let SALIDAS_DATA_QUERY = [];
			let SALIDAS_APUNTADAS_DATA_QUERY = [];
			querySnapshot.docs.forEach((doc) =>
			{
				SALIDAS_DATA_QUERY.push(doc);
				/*doc.data().personas_inscritas?.forEach( (mobile) =>
				{
					if( mobile === firebase.firebase.auth().currentUser?.phoneNumber?.substring(3, 12) )
					{
						SALIDAS_APUNTADAS_DATA_QUERY.push(doc.data());
					}
				});*/
			});

			SetSalidas(SALIDAS_DATA_QUERY);
			// SetSalidasApuntadas(SALIDAS_APUNTADAS_DATA_QUERY);
		});
	}

	const onRefresh = async () => {
		setIsFetching(true);
		updateSalidas();
		setIsFetching(false);
		console.log("refreshing");
	};

	useEffect(() =>
	{
		updateSalidas();
		navigation.addListener('tabPress', (e) => {
			console.log("update salidas");
			updateSalidas();
		});
	},
	[]);

	return (
		<View style={[{ flexDirection: "column" }, { marginTop: insets.top }, styles.overall]}>
			<FlatList
				data={SALIDAS_DATA}
				onRefresh={onRefresh}
				renderItem={renderSalida}
				refreshing={isFetching}
				extraData={SALIDAS_DATA}
				keyExtractor={(item) => item.id}
				ListHeaderComponent={() => (
					<Header />
				)}
			/>
		</View>
	);
}

export default SalidaList;

const styles = StyleSheet.create(
{
	overall:
	{
		marginBottom: 70
	},
	selector_text:
	{
		textAlign: "right",
		marginTop: 5,
		marginRight: 5
	},
	selector_control:
	{
		textAlign: "right",
		marginRight: 50
	},
	vilogo:
	{
		height: 50,
		width: 50,
		marginLeft: 40,
		marginTop: 20,
		marginBottom: 10,
		alignContent: "center",
		alignItems: "center"
	}
});

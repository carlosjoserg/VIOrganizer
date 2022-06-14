import * as React from "react";
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, Button} from "react-native";

import { Avatar } from "react-native-elements";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import firebase from "../lib/firebase";

import { Ionicons } from "@expo/vector-icons";

function SalidaDetail ({route, navigation}): JSX.Element
{
	const insets = useSafeAreaInsets();

	const [messages, setMessages] = useState([]);
	const [salida, setSalida] = useState(route.params.current_salida.data());
	const [salida_id, setSalidaId] = useState(route.params.current_salida.id);

	const [image, setImage] = useState(false);

	function isItMe(number)
	{
		if( firebase.firebase.auth().currentUser?.phoneNumber?.substring(3, 12) === number)
			return true;
		else
			return false;
	}

	function getOtherAvatar(number)
	{
		console.log(number);
		let imageRef = firebase.storage.ref("avatar-" + number);
			imageRef
				.getDownloadURL()
				.then((url) => {
					return url;
				})
				.catch((e) => console.log('getting downloadURL of image error => ', e));
	}

	function renderMessage({item})
	{
		return (
			<>
				{
					<Text style={styles.stamp}>{item.stamp.toDate().toDateString()}</Text>
				}

				{
					isItMe(item.id) &&
					<View style={[{flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: "lightgrey", marginRight: 10}]}>
						<Avatar source={{uri: image.profileimageUrl}} rounded size="small" />
						<Text style={styles.my_msg}>{item.message}</Text>
					</View>
				}

				{
					!isItMe(item.id) &&
					<View style={[{flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: "lightgrey", marginLeft: 10}]}>
						<Avatar source={{uri: "https://firebasestorage.googleapis.com/v0/b/viorganizerbackend.appspot.com/o/avatar-999999999?alt=media&token=c9abb718-f45a-49f4-9b57-f729f26d56fb"}} rounded size="small" />
						<Text style={styles.other_msg}>{item.message}</Text>
					</View>
				}
			</>
		);
	}

	const [text, onChangeText] = useState('');

	function sendMessage()
	{
		// console.log("sending message");
		firebase.db.collection("salidas").doc(salida_id).collection("conversation").add(
			{
				id: firebase.firebase.auth().currentUser?.phoneNumber?.substring(3,12),
				message: text,
				stamp: new Date()
			}
		).then(() => {onChangeText('');}

		)
	}

	useEffect(() =>
	{
			firebase.db.collection("salidas").doc(salida_id).collection("conversation").orderBy('stamp', 'desc').onSnapshot( (snapshot) =>
			{
				let messages_query = [];
				snapshot.docs.forEach((doc) =>
				{
					// console.log('querying messages...');
					// console.log(doc.data());
					messages_query.push(doc.data());

				});
				setMessages(messages_query);
			});

			const current_mobile_phone = firebase.firebase.auth().currentUser?.phoneNumber?.substring(3, 12); // '606909265'; // text.substr(3, 12);
			let imageRef = firebase.storage.ref("avatar-" + current_mobile_phone);
			imageRef
				.getDownloadURL()
				.then((url) => {
					setImage({ profileimageUrl: url});
				})
				.catch((e) => console.log('getting downloadURL of image error => ', e));

			// console.log("curren user mobile without country code: " + firebase.firebase.auth().currentUser?.phoneNumber?.substring(3,12));
	},
	[]);

	return (
		<View style={[{ marginTop: insets.top }, styles.overall, { flexDirection: "column" }]}>
			<View style={[{ flexDirection: "row" }, { justifyContent: "flex-start" }, { backgroundColor: "white" }, {alignContent: "center"}]}>
				<TouchableOpacity onPress={() => navigation.navigate("Trips")} >
					<Ionicons style={[{padding: 20}]} name="arrow-back" size={36} color="black" />
				</TouchableOpacity>
				<Text style={styles.detalle_text}>{salida.title}</Text>
			</View>

			<View style={[{ flexDirection: "column" }, { justifyContent: "center" }, {alignContent: "center"}]}>
				<Text style={styles.other_text}>Fecha: {salida.fecha.toDate().toDateString()}</Text>
				<Text style={styles.other_text}>Refugio: {salida.refugio}</Text>
				<Text style={styles.other_text}>Personas Necesarias: {salida.personas_necesarias}</Text>
				<Text style={styles.other_text}>Coches inscritos: {salida.coches_inscritos}</Text>
			</View>

			<TextInput style={styles.input_text} onChangeText={onChangeText} value={text} />

			<Button
				title="Send"
				color="#f194ff"
				onPress={sendMessage}
			/>
			<FlatList
					data={messages}
					renderItem={renderMessage}
					keyExtractor={(item, index) => item.id + index}
			/>
		</View>
	);
}

export default SalidaDetail;

const styles = StyleSheet.create(
{
	overall:
	{
		marginBottom: 70,
		backgroundColor: "lightgrey",
	},
	detalle_text:
	{
		textAlign: "left",
		color: "black",
		fontSize: 24,
		marginTop: 20
	},
	other_text:
	{
		textAlign: "left",
		color: "black",
		fontSize: 16,
		marginTop: 20,
		marginLeft: 20
	},
	input_text:
	{
		textAlign: "left",
		backgroundColor: "grey",
		color: "cyan",
		fontSize: 16,
		marginTop: 20,
		height: 40
	},
	my_msg:
	{
		textAlign: "right",
		backgroundColor: "green",
		color: "white",
		fontSize: 14,
		height: 30,
	},
	other_msg:
	{
		textAlign: "left",
		backgroundColor: "blue",
		color: "white",
		fontSize: 14,
		height: 30,
	},
	stamp:
	{
		textAlign: "center",
		backgroundColor: "lightgrey",
		color: "white",
		fontSize: 12,
		height: 15,
	}
});

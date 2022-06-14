
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Switch, TouchableOpacity} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Modal from "react-native-modal";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Avatar } from "react-native-elements";
import NumericInput from 'react-native-numeric-input';

import * as ImagePicker from "expo-image-picker";

import TypeformEmbed from "react-native-typeform-embed"

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import firebase from "../lib/firebase";



export default function Perfil()
{

	{/** definir collección de roles y de usuarios, y las pantallas tendrán diferentes opciones de acuerdo a los roles */}
	{/** Dummy struct to initialize the app, but useEffect overwrites these values as soon as it executes the snapshot */}

	const [registered, setRegistered] = useState(false);

	const [state, setState] = useState(
	{
		movil: "",
		nombre: "",
		casa: {latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0},
		nro_socio: "",
		roles: [""],
		tengo_coche: false,
		plazas_coche: 0
	});

	const [image, setImage] = useState(false);

	const getUserById = async () =>
	{
		const dbRef = firebase.db.collection("users").doc(current_mobile_phone);
		const doc = await dbRef.get();
		setState(doc.data());
	};

	{/** Only available to those with junta role */}
	const createUser = async () =>
	{
		try {
			await firebase.db.collection("users").add(state);
		}
		catch (error)
		{
			console.log(error)
		}
	};

	const updateInfo = async () =>
	{
		const userRef = firebase.db.collection("users").doc(state.movil);
		await userRef.set(state);
	};

	const changeProfilePic = async () =>
	{
		const current_mobile_phone = firebase.firebase.auth().currentUser?.phoneNumber?.substring(3, 12); // '606909265'; // text.substr(3, 12);
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [1, 1],
		});
		console.log("just picking... ");
		//
		console.log(pickerResult);

		if (!pickerResult.cancelled && pickerResult.type === 'image')
		{
			// const uploadUrl = await uploadImageAsync();
			console.log(pickerResult.uri);
			const response = await fetch(pickerResult.uri);
			const blob = await response.blob();
			const storageRef = await firebase.storage.ref("avatar-" + current_mobile_phone).put(blob).then(
				console.log("blob uploaded")
			)

			let imageRef = firebase.storage.ref("avatar-" + current_mobile_phone);
			imageRef
				.getDownloadURL()
				.then((url) => {
					setImage({ profileimageUrl: url});
				})
				.catch((e) => console.log('getting downloadURL of image error => ', e));

			// console.log(image.profileimageUrl)
		}
	}


	{/** modal/edit controls */}
	const [plazasVisible, setPlazasVisible] = useState([]);
	const [casaVisible, setCasaVisible] = useState([]);

	const insets = useSafeAreaInsets();

	useEffect(() =>
	{
			const current_mobile_phone = firebase.firebase.auth().currentUser?.phoneNumber?.substring(3, 12); // '606909265'; // text.substr(3, 12);

			firebase.db.collection("users").onSnapshot((querySnapshot) =>
			{
				const users = [];
				querySnapshot.docs.forEach((doc) =>
				{
					console.log('querying docs...');
					console.log(doc.id);
					if(  doc.id === current_mobile_phone )
					{
						setState(doc.data());
						setRegistered(true);
						console.log('registered user');
					}
				});

			});

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
		<View style={[{marginTop: insets.top}, {flexDirection: 'column'}, styles.container]}>

		{/** Modal para cambiar numero de plazas, solo permite cambiar si no está apuntado a una salida */}
		<View style={styles.centeredView}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={plazasVisible}
				onBackdropPress={() => {setPlazasVisible(false); updateInfo();}} >
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>{"Número de plazas libres:"}</Text>
							<NumericInput
								value={state.plazas_coche}
								onChange={value => {setState({...state,plazas_coche: value});}}
								minValue={0}
								maxValue={9}
								totalWidth={240}
								totalHeight={50}
								iconSize={25}
								step={1}
								type='plus-minus'
								editable={true}
								valueType='integer'
								rounded
								textColor='#B0228C'
								iconStyle={{ color: 'white' }}
								rightButtonBackgroundColor='tomato'
								leftButtonBackgroundColor='orange'/>
					</View>
				</View>
			</Modal>
		</View>

		{/** Modal para cambiar dirección, solo permite cambiar si no está confirmado a una salida */}
		<View style={styles.centeredView}>
			<Modal
			animationType="fade"
			transparent={true}
			visible={casaVisible}
			onBackdropPress={() => {setCasaVisible(false); updateInfo();} } >
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>{"Haz click en tu ubicación preferente:"}</Text>
						{/** DEBUGING COORDS <Text style={styles.modalText}>{state.casa.latitude}, {state.casa.longitude}, {state.casa.latitudeDelta}, {state.casa.longitudeDelta}</Text> */}
						<View style={styles.container}>
							<MapView
								style={styles.map}
								liteMode={false}
								mapType={"standard"}
								showsUserLocation={true}
								showsMyLocationButton={true}
								region={state.casa}
								onPress={ e => {
											setState({...state,
												casa: {
													latitude: e.nativeEvent.coordinate.latitude,
													longitude: e.nativeEvent.coordinate.longitude,
													latitudeDelta: state.casa.latitudeDelta,
													longitudeDelta: state.casa.longitudeDelta
												}
											}
										);
										setCasaVisible(false);
										updateInfo();
									}
								}
								onRegionChangeComplete={ e => {
												setState({...state,
													casa: {
														latitude: e.latitude,
														longitude: e.longitude,
														latitudeDelta: e.latitudeDelta,
														longitudeDelta: e.longitudeDelta
													}
												});
											}
										}
							/>
							</View>

					</View>
				</View>
			</Modal>
		</View>

		{ registered && 
		<>
		<TouchableOpacity onPress={changeProfilePic}>
			<Avatar source={{uri: image.profileimageUrl}} rounded size="xlarge" />
		</TouchableOpacity>
		<Text style={styles.nombre}>{state.nombre}</Text>

		<Text style={styles.socio}>Socio #{state.nro_socio}</Text>

		<TouchableOpacity onPress={() => {setCasaVisible(true);}}>
			<View style={[{flexDirection: 'column'}]}>
				{/**<Entypo style={[{textAlign: 'center'}]} name="location" size={50} color="black" />
					<Text style={styles.casa}>{state.casa.latitude}, {state.casa.longitude}</Text> */}
				<View style={styles.container}>
				<MapView
					style={styles.mapthumb}
					mapType={"standard"}
					region={state.casa} >
					<Marker
						key={111}
						coordinate={{ latitude : state.casa.latitude , longitude : state.casa.longitude }} >
						<View>
							<Entypo style={[{textAlign: 'center'}]} name="location" size={50} color="tomato" />
						</View>
					</Marker>

				</MapView>
				</View>
			</View>
		</TouchableOpacity>

		<View style={[{flexDirection: 'row'}, {alignContent: 'center'}, {alignItems: 'center'}]}>
			<FontAwesome5 name="walking" size={40} color={state.tengo_coche ? 'lightgrey' : 'tomato'} />
			<Switch style={styles.selector}
				trackColor={{ false: '#767577', true: '#767577' }}
				thumbColor={state.tengo_coche ? '#f5dd4b' : '#f5dd4b'}
				ios_backgroundColor="#3e3e3e"
				onValueChange={value => {setState({...state,tengo_coche: value});}}
				value={state.tengo_coche} />

				{
					state.tengo_coche && updateInfo() &&

					<TouchableOpacity onPress={() => { setPlazasVisible(true);}}>
						<View style={{flexDirection: 'row'}}>
							<FontAwesome name="car" size={40} color='tomato' />
							<MaterialCommunityIcons name="car-seat" size={18} color="tomato" />
							<Text style={[{color: 'tomato'}]}>x{state.plazas_coche}</Text>
						</View>
					</TouchableOpacity>

				}

				{
					!(state.tengo_coche) && updateInfo() &&

					<View style={{flexDirection: 'row'}}>
						<FontAwesome name="car" size={40} color='lightgrey' />
						<MaterialCommunityIcons name="car-seat" size={18} color="lightgrey" />
						<Text style={[{color: "lightgrey"},]}>x{state.plazas_coche}</Text>
					</View>
				}
			</View>
			</>
			}

			{
				!registered &&

				<>
				<TypeformEmbed
					url="https://voluntarioitinerante.typeform.com/to/WmY0YJ"
					onSubmit={() => alert("Submitted!")}
					onClose={() => alert("Closed!")}
					/>
				</>
			}

		</View>
	);
}

const styles = StyleSheet.create(
{
	container:
	{
		alignItems: 'center',
		justifyContent: 'center',
		padding: 12,
	},
	socio:
	{
		margin: 24,
		fontSize: 24,
		textAlign: 'center',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#20232a',
		padding: 10,
	},
	nombre:
	{
		margin: 24,
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	selector:
	{
		textAlign: 'center',
		alignContent: 'center',
		alignItems: 'center',
		margin: 20,
	},
	centeredView:
	{
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView:
	{
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset:
		{
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	modalText:
	{
		marginBottom: 15,
		textAlign: "center"
	},
	map:
	{
		width: 300,
		height: 400,
	},
	mapthumb:
	{
		width: 300,
		height: 150,
	},
});

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, Image, Switch, Alert, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Dimensions, InteractionManager} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Modal from "react-native-modal";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Avatar } from "react-native-elements";
import Dialog, { DialogButton, DialogContent } from 'react-native-popup-dialog';
import NumericInput from 'react-native-numeric-input';

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import firebase from "../lib/firebase";

export default function Perfil() {

	{/** definir collección de roles y de usuarios, y las pantallas tendrán diferentes opciones de acuerdo a los roles */}
	{/** Dummy struct to initialize the app, but useEffect overwrites these values as soon as it executes the snapshot */}
	type userData = {
		movil: string,
		nombre: string,
		casa: {latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number},
		nro_socio: string,
		roles: string[],
		tengo_coche: boolean,
		plazas_coche: number
	};

	const [state, setState] = useState({
      movil: "",
      nombre: "",
      casa: {latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0},
      nro_socio: "",
      roles: [""],
      tengo_coche: false,
      plazas_coche: 0
    });

	{/** Firebase auth se encargará de verificar éste número, y a partir de allí, la app quedará registrada con ése número */}
	const current_mobile_phone = '606909265';
	const getUserById = async () => {
		const dbRef = firebase.db.collection("users").doc(current_mobile_phone);
		const doc = await dbRef.get();
		setState(doc.data());
	};

	{/** Only available to those with junta role */}
	const createUser = async () => {
		try {
			await firebase.db.collection("users").add(state);
		} catch (error) {
			console.log(error)
		}
	};

	const updateInfo = async () => {
		const userRef = firebase.db.collection("users").doc(state.movil);
		await userRef.set(state);
	};

	{/** modal/edit controls */}
	const [plazasVisible, setPlazasVisible] = useState([]);
	const [casaVisible, setCasaVisible] = useState([]);

	const insets = useSafeAreaInsets();

	useEffect(() => {
			firebase.db.collection("users").onSnapshot((querySnapshot) => {
			const users = [];
			querySnapshot.docs.forEach((doc) => {
				if(  doc.data().movil === current_mobile_phone )
					setState(doc.data());
			});
		});
	}, []);

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

		<TouchableOpacity onPress={() => {Alert.alert("Changing profile pic not implemented yet")}}>
			<Avatar source={require('../assets/snack-icon.png')} rounded size="xlarge" />
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

				{state.tengo_coche && updateInfo() &&
					<TouchableOpacity onPress={() => { setPlazasVisible(true);}}>
						<View style={{flexDirection: 'row'}}>
							<FontAwesome name="car" size={40} color='tomato' />
							<MaterialCommunityIcons name="car-seat" size={18} color="tomato" />
							<Text style={[{color: 'tomato'}]}>x{state.plazas_coche}</Text>
						</View>
					</TouchableOpacity>

				}

				{!(state.tengo_coche) && updateInfo() &&
					<View style={{flexDirection: 'row'}}>
						<FontAwesome name="car" size={40} color='lightgrey' />
						<MaterialCommunityIcons name="car-seat" size={18} color="lightgrey" />
						<Text style={[{color: "lightgrey"},]}>x{state.plazas_coche}</Text>
					</View>
				}
			</View>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 12,
	},
	socio: {
		margin: 24,
		fontSize: 24,
		textAlign: 'center',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#20232a',
		padding: 10,
	},
	nombre: {
		margin: 24,
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	selector: {
		textAlign: 'center',
		alignContent: 'center',
		alignItems: 'center',
		margin: 20,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	map: {
		width: 300,
		height: 400,
	},
	mapthumb: {
		width: 300,
		height: 150,
	},
});

/** react */
import * as React from "react";
import { useState, useEffect } from 'react';
import { Text, TextInput } from "react-native-paper";
import { View, Image, StyleSheet, Button, TouchableOpacity } from "react-native";

/** react-navigation */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

/** iconsets */
import { Ionicons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

/** screens */
import News from "./screens/Noticias";
import SalidaList from "./components/SalidaList";
import SalidaDetail from "./components/SalidaDetail";
import Refugios from "./screens/Refugios";
import Perfil from "./screens/Perfil";

/** translation */
import I18n from "./i18n";

/** firebase auth and captcha */
import firebase from "./lib/firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();




export default function App() {

	const [firstRun, setFristRun] = React.useState(true);
	const [sentCode, setsentCode] = React.useState(false);
	const recaptchaVerifier = React.useRef(null);
	const [phoneNumber, setPhoneNumber] = React.useState();
	const [verificationId, setVerificationId] = React.useState();
	const [verificationCode, setVerificationCode] = React.useState();

	const firebaseConfig = firebase.firebase.app().options;

	const [message, showMessage] = React.useState((!firebaseConfig || Platform.OS === 'web')? { text: ""} : undefined);

	function checkSignInStatus()
	{
		firebase.firebase.auth().onAuthStateChanged(function(user) {
			if(user)
			{
				setFristRun(false);
				setsentCode(true);
			}
			else
			{
				setFristRun(true);
				setsentCode(false);
			}
		});
	}

	function Home() {

		return(<Tab.Navigator
			initialRouteName="Profile"
			activeColor="tomato"
			inactiveColor="gray"
			shifting={false}
			barStyle={{ backgroundColor: "white" }}
			screenOptions={({ route }) => {
				return ({
					headerStyle: {
						height: 0
					},
					tabBarIcon: ({ focused, color }): JSX.Element | undefined => {
						if (route.name === "News") {
							return <Ionicons
										name={focused ? "ios-information-circle" : "ios-information-circle-outline"}
										size={24}
										color={color}
									/>;
						} else if (route.name === "Trips") {
							return <Foundation
										name={focused ? "guide-dog" : "guide-dog"}
										size={28}
										color={color} />;
						} else if (route.name === "Shelters") {
							return <MaterialCommunityIcons
										name={focused ? "shield-home" : "shield-home-outline"}
										size={24}
										color={color}
									/>;
						} else if (route.name === "Profile") {
							return <FontAwesome
										name={focused ? "id-card" : "id-card-o"}
										size={20}
										color={color}
									/>;
						}
					}
				});
			}}>

			<Tab.Screen
				name="Profile"
				component={Perfil}
				options={{ title: "", tabBarLabel: I18n.t("perfil") }}
			/>

			<Tab.Screen
				name="Trips"
				component={SalidaList}
				options={{ title: "", tabBarLabel: I18n.t("salidas") }}
			/>

			<Tab.Screen
				name="Shelters"
				component={Refugios}
				options={{ title: "", tabBarLabel: I18n.t("refugios") }}
			/>

			<Tab.Screen
				name="News"
				component={News}
				options={{ title: "", tabBarLabel: I18n.t("noticias"), tabBarBadge: 1 }}
			/>

		</Tab.Navigator>)
	}

	useEffect(() =>
	{
		checkSignInStatus();
		if( firebase.firebase.auth().currentUser?.phoneNumber )
		{
			setFristRun(false);
			setsentCode(true);
		}
	},
	[]);

	return (
		<NavigationContainer>

			{
				firstRun &&
				<>
				<FirebaseRecaptchaVerifierModal
						ref={recaptchaVerifier}
						firebaseConfig={firebaseConfig}
						cancelLabel='Cerrar' />

				<View style={[{marginTop: 46}, styles.container]}>
					<Image style={styles.logo} source={require('./assets/logo.jpg')} />
				</View>
				</>
			}

			{
				firstRun && !sentCode &&

				<>

				<Text style={{ marginTop: 46, fontSize: 14, textAlign: 'center' }}>Primera vez usando la app? Abre sesión con tu móvil:</Text>

				<TextInput
					style={{ marginVertical: 10, fontSize: 25, textAlign: 'center' }}
					placeholder="+34?????????"
					autoFocus
					autoCompleteType="tel"
					keyboardType="phone-pad"
					textContentType="telephoneNumber"
					onChangeText={(phoneNumber) => {
						setPhoneNumber(phoneNumber);
						checkSignInStatus();
						}
					} />

				<Button
					title="Enviar código de verificación"
					disabled={!phoneNumber && !verificationId}
					onPress={
						async () => {
							// The FirebaseRecaptchaVerifierModal ref implements the
							// FirebaseAuthApplicationVerifier interface and can be
							// passed directly to `verifyPhoneNumber`.
							try
							{
								// console.log("sending verification code to " + phoneNumber);
								const phoneProvider = firebase.auth_provider;
								const verificationId = await phoneProvider.verifyPhoneNumber( phoneNumber, recaptchaVerifier.current );
								setVerificationId(verificationId);
								showMessage({ text: "Verification code has been sent to your phone." });
								setsentCode(true);
							}
							catch (err)
							{
								showMessage({ text: `Error: ${err.message}`, color: "red" });
								console.log(`${err.message}`)
							}
						}
					} />

					{ /** message ? (
					<TouchableOpacity
						style={[StyleSheet.absoluteFill, { backgroundColor: 0xffffffee, justifyContent: "center" }]}
						onPress={() => {showMessage(undefined); setsentCode(true);}}>
						<Text style={{color: message.color || "blue", fontSize: 17, textAlign: "center", margin: 20, }}>
						{message.text}
						</Text>
					</TouchableOpacity>
					) : undefined  **/}
				</>
			}

			{
				firstRun && sentCode &&

				<>
				<Text style={{ marginTop: 20, textAlign: 'center', fontSize: 14}}>Introduce Código de Verificación</Text>

				<TextInput
					style={{ marginVertical: 10, fontSize: 25, textAlign: 'center' }}
					editable={!!verificationId}
					placeholder="######"
					keyboardType="number-pad"
					autofocus
					onChangeText={setVerificationCode} />

				<Button
					title="Confirmar Código"
					disabled={!verificationCode}
					onPress={async () => {
						try
						{
							const credential = firebase.firebase.auth.PhoneAuthProvider.credential( verificationId, verificationCode );
							await firebase.firebase.auth().signInWithCredential(credential);
							showMessage({ text: "Phone authentication successful 👍" });
							setFristRun(false);
						}
						catch (err)
						{
							showMessage({ text: `Error: ${err.message}`, color: "red" });
							console.log(`${err.message}`)
						}
					} } />

				<Text style={{ marginTop: 2, textAlign: 'center', fontSize: 2}}></Text>
				<Button

					title="Cancelar"
					color="grey"
					disabled={!verificationId}
					onPress={async () => {
						try
						{
							setFristRun(true);
							setsentCode(false);
						}
						catch (err)
						{
							showMessage({ text: `Error: ${err.message}`, color: "red" });
						}
					} } />

					{/** message ? (
					<TouchableOpacity
						style={[StyleSheet.absoluteFill, { backgroundColor: 0xffffffee, justifyContent: "center" }]}
						onPress={() => {showMessage(undefined); }}>
						<Text style={{color: message.color || "blue", fontSize: 17, textAlign: "center", margin: 20, }}>
						{message.text}
						</Text>
					</TouchableOpacity>
					) : undefined **/}
				</>
			}

			{
				!firstRun &&

				<Stack.Navigator
					initialRouteName="Home"
					screenOptions={
						{
							headerShown: false
						}
					}
				>

					<Stack.Screen
							name="Home"
							component={Home}
							options={{ title: ""}}
						/>

					<Stack.Screen
							name="SalidaDetail"
							component={SalidaDetail}
							options={{ title: ""}}
						/>
				</Stack.Navigator>
			}
		</NavigationContainer>
	);
}

const styles = StyleSheet.create(
	{
		container:
		{
			alignItems: 'center',
			justifyContent: 'center',
			padding: 24,
			backgroundColor: 'white',
		},
		logo:
		{
			height: 128,
			width: 128,
		}
	});

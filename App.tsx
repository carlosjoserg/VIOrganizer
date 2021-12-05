/** react */
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

/** expo */
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Contacts from "expo-contacts";

/** react-navigation */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/** iconsets */
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

/** screens/components */
import News from "./screens/Noticias";
import Salidas from "./screens/Salidas";
import Refugios from "./screens/Refugios";
import Perfil from "./screens/Perfil";

import I18n from "./i18n";

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Profile"
				barStyle={{ paddingBottom: 0 }}
				screenOptions={({ route }) => ({
					headerStyle: {
						height: 0,
					},
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === "News") {
							iconName = focused ? "ios-information-circle" : "ios-information-circle-outline";
							return <Ionicons name={iconName} size={24} color={color} />;
						} else if (route.name === "Trips") {
							iconName = focused ? "guide-dog" : "guide-dog";
							return <Foundation name={iconName} size={24} color={color} />;
						} else if (route.name === "Shelters") {
							iconName = focused ? "shield-home" : "shield-home-outline";
							return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
						} else if (route.name === "Profile") {
							iconName = focused ? "id-card" : "id-card-o";
							return <FontAwesome name={iconName} size={24} color={color} />;
						}
					},
					tabBarActiveTintColor: "tomato",
					tabBarInactiveTintColor: "gray",
				})}>
				<Tab.Screen name="Profile" component={Perfil} options={{ title: "", tabBarLabel: I18n.t("perfil") }} />
				<Tab.Screen name="Trips" component={Salidas} options={{ title: "", tabBarLabel: I18n.t("salidas") }} />
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
			</Tab.Navigator>
		</NavigationContainer>
	);
}

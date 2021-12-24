/** react */
import * as React from "react";

/** react-navigation */
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

/** iconsets */
import { Ionicons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

/** screens */
import News from "./screens/Noticias";
import Salidas from "./screens/Salidas";
import Refugios from "./screens/Refugios";
import Perfil from "./screens/Perfil";

/** translation */
import I18n from "./i18n";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
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
					component={Salidas}
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
			</Tab.Navigator>
		</NavigationContainer>
	);
}

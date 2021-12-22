import * as React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import SalidaList from "../components/SalidaList";
import SalidaDetail from "../components/SalidaDetail";

export default function Salidas() {
	return (
		<Stack.Navigator initialRouteName="Salidas">
			<Stack.Screen name="Salidas" component={SalidaList} options={{headerShown: false}} />
			<Stack.Screen name="SalidaDetail" component={SalidaDetail} options={{headerShown: false}} />
		</Stack.Navigator>
	);
}

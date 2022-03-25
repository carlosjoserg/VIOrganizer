import * as React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import SalidaList from "../components/SalidaList";
import SalidaDetail from "../components/SalidaDetail";

export default function Salidas()
{
	return (
		<Stack.Navigator initialRouteName="Salidas">
			<Stack.Screen name="Salidas" component={SalidaList} options={{headerShown: false}} />
			<Stack.Screen name="SalidaDetail" component={SalidaDetail} options={{headerShown: false}} />
		</Stack.Navigator>
	);
}

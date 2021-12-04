import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Image, Switch, Alert, TouchableOpacity} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar } from "react-native-elements";

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const PERFIL_DATA = {
  id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  nombre: "John Doe",
  casa: "Paseo San Juan 116, 08027 Barcelona",
  nro_socio: "84",
  tengo_coche: false,
  plazas_coche: 4,
};

export default function Perfil() {

  const [current_user, setUser] = useState([]);

  const initalState = {
    nombre: "",
    direccion: "",
    telefono: "",
    nro_socio: "",
    tengo_coche: "",
    plazas_libres_coche: 3,
  };

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const [state, setState] = useState(initalState);

  const insets = useSafeAreaInsets();
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View style={[{marginTop: insets.top}, {flexDirection: 'column'}, styles.container]}>
      <Avatar source={require('../assets/snack-icon.png')} rounded />
      <Text style={styles.nombre}>
        {PERFIL_DATA.nombre}
      </Text>

      <Text style={styles.socio}>Socio #{PERFIL_DATA.nro_socio}</Text>

      <TouchableOpacity onPress={() => Alert.alert("Cambiar dirección habitual: " + PERFIL_DATA.casa)}>
        <View style={[{ flexDirection: "column" }]}>
          <MaterialIcons style={[{ textAlign: "center" }]} name="home" size={50} color="black" />
          <Text style={styles.casa}>{PERFIL_DATA.casa}</Text>
        </View>
      </TouchableOpacity>

      <View style={[{ flexDirection: "row" }, { alignContent: "center" }, { alignItems: "center" }]}>
        <FontAwesome5 name="walking" size={40} color={isEnabled ? "lightgrey" : "black"} />
        <Switch
          style={styles.selector}
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f5dd4b"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />

        {isEnabled && (
          <TouchableOpacity onPress={() => Alert.alert("Plazas disponibles? " + PERFIL_DATA.plazas_coche)}>
            <FontAwesome name="car" size={40} color="black" />
          </TouchableOpacity>
        )}

        {!isEnabled && <FontAwesome name="car" size={40} color="lightgrey" />}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  socio: {
    margin: 24,
    fontSize: 24,
    textAlign: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#20232a",
    padding: 10,
  },
  nombre: {
    margin: 24,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  casa: {
    margin: 24,
    fontSize: 24,
    textAlign: "center",
  },
  logo: {
    height: 128,
    width: 128,
    margin: 24,
  },
  selector: {
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    margin: 20,
  }
});

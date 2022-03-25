import { PhoneNumber, Date } from "expo-contacts";

export declare type  CocheDato = {
	conductor?: string;
	capacidad_asientos?: number;
	/** asientos_libres: number; se calcula de capacidad - sizeof(ocupantes)**/
	ocupantes: string[];
}

export interface Usuario {
	nombre: String;
	movil: PhoneNumber;
	casa: {latitude: Number, longitude: Number, latitudeDelta: Number, longitudeDelta: Number};
	nro_socio: String;
	roles: Array<String>;
	tengo_coche: Boolean;
	coche: CocheDato;
	plazas_coche: Number; /** el CocheDato ya tiene éste valor */
}

export interface SalidasDato {
	id: string;
	title: String;
	refugio: String;
	cuando: Date;
	referente: String;
	tareas: Array<String>; /** se rellenan con las tareas regulares del refugio seleccionado, los admin las pueden modificar */
	personas_necesarias: Number;
	personas_inscritas: Array<Usuario>;
	coches_inscritos: Number; /** quitar en algún momento, se calcula con sizeof(coches) */
	coches: CocheDato[];
	asientos_libres: Number; /** se puede calcular  */
	confirmada: Boolean;
}



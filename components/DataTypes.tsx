type CocheDato =
{
	conductor: string;
	capacidad_asientos: number;
	/** asientos_libres: number; se calcula de capacidad - sizeof(ocupantes)**/
	ocupantes: string[];
}

type SalidasDato = {
	id: string;
	title: string;
	refugio: string;
	fecha: string;
	hora: string;
	referente: string;
	tareas: string[]; /** se rellenan con las tareas regulares del refugio seleccionado, los admin las pueden modificar */
	personas_necesarias: number;
	personas_inscritas: string[];
	coches_inscritos: number; /** quitar en algún momento, se calcula con sizeof(coches) */
	coches: CocheDato[];
	asientos_libres: number; /** se puede calcular  */
	confirmada: boolean;
}

export default {SalidasDato, CocheDato};

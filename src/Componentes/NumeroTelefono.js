import "../hojas-de-estilo/NumeroTelefono.css";

function NumeroTelefono({ value, onChange }) {
  /*AAA NXX XXXX; N no puede ser 0 o 1 */
  /*AAA NXX XXXX; NXX, 200 - 999, evitando 911, 411, 211, 311, 511, 611, 711, 811, 555, 800, 888, 877, 866, 855, 844, 933, 822, 900, 950, 958, 959, 976 */
  const opciones = [
    "No",
    "Aleatorio",
    "Kentucky (+502)",
    "Virginia (+703)",
    "West Virginia (+304)",
    "North Carolina (+919)",
    "South Carolina (+803)",
    "Georgia (+470)",
    "Tennessee (+615)",
    "Arkansas (+501)",
    "Missouri (+314)",
    "Illinois (+312)",
    "Indiana (+317)",
    "Ohio (+330)",
    "Texas (+512)",
    "California (+213)",
    "Florida (+305)",
    "Pennsylvania (+215)",
    "Michigan (+313)",
    "New York (+212)",
    "Colorado (303)",
  ];

  const manejarCambio = (opcion) => {
    if (opcion === "No" || opcion === "Aleatorio") {
      // Si se selecciona "No" o "Aleatorio", desmarcar todo y marcar solo esa
      onChange([opcion]);
    } else {
      // Si se selecciona otro estado
      let nuevaSeleccion;
      if (value.includes(opcion)) {
        // Quitar el estado si ya estaba marcado
        nuevaSeleccion = value.filter((item) => item !== opcion);
      } else {
        // Agregar el estado, pero quitar "No" y "Aleatorio" si estaban
        nuevaSeleccion = [
          ...value.filter((item) => item !== "No" && item !== "Aleatorio"),
          opcion,
        ];
      }
      onChange(nuevaSeleccion);
    }
  };

  return (
    <div className="grid-telefonos">
      {opciones.map((opcion) => (
        <label key={opcion} className="opcion-telefono">
          <input
            type="checkbox"
            checked={value.includes(opcion)}
            onChange={() => manejarCambio(opcion)}
          />
          <span>{opcion}</span>
        </label>
      ))}
    </div>
  );
}

export default NumeroTelefono;

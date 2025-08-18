import React from "react";
import "../hojas-de-estilo/GeneroCorreo.css";

function GeneroCorreo({ value, onChange }) {
  const manejarCambio = (opcion) => {
    let nuevoValor;
    if (value.includes(opcion)) {
      nuevoValor = value.filter((item) => item !== opcion);
    } else {
      nuevoValor = [...value, opcion];
    }
    onChange(nuevoValor);
  };

  return (
    <div className="genero-formulario">
      <label>
        <input
          type="checkbox"
          checked={value.includes("Hombre")}
          onChange={() => manejarCambio("Hombre")}
        />
        Hombre
      </label>
      <label>
        <input
          type="checkbox"
          checked={value.includes("Mujer")}
          onChange={() => manejarCambio("Mujer")}
        />
        Mujer
      </label>
    </div>
  );
}

export default GeneroCorreo;

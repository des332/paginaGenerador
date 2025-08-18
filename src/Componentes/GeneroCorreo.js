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
        <span>Hombre</span>
      </label>
      <label>
        <input
          type="checkbox"
          checked={value.includes("Mujer")}
          onChange={() => manejarCambio("Mujer")}
        />
        <span>Mujer</span>
      </label>
    </div>
  );
}

export default GeneroCorreo;

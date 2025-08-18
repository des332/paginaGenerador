import React from "react";
import "../hojas-de-estilo/EstructuraCorreo.css";

function EstructuraCorreo({ value, onChange }) {
  const manejarCambio = (campo, nuevoValor) => {
    onChange({ ...value, [campo]: nuevoValor });
  };

  return (
    <div className="estructura-correo-formulario">
      <input
        className="primer-input"
        type="text"
        value={value.rangoInicio}
        onChange={(e) => manejarCambio("rangoInicio", e.target.value)}
      />
      <span className="guion"> - </span>
      <input
        className="segundo-input"
        type="text"
        value={value.rangoFin}
        onChange={(e) => manejarCambio("rangoFin", e.target.value)}
      />
      <select
        className="dominio-select"
        value={value.dominio}
        onChange={(e) => manejarCambio("dominio", e.target.value)}
      >
        <option value="@hotmail.com">@hotmail.com</option>
        <option value="@outlook.com">@outlook.com</option>
        <option value="@outlook.es">@outlook.es</option>
      </select>
    </div>
  );
}

export default EstructuraCorreo;

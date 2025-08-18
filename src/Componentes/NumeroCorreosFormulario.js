import React from "react";
import "../hojas-de-estilo/NumeroCorreosFormulario.css";

function NumeroCorreosFormulario({ value, onChange }) {
  return (
    <form className="numero-correos-formulario">
      <input
        className="numero-input"
        type="text"
        placeholder="Numero de correos"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </form>
  );
}

export default NumeroCorreosFormulario;

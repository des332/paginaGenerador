import { useState } from "react";
import "./App.css";
import logoReservas from "./imagenes/logo-reservas.png";
import NumeroCorreosFormulario from "./Componentes/NumeroCorreosFormulario";
import EstructuraCorreo from "./Componentes/EstructuraCorreo";
import GeneroCorreo from "./Componentes/GeneroCorreo";
import NumeroTelefono from "./Componentes/NumeroTelefono";
import {
  nombresHombres,
  nombresMujeres,
  apellidos,
} from "./Componentes/datosNombres";

const codigosEstado = {
  "Kentucky (+502)": "502",
  "Virginia (+703)": "703",
  "West Virginia (+304)": "304",
  "North Carolina (+919)": "919",
  "South Carolina (+803)": "803",
  "Georgia (+470)": "470",
  "Tennessee (+615)": "615",
  "Arkansas (+501)": "501",
  "Missouri (+314)": "314",
  "Illinois (+312)": "312",
  "Indiana (+317)": "317",
  "Ohio (+330)": "330",
  "Texas (+512)": "512",
  "California (+213)": "213",
  "Florida (+305)": "305",
  "Pennsylvania (+215)": "215",
  "Michigan (+313)": "313",
  "New York (+212)": "212",
  "Colorado (+303)": "303",
};

function generarNumero(areas) {
  const area = areas[Math.floor(Math.random() * areas.length)];

  let nxx;
  const invalidos = [
    911, 411, 211, 311, 511, 611, 711, 811, 555, 800, 888, 877, 866, 855, 844,
    933, 822, 900, 950, 958, 959, 976,
  ];

  do {
    nxx = Math.floor(Math.random() * 800) + 200; // 200 - 999
  } while (
    String(nxx)[0] === "0" ||
    String(nxx)[0] === "1" ||
    invalidos.includes(nxx)
  );

  const xxxx = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  return `${area}${nxx}${xxxx}`;
}

function App() {
  const [numeroCorreos, setNumeroCorreos] = useState("");

  const [estructura, setEstructura] = useState({
    rangoInicio: "88",
    rangoFin: "95",
    dominio: "@hotmail.com",
  });

  const [genero, setGenero] = useState([]);
  const [telefono, setTelefono] = useState([]);
  const [resultados, setResultados] = useState([]);

  const manejarGenerar = () => {
    const cantidad = parseInt(numeroCorreos, 10); // convertimos a número
    if (isNaN(cantidad) || cantidad <= 0) {
      alert("Por favor, ingrese un número válido de correos.");
      return;
    }

    const inicio = estructura.rangoInicio
      ? parseInt(estructura.rangoInicio, 10)
      : 30;
    const fin = estructura.rangoFin ? parseInt(estructura.rangoFin, 10) : 95;

    if (isNaN(inicio) || isNaN(fin) || inicio >= fin) {
      alert("Por favor, ingrese un rango válido (ej: 30 - 95).");
      return;
    }

    let areasPermitidas = [];
    if (telefono.includes("Aleatorio")) {
      areasPermitidas = Object.values(codigosEstado);
    } else if (telefono.includes("No")) {
      areasPermitidas = null;
    } else {
      areasPermitidas = telefono.map((t) => codigosEstado[t]).filter(Boolean);
    }

    // 🔹 Generamos correos y teléfonos de prueba
    const nuevosCorreos = Array.from({ length: cantidad }, (_, i) => {
      const numRandom = Math.floor(Math.random() * (fin - inicio + 1)) + inicio;

      // 🔹 Elegimos nombre según género
      let nombre = "";
      if (genero.includes("Hombre") && genero.includes("Mujer")) {
        // Si eligió ambos → mezclar listas
        const todosNombres = [...nombresHombres, ...nombresMujeres];
        nombre = todosNombres[Math.floor(Math.random() * todosNombres.length)];
      } else if (genero.includes("Hombre")) {
        nombre =
          nombresHombres[Math.floor(Math.random() * nombresHombres.length)];
      } else if (genero.includes("Mujer")) {
        nombre =
          nombresMujeres[Math.floor(Math.random() * nombresMujeres.length)];
      } else {
        // Si no seleccionó nada → hombre
        nombre =
          nombresHombres[Math.floor(Math.random() * nombresHombres.length)];
      }

      // 🔹 Elegimos apellido
      const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];

      let telefonoGenerado = "";
      if (areasPermitidas && areasPermitidas.length > 0) {
        telefonoGenerado = generarNumero(areasPermitidas);
      }
      return {
        correo: `${nombre.toLowerCase()}${apellido.toLowerCase()}${numRandom}${
          estructura.dominio
        }`,
        telefono: telefonoGenerado,
      };
    });

    setResultados(nuevosCorreos);
  };

  return (
    <div className="App">
      <div className="contenedor-titulo">
        <div className="titulo">GENERADOR DE CORREOS ELECTRONICOS</div>
        <div className="imagen-contenedor">
          <img
            src={logoReservas}
            className="imagenReservas"
            alt="Logo Reservas"
          />
        </div>
      </div>

      <div className="contenedor-contenido">
        <div className="numero-correos-contenedor">
          <div className="numero-correos">Numero de correos:</div>
          <NumeroCorreosFormulario
            value={numeroCorreos}
            onChange={setNumeroCorreos}
          />
        </div>

        <div className="estructura-correo-contenedor">
          <div className="estructura-correo">Estructura del correo:</div>
          <EstructuraCorreo value={estructura} onChange={setEstructura} />
        </div>

        <div className="genero-contenedor">
          <div className="genero">Genero:</div>
          <GeneroCorreo value={genero} onChange={setGenero} />
        </div>

        <div className="numero-telefono-contenedor">
          <div className="numero-telefono">Numero de telefono:</div>
          <NumeroTelefono value={telefono} onChange={setTelefono} />
        </div>

        <div className="boton-contenedor">
          <button onClick={manejarGenerar}>Generar Correos</button>
        </div>

        {/* 🔹 Mostrar los resultados en pantalla con correos como links */}
        <div className="resultados">
          <h3>Resultados:</h3>
          <div>
            {resultados.map((item, index) => (
              <div key={index}>
                {index + 1}.{" "}
                <a
                  href={`mailto:${item.correo}`}
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  {item.correo}
                </a>{" "}
                -{" "}
                {item.telefono && (
                  <a
                    href={`mailto:${item.telefono}`}
                    style={{ color: "green", textDecoration: "underline" }}
                    onCopy={(e) => {
                      e.preventDefault(); // evita que copie "tel:..."
                      e.clipboardData.setData("text/plain", item.telefono); // copia solo el número
                    }}
                  >
                    {item.telefono}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

/*
  return (
    <div className="App">
      <div className="contenedor-titulo">
        <div className="titulo">GENERADOR DE CORREOS ELECTRONICOS</div>
        <div className="imagen-contenedor">
          <img
            src={logoReservas}
            className="imagenReservas"
            alt="Logo Reservas"
          />
        </div>
      </div>

      <div className="contenedor-contenido">
        <div className="numero-correos-contenedor">
          <div className="numero-correos">Numero de correos:</div>
          <NumeroCorreosFormulario />
        </div>
        <div className="estructura-correo-contenedor">
          <div className="estructura-correo">Estructura del correo:</div>
          <EstructuraCorreo />
        </div>

        <div className="genero-contenedor">
          <div className="genero">Genero:</div>
          <GeneroCorreo />
        </div>

        <div className="numero-telefono-contenedor">
          <div className="numero-telefono">Numero de telefono:</div>
          <NumeroTelefono />
        </div>

        <div className="boton">
          <button>Generar Correos</button>
        </div>

        <div className="boton-contenedor">
          <div className="boton">Generar Correos</div>
          <BotonGenerar />
        </div>

      </div>
    </div>
  );*/

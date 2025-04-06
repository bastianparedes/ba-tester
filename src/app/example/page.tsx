import './styles.css';

export default function Home() {
  return (
    <>
      <header id="main-header">
        <h1 className="titulo-principal">Mi sitio web</h1>
        <nav className="navegacion">
          <ul>
            <li>
              <a href="#inicio">Inicio</a>
            </li>
            <li>
              <a href="#acerca">Acerca de</a>
            </li>
            <li>
              <a href="#contacto">Contacto</a>
            </li>
          </ul>
        </nav>
      </header>
      <section id="inicio" className="seccion">
        <h2>Bienvenido</h2>
        <p className="parrafo">Este es un sitio de ejemplo con HTML y CSS.</p>
      </section>
      <section id="acerca" className="seccion fondo-claro">
        <h2>Acerca de nosotros</h2>
        <p className="parrafo">Nos encanta programar sitios web.</p>
      </section>
      <section id="contacto" className="seccion">
        <h2>Contacto</h2>
        <form id="formulario-contacto">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" className="campo" />

          <label htmlFor="email">Correo electrónico:</label>
          <input type="email" id="email" className="campo" />

          <button type="submit" className="boton">
            Enviar
          </button>
        </form>
      </section>
      <footer id="main-footer">
        <p className="footer-texto">© 2025 Mi sitio web</p>
      </footer>
    </>
  );
}

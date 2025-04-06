import './styles.css';

export default function Home() {
  return (
    <>
      <header id="main-header">
        <h1 className="main-title">My Website</h1>
        <nav className="navigation">
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      <section id="home" className="section">
        <h2>Welcome</h2>
        <p className="paragraph">This is a sample site using HTML and CSS.</p>
      </section>

      <section id="about" className="section light-background">
        <h2>About Us</h2>
        <p className="paragraph">We love building websites.</p>
      </section>

      <section id="contact" className="section">
        <h2>Contact</h2>
        <form id="contact-form">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" className="input-field" />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="input-field" />

          <button type="submit" className="button">
            Send
          </button>
        </form>
      </section>

      <footer id="main-footer">
        <p className="footer-text">© 2025 My Website</p>
      </footer>
    </>
  );
}

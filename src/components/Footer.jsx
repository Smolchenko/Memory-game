import { ReactComponent as Logo } from "../assets/logo.svg";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <Logo />
        <p>
          <span>Memory Game - Portfolio Project</span>
          <span>
            {"Copyright © "}
            <a
              href="https://github.com/Smolchenko"
              target="_blank"
              aria-label="Owner Github"
            >
              Irene Smolchenko
            </a>{" "}
            {currentYear}
            {"."}
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

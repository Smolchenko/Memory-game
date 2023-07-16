import { ReactComponent as Logo } from "../assets/logo.svg";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <Logo />
        <p>
          <span>Memory Game - Portfolio Project</span>
          <span>
            {"Copyright © "}
            <a href="https://github.com/Smolchenko" target="_blank">
              Irene Smolchenko
            </a>{" "}
            {new Date().getFullYear()}
            {"."}
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

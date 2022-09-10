import mesto__logo from '../images/Mesto__logo.svg';

function Header() {
  return (
    <header className="header">
      <img
        src={mesto__logo}
        alt="Лого Место"
        className="header__logo"
      />
    </header>
  )
}

export default Header;
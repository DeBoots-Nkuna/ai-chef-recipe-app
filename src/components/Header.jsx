import chefLogo from '../assets/Chef-Icon.png'

export const Header = () => {
  return (
    <header>
      <img
        className="chef-logo"
        src={chefLogo}
        alt="Chef logo icon in black and white color"
      />
      <h1>HeyChef</h1>
    </header>
  )
}

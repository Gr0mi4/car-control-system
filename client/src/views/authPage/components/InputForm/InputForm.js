import './style.scss'

export const InputForm = (props) => {
  return (
    <form className="input-form">
      <div className="input-wrapper">
        <label className="login label">Login</label>
        <input
          className="user-name-input"
          placeholder="Type your login"
          type="text"
          onChange={props.handleUsernameChange}
        />
      </div>
      <div className="input-wrapper">
        <label className="password label">Password</label>
        <input
          className="user-name-input"
          placeholder="********"
          type="password"
          onChange={props.handlePasswordChange}
        />
        <p className="error password">{props.error}</p>
      </div>
      <button
        className="proceed-button"
        onClick={props.handleSendForm}
      >Proceed
      </button>
    </form>
  )
}

export default InputForm


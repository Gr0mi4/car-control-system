import './style.scss'

export const InputForm = () => {
  return (
    <form className='input-form'>
      <div className='input-wrapper'>
        <label className='login label'>Login</label>
        <input
          className='user-name-input'
          placeholder="Type your login"
          type="text"/>
      </div>
      <div className='input-wrapper'>
        <label className='password label'>Password</label>
        <input
          className='user-name-input'
          placeholder="********"
          type="password"/>
      </div>
      <button className='proceed-button'>Proceed</button>
    </form>
  )
}

export default InputForm


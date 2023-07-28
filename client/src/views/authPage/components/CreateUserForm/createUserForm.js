import './style.scss';

export const CreateUserForm = ({ createUser }) => {
  const errorMessage = 'Sorry, we don’t have user with such name in our database. Create it, or choose another one';

  return (
    <div className="create-user-block">
      <h3 className="no-such-user-title">
        { errorMessage }
      </h3>
      <button className="create-user-button" onClick={ createUser }>Create User</button>
    </div>
  );
};
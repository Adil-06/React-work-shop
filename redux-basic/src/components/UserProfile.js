import classes from './UserProfile.module.css';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const userEmail = useSelector(state => state.auth.userEmail);
  return (
    <main className={classes.profile}>
      <h2>My Email</h2>
      <p>
        {userEmail.map((user, index) => (
          <li key={index}> {user} </li>
        ))}
      </p>
    </main>
  );
};

export default UserProfile;

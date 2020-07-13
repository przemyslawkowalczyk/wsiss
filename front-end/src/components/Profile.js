import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Mój profil
        </h3>
      </header>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Przypisane role:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{{
              ROLE_USER: 'użytkownik',
              ROLE_MODERATOR: 'bibliotekarz',
              ROLE_ADMIN: 'administrator'
          }[role]}</li>)}
      </ul>
    </div>
  );
};

export default Profile;

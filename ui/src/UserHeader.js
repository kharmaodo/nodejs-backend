function UserHeader() {
  const appTitle =  process.env.SOFTWARE_TITLE || 'Gestion des Utilisateurs';
  return (
      <header>
        <h1>
          {appTitle}
        </h1>
      </header>
      );
}

export default UserHeader;
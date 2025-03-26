function Auth() {
  return (
    <div className="page">
      <h1>Authentification</h1>
      <form>
        <label>
          Nom d'utilisateur:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Mot de passe:
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Auth;

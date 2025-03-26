function Home() {
  return (
    <div className="page">
      <h1>Accueil</h1>
      <p>Bienvenue dans la République Imaginaire, où tout est parfait sous notre grand dirigeant.</p>
      <article>
        <img 
          src="https://i.ibb.co/NnGb8jW2/Capture-d-cran-2025-03-26-141202.png" 
          alt="Propaganda" 
          style={{ width: '100%', maxWidth: '600px', margin: '20px 0', border: '3px solid black' }} 
        />
        <p>
          Sous la direction éclairée de notre grand leader, la République Imaginaire prospère comme jamais auparavant. 
          Chaque citoyen joue un rôle crucial dans la construction d'une société parfaite, unie et forte. 
          Rejoignez-nous pour célébrer les valeurs de discipline, d'ordre et de progrès.
        </p>
      </article>
    </div>
  );
}

export default Home;

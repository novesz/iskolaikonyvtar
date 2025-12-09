import { use, useEffect, useState } from "react";
import "../styles/Home.css";
export default function Home() {

  const [konyvek, setKonyvek] = useState([]);

  useEffect(() => { (
    async (e) => {
    const res = await fetch("http://localhost:3001/api/elerhetokonyvek");
    const data = await res.json();
    setKonyvek(data);
    })();
  }, []); 
    





  return (
    <>
      <main style={{ padding: "24px" }}>
        <h1>Üdv az iskolai könyvtárban! 📚</h1>
        <p>
          Itt tudsz könyveket felvenni, kölcsönözni és törölni az adatbázisból.
          Használd a fenti menüt a navigáláshoz.
        </p>
      </main>

      <section className="kartya"> 
        {konyvek.map((konyv) => (
          <div className="card"  key={konyv.konyvID}>
          <div className="card-body">
            <h5 className="card-title">{konyv.cim}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">Szerzo: {konyv.szerzo}</h6>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
          </div>
        </div>
        
        ))}

        
      </section>
    </>
  );
}

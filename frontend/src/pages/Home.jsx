import { useEffect, useState } from "react";
import "../styles/Home.css";

export default function Home() {
  const [konyvek, setKonyvek] = useState([]);

  useEffect(() => {
    (async () => {
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

      <section className="kartya-container">
        {konyvek.map((konyv) => (
          <div className="kartya" key={konyv.konyvID}>
            <div className="kartya-szoveg">
              <h2 className="kartya-cim">{konyv.cim}</h2>
              <h5>Szerző: {konyv.szerzo}</h5>
              <p>Rövid leírás a könyvről</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

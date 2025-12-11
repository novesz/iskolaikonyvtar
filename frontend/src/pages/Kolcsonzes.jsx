import { useEffect, useState } from "react";
import "../styles/Kolcsonzes.css";

export default function Kolcsonzes() {
  const [konyvek, setKonyvek] = useState([]);

  // 👇 1) KÜLÖN loadBooks függvény
  async function loadBooks() {
    try {
      const res = await fetch("http://localhost:3001/api/konyvstatusz");
      if (!res.ok) {
        throw new Error("Nem sikerült lekérni a könyveket");
      }
      const data = await res.json();
      setKonyvek(data);
    } catch (err) {
      console.error("Hiba könyvek lekérésekor:", err);
      alert("Hiba a könyvek lekérésekor (nézd meg a konzolt is).");
    }
  }

  // 👇 2) useEffect-ben csak ezt hívjuk
  useEffect(() => {
    loadBooks();
  }, []);

  // 👇 3) Kikölcsönzés
  async function kolcsonzes(konyvID) {
    try {
      const res = await fetch("http://localhost:3001/api/kikolcsonoz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          diakID: 1,      // itt most fixen 1, mert nincs diákkezelés
          konyvID: konyvID,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Hiba a kikölcsönzésnél:", data);
        alert("Hiba a kikölcsönzésnél!");
        return;
      }

      // sikerült → frissítjük a listát
      await loadBooks();
    } catch (err) {
      console.error("Hálózati hiba a kikölcsönzésnél:", err);
      alert("Hálózati hiba a kikölcsönzésnél!");
    }
  }

  // 👇 4) Visszaadás
  async function visszaad(konyvID) {
    try {
      const res = await fetch("http://localhost:3001/api/visszaad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ konyvID: konyvID }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Hiba a visszaadásnál:", data);
        alert("Hiba a visszaadásnál!");
        return;
      }

      await loadBooks();
    } catch (err) {
      console.error("Hálózati hiba a visszaadásnál:", err);
      alert("Hálózati hiba a visszaadásnál!");
    }
  }

  return (
    <>
      <main style={{ padding: "24px" }}>
        <h1>Könyv kölcsönzés</h1>
        <p>Itt majd ki tudod választani a diákot és a kölcsönözni kívánt könyvet.</p>
        <p>(Ezt később megcsináljuk az API-hoz igazítva 😉)</p>
      </main>

      <section className="kartya-container">
        {konyvek.map((konyv) => (
          <div className="kartya" key={konyv.konyvID}>
            <div className="kartya-szoveg">
              <h2>{konyv.cim}</h2>
              <h5>{konyv.szerzo}</h5>

              <p
                style={{
                  fontWeight: "bold",
                  color: konyv.elerheto ? "lightgreen" : "red",
                }}
              >
                {konyv.elerheto ? "Elérhető" : "Kölcsönözve"}
              </p>

              {/* Kikölcsönzés gomb */}
              <button
                disabled={!konyv.elerheto}
                onClick={() => kolcsonzes(konyv.konyvID)}
                className={konyv.elerheto ? "btn-aktiv" : "btn-disabled"}
              >
                Kikölcsönzés
              </button>

              {/* Visszaadás gomb – ha NEM elérhető */}
              {!konyv.elerheto && (
                <button
                  onClick={() => visszaad(konyv.konyvID)}
                  className="btn-aktiv vissza"
                  style={{ marginTop: "8px" }}
                >
                  Visszaadás
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

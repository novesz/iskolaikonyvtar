import { useState } from "react";

export default function KonyvTorles() {
  const [konyvID, setKonyvID] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    setMessage("");

    if (!konyvID) {
      setMessage("Add meg a törlendő könyv ID-ját!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/konyv/${konyvID}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Hiba történt törlés közben.");
      } else {
        setMessage(data.message || "Könyv törölve.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Nem sikerült kapcsolódni a szerverhez.");
    }
  };

  return (
    <main style={{ padding: "24px" }}>
      <h1>Könyv törlése</h1>

      <div style={{ marginTop: "12px" }}>
        <label>
          Könyv ID:{" "}
          <input
            type="number"
            value={konyvID}
            onChange={(e) => setKonyvID(e.target.value)}
            style={{ padding: "4px 8px", marginRight: "8px" }}
          />
        </label>
        <button onClick={handleDelete} style={{ padding: "6px 12px" }}>
          Törlés
        </button>
      </div>

      {message && (
        <p style={{ marginTop: "12px" }}>
          <strong>{message}</strong>
        </p>
      )}
    </main>
  );
}

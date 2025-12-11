import mysql from "mysql2";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT
});

app.get("/api/konyvstatusz", (req, res) => {
  const sqlSelect = `
    SELECT 
      k.konyvID,
      k.cim,
      sz.szerzo,
      CASE 
        WHEN kol.id IS NULL THEN 1     -- nincs aktív kölcsönzés → elérhető
        ELSE 0                         -- van aktív kölcsönzés → ki van kölcsönözve
      END AS elerheto
    FROM konyvek k
    LEFT JOIN szerzok sz ON k.szerzoID = sz.szerzoID
    LEFT JOIN kolcsonzesek kol 
      ON k.konyvID = kol.konyvID 
     AND kol.visszahozva IS NULL
  `;

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Adatbázis hiba (konyvek + státusz)" });
    }
    res.send(result);
  });
});


app.get("/api/elerhetokonyvek", (req, res) => {
  const sqlSelect =
    "SELECT k.konyvID, k.cim, sz.szerzo FROM konyvek k LEFT JOIN kolcsonzesek kol ON (k.konyvID = kol.konyvID AND kol.visszahozva IS NULL) LEFT JOIN szerzok sz ON k.szerzoID = sz.szerzoID WHERE kol.id IS NULL";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Adatbázis hiba (elérhető könyvek)" });
    }
    res.send(result);
  });
});

app.post("/api/ujkonyv", (req, res) => {
  const { cim, szerzo } = req.body;

  if (!cim || !szerzo) {
    return res.status(400).json({ message: "Kell cím és szerző név is!" });
  }

  const sqlFindAuthor = "SELECT szerzoID FROM szerzok WHERE szerzo = ?";

  db.query(sqlFindAuthor, [szerzo], (err, rows) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Adatbázis hiba (szerző keresés)" });

    const szerzoIDkezelo = (szerzoID) => {
      const sqlInsertBook =
        "INSERT INTO konyvek (cim, szerzoID) VALUES (?, ?)";
      db.query(sqlInsertBook, [cim, szerzoID], (err2, result) => {
        if (err2)
          return res
            .status(500)
            .json({ message: "Hiba könyv beszúráskor" });
        res.json({ message: "Könyv hozzáadva", konyvID: result.insertId });
      });
    };

    if (rows.length > 0) {
      szerzoIDkezelo(rows[0].szerzoID);
    } else {
      const sqlInsertAuthor = "INSERT INTO szerzok (szerzo) VALUES (?)";
      db.query(sqlInsertAuthor, [szerzo], (err3, resultAuthor) => {
        if (err3)
          return res
            .status(500)
            .json({ message: "Hiba szerző beszúrásakor" });
        szerzoIDkezelo(resultAuthor.insertId);
      });
    }
  });
});

app.delete("/api/konyv/:id", (req, res) => {
    const konyvID = req.params.id;
    const deleteKolcsonzes = "DELETE FROM kolcsonzesek WHERE konyvID = ?";
    db.query(deleteKolcsonzes, [konyvID], (err) => {
        if (err) return res.status(500).json({ message: "Hiba a kölcsönzések törlésekor" });
        const deleteKonyv = "DELETE FROM konyvek WHERE konyvID = ?";
        db.query(deleteKonyv, [konyvID], (err2) => {
            if (err2) return res.status(500).json({ message: "Hiba a könyv törlésekor" });

            res.json({ message: "Könyv és kölcsönzések törölve" });
        });
    });
});

app.post("/api/kikolcsonoz", (req, res) => {
    const { diakID, konyvID } = req.body;
    const sql = "INSERT INTO kolcsonzesek (diakID, konyvID, kiadas_datum) VALUES (?, ?, CURDATE())";
    
    db.query(sql, [diakID, konyvID], (err, result) => {
        if (err) return res.status(500).json({ message: "Hiba kikölcsönzéskor" });
        res.json({ message: "Könyv kikölcsönözve!" });
    });
});

app.post("/api/visszaad", (req, res) => {
    const { konyvID } = req.body;
    const sql = "UPDATE kolcsonzesek SET visszahozva = CURDATE() WHERE konyvID = ? AND visszahozva IS NULL";
    
    db.query(sql, [konyvID], (err, result) => {
        if (err) return res.status(500).json({ message: "Hiba visszahozásnál" });
        res.json({ message: "Könyv visszahozva!" });
    });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

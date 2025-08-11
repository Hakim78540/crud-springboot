import React, { useEffect, useState } from "react";
import { listPersons, deletePerson, Person } from "../Services/personService";
import { Link } from "react-router-dom";

const PersonList: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const data = await listPersons();
      setPersons(data);
    } catch (err: any) {
      setError(err.message || "Erreur de chargement");
    }
  };

  useEffect(() => { load(); }, []);

  const onDelete = async (id?: number) => {
    if (!id) return;
    if (!window.confirm("Supprimer cette personne ?")) return;
    try {
      await deletePerson(id);
      setPersons(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      alert(err.message || "Suppression impossible");
    }
  };

  return (
    <div>
      <h2>Liste des personnes</h2>
      <div style={{ marginBottom: 12 }}>
        <Link to="/persons/new">+ Ajouter</Link>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {persons.map(p => (
          <li key={p.id}>
            <strong>{p.name}</strong> — {p.city} — {p.phoneNumber}
            <button onClick={() => onDelete(p.id)} style={{ marginLeft: 8 }}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonList;


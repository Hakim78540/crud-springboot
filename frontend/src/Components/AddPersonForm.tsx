import React, { useState } from "react";
import { createPerson, Person } from "../Services/personService";
import { useNavigate } from "react-router-dom";

const AddPersonForm: React.FC = () => {
  const [form, setForm] = useState<Person>({ name: "", city: "", phoneNumber: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange =
    (field: keyof Person) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [field]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPerson(form);
      navigate("/persons"); // retour vers la liste
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 420 }}>
      <h2>Ajouter une personne</h2>

      <label>Nom</label>
      <input value={form.name} onChange={onChange("name")} placeholder="Ex: Alice" />

      <label>Ville</label>
      <input value={form.city} onChange={onChange("city")} placeholder="Ex: Paris" />

      <label>Téléphone</label>
      <input value={form.phoneNumber} onChange={onChange("phoneNumber")} placeholder="Ex: 0612345678" />

      <button type="submit" style={{ marginTop: 12 }}>Enregistrer</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddPersonForm;

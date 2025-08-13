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
  <form onSubmit={onSubmit} className="card p-4 mx-auto" style={{ maxWidth: 640 }}>
    <h2 className="h5 mb-3">Ajouter une personne</h2>

    <div className="form-floating mb-3">
      <input
        id="name"
        className="form-control"
        value={form.name}
        onChange={onChange("name")}
        placeholder="Nom"
        required
      />
      <label htmlFor="name">Nom</label>
    </div>

    <div className="row g-3">
      <div className="col-sm-6">
        <div className="form-floating">
          <input
            id="city"
            className="form-control"
            value={(form as any).address?.city ?? (form as any).city ?? ""}
            onChange={e => setForm(f => ({...f, address: {...(f as any).address, city: e.target.value}}))}
            placeholder="Ville"
          />
          <label htmlFor="city">Ville</label>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="form-floating">
          <input
            id="phone"
            className="form-control"
            value={form.phoneNumber}
            onChange={onChange("phoneNumber")}
            placeholder="Téléphone"
          />
          <label htmlFor="phone">Téléphone</label>
        </div>
      </div>
    </div>

    {error && <div className="alert alert-danger mt-3">{error}</div>}

    <div className="d-flex justify-content-end gap-2 mt-3">
      <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/persons")}>Annuler</button>
      <button type="submit" className="btn btn-primary">
        <i className="bi bi-check2 me-1" /> Enregistrer
      </button>
    </div>
  </form>
);
};

export default AddPersonForm;

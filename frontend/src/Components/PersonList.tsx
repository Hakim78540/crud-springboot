import React, { useEffect, useMemo, useState } from "react";
import { listPersons, deletePerson, Person } from "../Services/personService";
import ConfirmModal from "./ConfirmModal";

const PersonList: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [toDelete, setToDelete] = useState<number | null>(null);

  const load = async () => {
    try { setPersons(await listPersons()); }
    catch (err: any) { setError(err.message || "Erreur de chargement"); }
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return persons.filter(p =>
      (p.name || "").toLowerCase().includes(q) ||
      (p.phoneNumber || "").toLowerCase().includes(q) ||
      // @ts-ignore – compat city/address
      ((p.address?.city ?? p.city ?? "") as string).toLowerCase().includes(q)
    );
  }, [persons, query]);

  const onConfirmDelete = async () => {
    if (toDelete == null) return;
    try {
      await deletePerson(toDelete);
      setPersons(prev => prev.filter(p => p.id !== toDelete));
    } catch (e:any) {
      alert(e.message || "Suppression impossible");
    } finally { setToDelete(null); }
  };

  return (
    <div className="card p-3">
      <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
        <h2 className="h5 m-0">Liste des personnes</h2>
        <div className="input-group" style={{ maxWidth: 280 }}>
          <span className="input-group-text"><i className="bi bi-search" /></span>
          <input
            className="form-control"
            placeholder="Rechercher…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Nom</th>
              <th>Ville</th>
              <th>Téléphone</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td className="fw-semibold">{p.name}</td>
                {/* @ts-ignore compat address/city */}
                <td>{p.address?.city ?? (p as any).city ?? ""}</td>
                <td>{p.phoneNumber}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#confirmDelete"
                    onClick={() => setToDelete(p.id!)}
                  >
                    <i className="bi bi-trash me-1" /> Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={4} className="text-center text-muted py-4">Aucune donnée</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Confirmation */}
      <ConfirmModal
        id="confirmDelete"
        title="Confirmer la suppression"
        body="Cette action est irréversible."
        onConfirm={onConfirmDelete}
      />
    </div>
  );
};
export default PersonList;


const API_URL = "http://localhost:8080";

export interface Person {
  id?: number;
  name: string;
  city: string;
  phoneNumber: string;
}

const getToken = () => localStorage.getItem("token") ?? "";

export async function createPerson(person: Person): Promise<Person> {
  const res = await fetch(`${API_URL}/api/persons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(person),
  });
  if (!res.ok) throw new Error("Erreur lors de la création");
  return res.json();
}

export async function listPersons(): Promise<Person[]> {
  const res = await fetch(`${API_URL}/api/persons`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Erreur lors du chargement");
  return res.json();
}

export async function deletePerson(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/api/persons/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Suppression impossible");
}

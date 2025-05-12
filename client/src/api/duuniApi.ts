import type { AddDuuni, Duuni, ModifyDuuni } from "../utils/types";

const BASEURL = "http://localhost:3001";
const api = "api/v1";

export const getDuunit = async (): Promise<Duuni[]> => {
  const res = await fetch(`${BASEURL}/${api}/duuni`);

  if (!res.ok) {
    throw new Error(`Failed to fetch duunit: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

export const findDuuniById = async (id: string): Promise<Duuni> => {
  const res = await fetch(`${BASEURL}/${api}/duuni/${id}`);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch duuni ${id}: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
};

export const updateDuuniById = async (
  id: string,
  data: ModifyDuuni
): Promise<Duuni> => {
  const res = await fetch(`${BASEURL}/${api}/duuni/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to update duuni ${res.status} ${res.statusText}`);
  }

  return res.json();
};

export const newDuuni = async (data: AddDuuni): Promise<Duuni> => {
  const res = await fetch(`${BASEURL}/${api}/duuni`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failde to add duuni ${res.status} ${res.statusText}`);
  }

  return res.json();
};

export const deleteDuuniById = async (id: string): Promise<void> => {
  const res = await fetch(`${BASEURL}/${api}/duuni/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(
      `Failed to delete duuni ${id}: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
};

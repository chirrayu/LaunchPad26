const BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export async function getItems(search = "") {
  const res = await fetch(`${BASE_URL}/items?search=${encodeURIComponent(search)}`);
  if (!res.ok) throw new Error("Could not load items");
  return res.json();
}

export async function getItem(id) {
  const res = await fetch(`${BASE_URL}/items/${id}`);
  if (!res.ok) throw new Error("Could not load item");
  return res.json();
}

export async function createItem(fields, imageFile) {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
  if (imageFile) formData.append("image", imageFile);

  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Could not create item");
  return res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${BASE_URL}/items/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Could not delete item");
}

export function imageUrl(filename) {
  if (!filename) return null;
  return `${BASE_URL}/images/${filename}`;
}

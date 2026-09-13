const BASE_URL = "";

export async function getItems(search = "") {
  const res = await fetch(`${BASE_URL}/items?search=${search}`);
  return res.json();
}

export async function getItem(id) {
  const res = await fetch(`${BASE_URL}/items/${id}`);
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
  return res.json();
}

export async function deleteItem(id) {
  await fetch(`${BASE_URL}/items/${id}`, { method: "DELETE" });
}

export function imageUrl(filename) {
  if (!filename) return null;
  return `${BASE_URL}/images/${filename}`;
}

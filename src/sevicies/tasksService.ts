const BASE_URL = 'http://localhost:8000/tasks';

export const fetchTasks = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createTask = async (title: string) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  return res.json();
};

export const updateTask = async (
  id: string,
  updates: Partial<{ title: string; completed: boolean }>
) => {
  console.log('Updating task with ID:', id, 'with updates:', updates);
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  console.log('Response status:', res.status);
  console.log('Response data:', await res.clone().json());
  return res.json();
};

export const deleteTask = async (id: string) => {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
};

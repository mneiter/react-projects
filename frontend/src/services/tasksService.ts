const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_URL = `${API_BASE}/tasks`;

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const getTasks = async () => {
  console.log('[getTasks] Fetching tasks...');

  try {
    const res = await fetch(API_URL, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error(`getTasks failed: ${res.status}`);
    }

    const data = await res.json();
    console.log('[getTasks] Received:', data);
    return data;
  } catch (err) {
    console.error('[getTasks] Error:', err);
    throw err;
  }
};

export const createTask = async (task: { title: string }) => {
  console.log('[createTask] Creating task:', task);

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(task),
    });

    if (!res.ok) {
      throw new Error(`createTask failed: ${res.status}`);
    }

    const data = await res.json();
    console.log('[createTask] Created:', data);
    return data;
  } catch (err) {
    console.error('[createTask] Error:', err);
    throw err;
  }
};

export const updateTask = async (
  id: string,
  updates: Partial<{ title: string; completed: boolean }>
) => {
  console.log(`[updateTask] Updating task ${id}:`, updates);

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      throw new Error(`updateTask failed: ${res.status}`);
    }

    const data = await res.json();
    console.log(`[updateTask] Updated task ${id}:`, data);
    return data;
  } catch (err) {
    console.error(`[updateTask] Error for task ${id}:`, err);
    throw err;
  }
};

export const deleteTask = async (id: string) => {
  console.log(`[deleteTask] Deleting task ${id}`);

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error(`deleteTask failed: ${res.status}`);
    }

    const data = await res.json();
    console.log(`[deleteTask] Deleted task ${id}:`, data);
    return data;
  } catch (err) {
    console.error(`[deleteTask] Error for task ${id}:`, err);
    throw err;
  }
};



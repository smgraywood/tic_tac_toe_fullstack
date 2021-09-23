export const getPlayers = async () => {
  const response = await fetch("/api/players");
  return response.json();
};

export const addPlayer = (player) => _post("/api/players", player);

export const updatePlayer = (player, id) => _put(`/api/players/${id}`, player);

// const _get = async (url) => (await fetch(url)).json();

const _put = async (url, body) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await res.json();
  } catch {}

  return result;
};

const _post = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};

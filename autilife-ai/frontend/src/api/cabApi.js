export async function estimateCab(pickup, destination,vehicle ) {
  const res = await fetch("http://127.0.0.1:8000/estimate/cab", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pickup, destination ,  vehicle })
  });
  return res.json();
}

export async function confirmCab(data) {
  const res = await fetch("http://127.0.0.1:8000/confirm/cab", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

const data = require("./data.json");
const BASE = "http://localhost:8080";

async function post(path, body) {
  const res = await fetch(BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, text };
}

async function load(path, items, label) {
  let ok = 0;
  let fail = 0;
  for (const item of items) {
    const r = await post(path, item);
    if (r.ok) {
      ok++;
    } else {
      fail++;
      console.log(`FAIL ${path} ${item.title || item.label}: ${r.status} ${r.text.slice(0, 200)}`);
    }
  }
  console.log(`${label}: ${ok} ok, ${fail} failed`);
}

(async () => {
  await load("/categories", data.categories, "categories");
  await load("/brands", data.brands, "brands");

  const products = data.products
    .filter((p) => p.id <= 30 && !p.deleted)
    .map(({ id, deleted, ...rest }) => rest);
  await load("/products", products, "products");
})();
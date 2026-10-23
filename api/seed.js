const BASE = 'http://localhost:3000/api';

const post = async (ruta, cos) => {
  const resposta = await fetch(`${BASE}${ruta}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cos),
  });
  const json = await resposta.json();
  console.log(ruta, cos.nom, '->', resposta.status);
  return json;
};

const usuaris = [
  { nom: 'Pere Prova', email: 'pere@example.com' },
  { nom: 'Marta Prova', email: 'marta@example.com' },
  { nom: 'Joan Prova', email: 'joan@example.com' },
  { nom: 'Núria Prova', email: 'nuria@example.com' },
  { nom: 'Jordi Prova', email: 'jordi@example.com' },
];

const categories = [
  { nom: 'Adhesius', slug: 'adhesius', descripcio: 'Adhesius de Kakapos' },
  { nom: 'Bosses', slug: 'bosses', descripcio: 'Bosses de tela' },
  { nom: 'Clauers', slug: 'clauers', descripcio: 'Clauers de metall' },
  { nom: 'Llibretes', slug: 'llibretes', descripcio: 'Llibretes il·lustrades' },
  { nom: 'Pòsters', slug: 'posters', descripcio: 'Pòsters de Kakapos' },
];

(async () => {
  for (const u of usuaris) {
    await post('/usuaris', { ...u, password: 'Contrasenya-Prova-2026' });
  }

  for (const c of categories) {
    const resultat = await post('/categories', c);

    // Desactivamos Clauers para que el filtro ?actiu=false devuelva algo
    if (c.slug === 'clauers' && resultat.data) {
      await fetch(`${BASE}/categories/${resultat.data._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actiu: false }),
      });
      console.log('Clauers desactivada');
    }
  }

  console.log('Fet');
})();
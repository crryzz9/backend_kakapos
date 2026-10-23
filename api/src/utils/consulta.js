const AppError = require('./AppError');

const LIMIT_PER_DEFECTE = 10;
const LIMIT_MAXIM = 50;

const errorConsulta = (field, message) =>
  new AppError(400, 'INVALID_QUERY', 'Paràmetres de consulta no vàlids', [{ field, message }]);

// Acepta solo enteros positivos escritos como texto ("1", "5"...)
const enterPositiu = (valor, camp, defecte) => {
  if (valor === undefined) return defecte;
  if (typeof valor !== 'string' || !/^[1-9]\d*$/.test(valor)) {
    throw errorConsulta(camp, 'Ha de ser un enter positiu');
  }
  return Number(valor);
};

// Escapa los caracteres especiales para que el texto buscado no se interprete como regex
const escaparRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const llistarPaginat = async (Model, query, { campsOrdenables, ordenacioPerDefecte }) => {
  const filtre = {};

  // Filtro por actiu: ?actiu=true
  if (query.actiu !== undefined) {
    if (query.actiu !== 'true' && query.actiu !== 'false') {
      throw errorConsulta('actiu', 'Ha de ser true o false');
    }
    filtre.actiu = query.actiu === 'true';
  }

  // Filtro por nom: ?nom=info (contiene el texto, sin distinguir mayúsculas)
  if (query.nom !== undefined) {
    if (typeof query.nom !== 'string' || query.nom.trim() === '') {
      throw errorConsulta('nom', 'Ha de ser un text no buit');
    }
    filtre.nom = new RegExp(escaparRegex(query.nom.trim()), 'i');
  }

  // Ordenación: ?sort=nom (ascendente) o ?sort=-createdAt (descendente)
  let ordenacio = ordenacioPerDefecte;
  if (query.sort !== undefined) {
    if (typeof query.sort !== 'string') throw errorConsulta('sort', 'Valor no vàlid');
    const descendent = query.sort.startsWith('-');
    const camp = descendent ? query.sort.slice(1) : query.sort;
    if (!campsOrdenables.includes(camp)) {
      throw errorConsulta('sort', `Camps permesos: ${campsOrdenables.join(', ')}`);
    }
    ordenacio = { [camp]: descendent ? -1 : 1 };
  }

  // Paginación: ?page=2&limit=5
  const page = enterPositiu(query.page, 'page', 1);
  const limit = Math.min(enterPositiu(query.limit, 'limit', LIMIT_PER_DEFECTE), LIMIT_MAXIM);

  const [data, total] = await Promise.all([
    Model.find(filtre)
      .sort({ ...ordenacio, _id: 1 }) // _id desempata, así la paginación es estable
      .skip((page - 1) * limit)
      .limit(limit),
    Model.countDocuments(filtre),
  ]);

  return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

module.exports = { llistarPaginat };
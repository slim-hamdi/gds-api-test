# GDS Missions API TEST

Cette API permet de gérer les missions via un service GDS externe.  
Elle expose des routes REST sécurisées par JWT et documentées avec Swagger.

---

## Installation

```bash
git clone https://github.com/slim-hamdi/gds-api-test.git
cd gds-api
npm install
```

---

## Variables d'environnement

Crée un fichier `.env` à la racine du projet avec les clés suivantes :

```env
PORT=3000
API_KEY=api-key
API_SECRET=api-secret
GDS_BASE_URL=http://localhost:4000
APP_BASE_URL=http://localhost:3000
JWT_SECRET=jwt-secret
```

> `API_KEY` et `API_SECRET` sont requis pour s’authentifier auprès du GDS.  
> `JWT_SECRET` est utilisé pour vérifier les tokens dans les appels protégés.

---

## Démarrer le serveur

### En développement (avec `ts-node-dev`)

```bash
npm run dev
```

### En production

```bash
npm run build
npm start
```

Le serveur sera accessible sur :  
`http://localhost:3000`

---

## Documentation Swagger

Accédez à la documentation interactive de l’API :

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Elle vous permet de tester toutes les routes endirect depuis le navigateur.

---

## Endpoints disponibles

### `GET /missions`

> Récupère les missions (avec filtres optionnels par date).

**Paramètres query (optionnels) :**

- `minDate=YYYY-MM-DD`
- `maxDate=YYYY-MM-DD`

**Exemple :**

```bash
GET /missions?minDate=2025-06-01&maxDate=2025-06-30
```

---

### `POST /missions`

> Crée une nouvelle mission dans le GDS.

**Payload JSON attendu :**

```json
{
  "MIS_TSE_ID": "TSE1",
  "MIS_TVE_ID": "TVE1",
  "MIS_DATE_DEBUT": "2025-06-22",
  "MIS_HEURE_DEBUT": "08:00",
  "MIS_HEURE_FIN": "12:00"
}
```

**Réponse :**

```json
{
  "success": true,
  "id": "MIS_ABC123"
}
```

---

## Tests

### Exécuter tous les tests unitaires :

```bash
npm test
```

Les tests couvrent les contrôleurs, middlewares de validation, services et gestion des erreurs.

---
# Bergen App: Full-stack applicatie (Laravel + Angular) om bergen te beheren. 

Tijd aan gewerkt:
- Ongeveer 4 uur

Postman
- U kan het Postman collection bestand importeren in uw eigen Postman. Het zit in de root van deze repo:
  - ``` Bergen.postman_collection.json ```

Functionaliteiten: 
- Registreren, inloggen en uitloggen (Laravel Sanctum API tokens)
- Alleen geauthenticeerde gebruikers kunnen bergen bekijken, toevoegen, bewerken en verwijderen
- Lijstoverzicht van bergen
- Nieuwe berg toevoegen (modal)
- Bestaande berg bewerken (modal met vooraf ingevulde data)
- Berg verwijderen (met bevestiging)
- Detailpagina per berg
- Alle opmaak gedaan met Tailwind


## 1. Vereisten Zorg dat de volgende tools geïnstalleerd zijn: 
- [Docker](https://www.docker.com/)
- [PHP](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
  
Projectstructuur: 

``` /backend -> Laravel API ```
```/frontend -> Angular app ``` 

## 2. Database opzetten (MySQL via Docker) 

Start een MySQL 8 container met Docker: 

```docker run --name alpine-mysql -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=bergen_db -p 3306:3306 -d mysql:8 ``` 

- Host: `127.0.0.1`
- Port: `3306`
- User: `root`
- Password: `secret`
- Database: `bergen_db`

## 3. Backend (Laravel 12 API) 
### 3.1. Installatie 

- Ga naar de backend-map: ``` cd backend ``` 
- Installeer dependencies: ``` composer install ``` 
- Een ```.env``` file is al voorzien (dit heb ik online gezet puur voor het runnen makkelijker te maken, normaal NOOIT een .env online zetten!!) 


### 3.2. Database migraties en seeding 

- Voer de migraties uit: ``` php artisan migrate ``` 
- Om de database te seeden met voorbeeld-bergen: ```bash php artisan db:seed ```
  - Dit roept de `MountainSeeder` aan en voegt enkele test-bergen toe.
- Er wordt **geen** standaard gebruiker aangemaakt – registreren gebeurt via de frontend of via de API (bv PostMan). 

### 3.3. API endpoints (overzicht) 

- Authenticatie (publiek):
  
  - `POST /api/register` - Registreert een nieuwe user.
    - Body: `name`, `email`, `password`, `password_confirmation`
    - Response: `user` + `token`
  
  - `POST /api/login` - Logt een user in.
      - Body: `email`, `password`
      - Response: `user` + `token`
      
      
  - `POST /api/logout` -  Maakt het huidige token ongeldig.

- Bergen (alleen voor geauthenticeerde users):

  - `GET /api/mountains` Haalt alle bergen op.
  - `GET /api/mountains/{id}` Haalt details van één berg op.
  - `POST /api/mountains` Maakt een berg aan.
    - Body: ```json { "name": "Mont Blanc", "location": "France / Italy", "height": 4808, "description": "Highest mountain in the Alps." } ```
  - `PUT /api/mountains/{id}` Update een bestaande berg (full update).
  - `PATCH /api/mountains/{id}` Partial update (zelfde validatie als PUT).
  - `DELETE /api/mountains/{id}` Verwijdert een berg.

### 3.4. Backend starten 

- Start de Laravel development server:  ```php artisan serve ``` 
- De API draait dan op: ```http://127.0.0.1:8000 ```
- Bijvoorbeeld: `http://127.0.0.1:8000/api/mountains`


## 4. Frontend (Angular) 
### 4.1. Installatie 

- Ga naar de frontend-map: ``` cd frontend ```
- Installeer dependencies: ``` npm install ```
- Als de backend niet op poort 8000 draait, verander dan de API URL in `src/environments/environment.development.ts`:

### 4.2. Frontend starten 

- Om de frontend te runnen: ```ng serve ```
- De Angular app draait dan standaard op: ``` http://localhost:4200 ```

# 🏋️‍♂️ Fitness Equipment Shop - MERN Stack Application

Ova aplikacija je web prodavnica fitnes opreme, izrađena korišćenjem **MERN steka**. Korisnicima omogućava jednostavno pregledanje i kupovinu proizvoda, dok administratori imaju potpunu kontrolu nad sadržajem platforme.

---

## ✨ Funkcionalnosti

### 👤 Obični korisnik može:
- 🔍 Pregledati sve dostupne artikle
- 📄 Otvoriti stranicu pojedinačnog artikla
- 🗣️ Komentarisati i ocjenjivati proizvode
- 🔎 Filtrirati proizvode po različitim kriterijumima
- 💬 Slati **privatne poruke** drugim korisnicima u **realnom vremenu** putem **WebSocket-a**
- 💱 Odabrati valutu za prikaz cijena
- 📧 Direktno poslati e-mail korisničkoj podršci
- 📨 Dobiti e-mail potvrdu nakon uspješne registracije
- 🛒 Dodavati proizvode u korpu i mijenjati broj artikala u korpi

### 👮 Administrator može:
- 📊 Pratiti ukupan broj korisnika, komentara i proizvoda
- ➕ Dodavati nove artikle
- ❌ Brisati artikle
- ✏️ Uređivati postojeće artikle
- ✅ Odobravati i brisati komentare

---

## 🛠️ Tehnologije

### ✅ Frontend:
- **React.js**
- **Redux** – za upravljanje globalnim stanjem aplikacije
- **Axios** – za HTTP komunikaciju sa backendom
- **Socket.IO Client** – za real-time komunikaciju

### ✅ Backend (Node.js & Express):
- **Express.js** – serverski framework
- **Mongoose** – ODM za rad s MongoDB bazom
- **bcrypt** – za heširanje korisničkih lozinki
- **jsonwebtoken** – za autentifikaciju putem JWT
- **cors** – za omogućavanje komunikacije između frontenda i backenda
- **multer** – za upload slika i fajlova
- **nodemailer** – za slanje e-mailova
- **socket.io** – za real-time chat sistem
- **nodemon** – za automatski restart servera tokom razvoja

### ✅ Ostalo:
- **MongoDB** – baza podataka
- **Pug** – šablonski engine (ako se koristi za neke admin funkcije ili e-mailove)

---

## 📁 Instalacija i pokretanje

- I na frontend i na backend folderu izvrsiti npm i komandu
- Unutar backend foldera pokrecemo sa npm start
- Unutar frontend foldera sa npm run dev


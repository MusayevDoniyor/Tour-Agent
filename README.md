## Loyiha haqida

Tour Agent API - sayohat agentliklari uchun mo'ljallangan RESTful API bo'lib, MongoDB va Mongoose yordamida sayohatlar, sayohat qo'llanmalari va buyurtmalarni boshqarish imkonini beradi. Bu loyiha MongoDB va Mongoose relationshiplarini to'g'ri ulash va ma'lumotlarni bog'langan holda olish uchun yaratilgan.

## Texnologiyalar

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

## O'rnatish

### Talablar

- Node.js (v14 yoki undan yuqori)
- MongoDB (lokal yoki MongoDB Atlas)

### Loyihani o'rnatish

1. Loyihani clone qiling:

```shellscript
git clone https://github.com/MusayevDoniyor/Tour-Agent.git
cd Tour-Agent
```

2. Kerakli paketlarni o'rnating:

```shellscript
npm install
```

3. `.env` faylini yarating va quyidagi ma'lumotlarni kiriting:

```plaintext
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tour-agent
```

4. Serverni ishga tushiring:

```shellscript
# Development mode
npm run dev

# Production mode
npm start
```

## Loyiha strukturasi

```plaintext
tour-agent-api/
├── controllers/
│   ├── booking-controller.js
│   ├── tour-controller.js
│   └── tour-guide-controller.js
├── models/
│   ├── booking.js
│   ├── tour.js
│   └── tour-guide.js
├── routes/
│   ├── booking-routes.js
│   ├── tour-routes.js
│   └── tour-guide-routes.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Ma'lumotlar modellari

### Tour (Sayohat)

```javascript
{
  name: String,           // Sayohat nomi
  description: String,    // Sayohat tavsifi
  price: Number,          // Narxi
  location: String,       // Joylashuvi
  guides: [ObjectId]      // Tour Guide-larga bog'lanish
}
```

### TourGuide (Sayohat Qo'llanmasi)

```javascript
{
  name: String,           // Qo'llanma ismi
  experience: Number,     // Ish tajribasi (yil)
  phone: String,          // Telefon raqami
  tours: [ObjectId]       // Tour-larga bog'lanish
}
```

### Booking (Buyurtma)

```javascript
{
  user_name: String,      // Foydalanuvchi ismi
  tour_id: ObjectId,      // Bog'langan Sayohat
  date: Date              // Buyurtma sanasi
}
```

## API Endpointlar

### Tours

| Method | Endpoint   | Tavsif                                        |
| ------ | ---------- | --------------------------------------------- |
| GET    | /tours     | Barcha sayohatlarni olish                     |
| GET    | /tours/:id | Bitta sayohatni olish (guide lar bilan birga) |
| POST   | /tours     | Yangi sayohat yaratish                        |
| PUT    | /tours/:id | Sayohatni yangilash                           |
| DELETE | /tours/:id | Sayohatni o'chirish                           |

### Tour Guides

| Method | Endpoint    | Tavsif                        |
| ------ | ----------- | ----------------------------- |
| GET    | /guides     | Barcha tour guide larni olish |
| GET    | /guides/:id | Bitta tour guide ni olish     |
| POST   | /guides     | Yangi tour guide qo'shish     |
| PUT    | /guides/:id | Tour guide ni yangilash       |
| DELETE | /guides/:id | Tour guide ni o'chirish       |

### Bookings

| Method | Endpoint      | Tavsif                                    |
| ------ | ------------- | ----------------------------------------- |
| GET    | /bookings     | Barcha buyurtmalarni olish                |
| GET    | /bookings/:id | Bitta buyurtmani olish (tour bilan birga) |
| POST   | /bookings     | Yangi buyurtma yaratish                   |
| PUT    | /bookings/:id | Buyurtmani yangilash                      |
| DELETE | /bookings/:id | Buyurtmani o'chirish                      |

## API Misollari

### 1. Yangi Sayohat Yaratish

**Request:**

```plaintext
POST /tours
Content-Type: application/json

{
  "name": "Maldiv orollari sayohati",
  "description": "5 yulduzli mehmonxona, toza plyajlar va suv sportlari",
  "price": 1200,
  "location": "Maldiv",
  "guides": ["65f1a3b4c9e77b3f33d4e9c9", "65f1a3b4c9e77b3f33d4e9d0"]
}
```

**Response:**

```json
{
  "_id": "65f1a3b4c9e77b3f33d4e9d5",
  "name": "Maldiv orollari sayohati",
  "description": "5 yulduzli mehmonxona, toza plyajlar va suv sportlari",
  "price": 1200,
  "location": "Maldiv",
  "guides": ["65f1a3b4c9e77b3f33d4e9c9", "65f1a3b4c9e77b3f33d4e9d0"],
  "createdAt": "2025-03-17T12:00:00.000Z",
  "updatedAt": "2025-03-17T12:00:00.000Z"
}
```

### 2. Yangi Tour Guide Yaratish

**Request:**

```plaintext
POST /guides
Content-Type: application/json

{
  "name": "Otabek Xolmatov",
  "experience": 5,
  "phone": "+998901234567",
  "tours": ["65f1a3b4c9e77b3f33d4e9d5"]
}
```

**Response:**

```json
{
  "_id": "65f1a3b4c9e77b3f33d4e9c9",
  "name": "Otabek Xolmatov",
  "experience": 5,
  "phone": "+998901234567",
  "tours": ["65f1a3b4c9e77b3f33d4e9d5"],
  "createdAt": "2025-03-17T12:05:00.000Z",
  "updatedAt": "2025-03-17T12:05:00.000Z"
}
```

### 3. Yangi Buyurtma Yaratish

**Request:**

```plaintext
POST /bookings
Content-Type: application/json

{
  "user_name": "Javohir Tursunov",
  "tour_id": "65f1a3b4c9e77b3f33d4e9d5",
  "date": "2025-04-01"
}
```

**Response:**

```json
{
  "_id": "65f1a3b4c9e77b3f33d4e9e2",
  "user_name": "Javohir Tursunov",
  "tour": {
    "_id": "65f1a3b4c9e77b3f33d4e9d5",
    "name": "Maldiv orollari sayohati",
    "location": "Maldiv",
    "price": 1200
  },
  "date": "2025-04-01",
  "createdAt": "2025-03-17T12:10:00.000Z"
}
```

### 4. Bitta Sayohatni Ko'rish (Guide-lar bilan birga)

**Request:**

```plaintext
GET /tours/65f1a3b4c9e77b3f33d4e9d5
```

**Response:**

```json
{
  "_id": "65f1a3b4c9e77b3f33d4e9d5",
  "name": "Maldiv orollari sayohati",
  "description": "5 yulduzli mehmonxona, toza plyajlar va suv sportlari",
  "price": 1200,
  "location": "Maldiv",
  "guides": [
    {
      "_id": "65f1a3b4c9e77b3f33d4e9c9",
      "name": "Otabek Xolmatov",
      "experience": 5,
      "phone": "+998901234567"
    },
    {
      "_id": "65f1a3b4c9e77b3f33d4e9d0",
      "name": "Sarvar Toshmatov",
      "experience": 3,
      "phone": "+998933332211"
    }
  ],
  "createdAt": "2025-03-17T12:00:00.000Z",
  "updatedAt": "2025-03-17T12:00:00.000Z"
}
```

### 5. Bitta Buyurtmani Ko'rish (Tour bilan birga)

**Request:**

```plaintext
GET /bookings/65f1a3b4c9e77b3f33d4e9e2
```

**Response:**

```json
{
  "_id": "65f1a3b4c9e77b3f33d4e9e2",
  "user_name": "Javohir Tursunov",
  "tour": {
    "_id": "65f1a3b4c9e77b3f33d4e9d5",
    "name": "Maldiv orollari sayohati",
    "location": "Maldiv",
    "price": 1200
  },
  "date": "2025-04-01",
  "createdAt": "2025-03-17T12:10:00.000Z"
}
```

## Postman bilan sinab ko'rish

API ni sinab ko'rish uchun Postman kolleksiyasini import qilishingiz mumkin. Buning uchun quyidagi qadamlarni bajaring:

1. Postman dasturini oching
2. "Import" tugmasini bosing
3. "Link" bo'limiga quyidagi URL ni kiriting: `https://www.getpostman.com/collections/your-collection-id`
4. "Import" tugmasini bosing

Yoki quyidagi qadamlarni bajaring:

1. Postman dasturini oching
2. "Collections" bo'limida "+" tugmasini bosing
3. Collection nomini "Tour Agent API" deb kiriting
4. Har bir API uchun yangi so'rov yarating va yuqoridagi misollardan foydalaning

## Muhim xususiyatlar

1. **Mongoose Relationshiplar**:

1. Tour va TourGuide o'rtasida Many-to-Many relationship
1. Booking va Tour o'rtasida One-to-Many relationship

1. **Populate Funksiyasi**:

1. Tour ma'lumotlarini olishda guides ma'lumotlari ham populate qilinadi
1. Booking ma'lumotlarini olishda tour ma'lumotlari ham populate qilinadi

1. **Ma'lumotlar Sinxronizatsiyasi**:

1. Tour yaratilganda, unga bog'langan TourGuide larning tours massiviga yangi tour qo'shiladi
1. TourGuide yaratilganda, unga bog'langan Tour larning guides massiviga yangi guide qo'shiladi
1. Ma'lumotlar yangilanganda yoki o'chirilganda, bog'langan modellar ham sinxronlashtiriladi

## Xatoliklarni bartaraf etish

### MongoDB ga ulanishda xatolik

Agar MongoDB ga ulanishda xatolik yuz bersa, quyidagi narsalarni tekshiring:

1. MongoDB serveri ishga tushirilganligini
2. `.env` faylidagi MONGODB_URI to'g'ri ekanligini
3. MongoDB port (odatda 27017) ochiq ekanligini

### API so'rovlarida xatolik

Agar API so'rovlarida xatolik yuz bersa, quyidagi narsalarni tekshiring:

1. So'rov URL to'g'ri ekanligini
2. HTTP metodi to'g'ri ekanligini (GET, POST, PUT, DELETE)
3. POST va PUT so'rovlari uchun Content-Type: application/json headerini qo'shganingizni
4. Request body to'g'ri formatda ekanligini

## Litsenziya

MIT

## Muallif

Doniyor

## Bog'lanish

- Email: [sizning@email.com](mailto:doniyormusayev2009@gmail.com)
- GitHub: [github.com/username](https://github.com/MusayevDoniyor)

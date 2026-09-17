# 🌍 Wanderlust

A full-stack travel listing web application where users can explore, create, edit, and manage travel listings.

🔗 **Live Demo:** https://wanderlust-d58y.onrender.com
🔗 **GitHub Repository:** https://github.com/codeWith-Vishal56/Wanderlust

---

## 📌 About The Project

**Wanderlust** is a full-stack travel listing application inspired by platforms that allow users to discover and share places to stay.

I built this project to strengthen my understanding of **backend development, databases, authentication, MVC architecture, RESTful routing, cloud image storage, geocoding, and deployment**.

The project started as a basic Express application and gradually evolved into a complete web application with user authentication, CRUD functionality, image uploads, location-based maps, validation, and deployment.

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration and login
* Session-based authentication
* Protected routes
* Authorization for creating, editing, and deleting listings
* Only listing owners can modify or delete their listings

### 🏠 Listings

* View all available listings
* View individual listing details
* Create new listings
* Edit existing listings
* Delete listings
* Display listing prices with Indian number formatting
* Listing validation

### 🖼️ Image Uploads

* Upload listing images
* Cloud-based image storage using Cloudinary
* Image URL and filename stored with listing data
* Default image handling

### 🗺️ Maps & Location

* Location-based geocoding
* OpenStreetMap integration
* Nominatim API for converting locations into coordinates
* Interactive maps for individual listings
* GeoJSON `Point` data stored in MongoDB

### 🔎 Search

* Search listings by location
* Search listings by country
* Handles user-entered location searches
* Displays an appropriate message when no listings are found

### ⚠️ Error Handling & Validation

* Custom Express error handling
* Mongoose schema validation
* Flash messages for user feedback
* Handling invalid routes and database errors

### 📱 Responsive UI

* Responsive design using Bootstrap
* Mobile-friendly navigation
* Listing cards and detail pages
* Clean and simple travel-focused interface

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap 5
* EJS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* Passport.js
* Express Session

### Image Storage

* Cloudinary

### Maps & Geocoding

* OpenStreetMap
* Nominatim API

### Tools & Deployment

* Git
* GitHub
* Render
* VS Code

---

## 🏗️ Project Architecture

The application follows the **MVC (Model-View-Controller)** architecture.

```text
Wanderlust
│
├── controllers/
│   └── listing.js
│
├── models/
│   ├── listing.js
│   ├── user.js
│   └── review.js
│
├── routes/
│   ├── listing.js
│   ├── user.js
│   └── review.js
│
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
│
├── public/
│   ├── css/
│   └── js/
│
├── utils/
│
├── app.js
├── middleware.js
├── cloudConfig.js
├── schema.js
├── package.json
└── README.md
```

---

## 🔄 How It Works

The basic flow of the application is:

```text
User
  ↓
Express Routes
  ↓
Middleware
  ↓
Controller
  ↓
Mongoose Model
  ↓
MongoDB
```

For listing creation:

```text
User submits listing
        ↓
Authentication check
        ↓
Image uploaded to Cloudinary
        ↓
Location sent to Nominatim
        ↓
Latitude & Longitude obtained
        ↓
GeoJSON coordinates stored
        ↓
Listing saved in MongoDB
        ↓
User redirected to listing page
```

---

## 🌐 Maps & Geocoding

Instead of using a paid map provider, this project uses open-source mapping services.

**OpenStreetMap** is used for map data and **Nominatim** is used for geocoding.

For example:

```text
Dehradun, India
       ↓
Nominatim API
       ↓
Latitude + Longitude
       ↓
GeoJSON Point
       ↓
MongoDB
```

The coordinates are then used to display the listing location on the map.

---

## 🔒 Environment Variables

Create a `.env` file in the root directory and add the required environment variables.

Example:

```env
ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
```

> Never commit your `.env` file or expose your API keys and secrets publicly.

---

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/codeWith-Vishal56/Wanderlust.git
```

### 2. Navigate into the project

```bash
cd Wanderlust
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file and add your MongoDB, Cloudinary, and session credentials.

### 5. Start the application

```bash
node app.js
```

The application will run locally at:

```text
http://localhost:8080
```

---

## 📂 Main Dependencies

Some of the major packages used in the project include:

* `express`
* `mongoose`
* `ejs`
* `ejs-mate`
* `passport`
* `passport-local`
* `express-session`
* `connect-flash`
* `method-override`
* `multer`
* `multer-storage-cloudinary`
* `cloudinary`
* `dotenv`

---

## ☁️ Deployment

The application is deployed on **Render**.

### Live Application

https://wanderlust-d58y.onrender.com

The application uses environment variables on the deployment platform for sensitive credentials such as database, session, and Cloudinary configuration.

> **Note:** The free Render instance may spin down after inactivity, so the first request after a period of inactivity can take longer than usual.

---

## 🧠 What I Learned

Building Wanderlust helped me understand several important full-stack development concepts:

* Building RESTful applications with Express
* Structuring applications using MVC architecture
* Working with MongoDB and Mongoose
* Designing schemas and relationships
* Authentication and authorization
* Express middleware
* Session management
* CRUD operations
* Image uploads and cloud storage
* Geocoding APIs
* GeoJSON data
* Error handling
* Form validation
* Search functionality
* Git and GitHub workflows
* Environment variables
* Deploying a backend application

Most importantly, I learned how different parts of a web application connect together and how to debug problems when things don't work as expected.

---

## 🔮 Future Improvements

Some features I plan to explore in the future:

* ⭐ Reviews and ratings improvements
* ❤️ Wishlist / favorites
* 🔍 More advanced search and filtering
* 📍 Improved map interactions
* 📊 User dashboard
* ⚡ Performance improvements
* 🎨 Further UI/UX improvements
* 📱 Progressive Web App features

---

## 📸 Project Preview

### Home / Listings

The application provides a collection of travel listings that users can browse and explore.

### Listing Details

Each listing contains information such as:

* Title
* Description
* Price
* Location
* Country
* Image
* Map location

### Authentication

Users can create an account and log in before accessing protected listing functionality.

---

## 👨‍💻 Developer

**Vishal Maurya**

BCA Student | Full Stack Web Development Learner

🔗 LinkedIn: https://www.linkedin.com/in/vishalmaurya56/
🔗 GitHub: https://github.com/codeWith-Vishal56

---

## 📄 License

This project is created for **learning and educational purposes**.

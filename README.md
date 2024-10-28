## Book-library

### Project description

The Book Library App is a full-stack application that allows users to browse, search, and save books to their personal library. Users can create accounts, log in, and manage their profiles, while administrators have tools to add, edit, or remove books and manage user accounts. The app features both physical and digital book options and includes secure authentication and a user-friendly interface for seamless book management and interaction.

### Features

- User Registration and Login: Users can sign up and access their accounts securely through JWT-based authentication.
- Admin dashboard: Administrators can log in to manage user accounts with CRUD functionality.
- Search Feature: Users can perform searches within the application such as books and authors, that is taken from google books API.
- Responsive Design: The application is optimized for all devices and screen sizes.
- PWA : The application includes offline functionality as a Progressive Web App (PWA)

### UX-design and user information

In the initial stages of UX design, I conducted a survey to gather user information and insights, which formed the basis for creating personas and user stories. These personas and stories helped define user needs, goals, and behaviors, ensuring the design aligned with actual user expectations. Based on this research, I created low-fidelity wireframes and a sitemap in Figma, providing a structured outline of the app's layout, navigation, and core functionalities. This approach allowed for an organized design process focused on user-centered outcomes.

### Tech Stack

**Frontend** - React

**Backend** - Node.js, Express, MongoDB (Atlas), JWT

### Deploy

**Frontend** - Netlify

**Backend** - Render

### Installation

#### 1. Clone the repo

```https://github.com/chas-academy/u09-fullstack-js-DenjinM.git```

#### 2. Backend install

```cd backend```
```npm install```

Create `.env` file and put in:

```
MONGO_URI=(Your own MONGO_URI)
PORT=5001
JWT_SECRET=ThMEqYfsga@&?~/8X-RP4C,mjGu3<6nwrVxT34Flk
GOOGLE_BOOKS_API_KEY=AIzaSyACIzTTImaFlhxZNHDGyqgkdCLjHpKcT_c
``` 

Start the server:

```npm start```

#### 3. Frontend install

```cd frontend```
```npm install```

Create `.env` file and put in:

```
REACT_APP_API_URL=https://u09-fullstack-js-denjinm.onrender.com/api
```

Open frontend to use:

```https://u09-book-library.netlify.app```



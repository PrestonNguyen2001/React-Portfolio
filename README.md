# React Portfolio

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## Table of Contents

- [Description](#description)
    - [User Story](#user-story)
    - [Acceptance Criteria](#acceptance-criteria)
- [Requirements and Technologies Used](#requirements-and-technologies-used)
- [Installation](#installation)
- [Deployment](#deployment)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Description

This project is a React-based portfolio designed to showcase my work as a web developer. The application is a single-page application (SPA) featuring multiple sections, including About Me, Portfolio, Contact, and Resume. It uses modern web development technologies to create a polished and professional portfolio site.

### User Story

```markdown
AS AN employer looking for candidates with experience building single-page applications
I WANT to view a potential employee's deployed React portfolio of work samples
SO THAT I can assess whether they're a good candidate for an open position

```

### Acceptance Criteria

```markdown
GIVEN a single-page application portfolio for a web developer
WHEN I load the portfolio
THEN I am presented with a page containing a header, a section for content, and a footer
WHEN I view the header
THEN I am presented with the developer's name and navigation with titles corresponding to different sections of the portfolio
WHEN I view the navigation titles
THEN I am presented with the titles About Me, Portfolio, Contact, and Resume, and the title corresponding to the current section is highlighted
WHEN I click on a navigation title
THEN I am presented with the corresponding section below the navigation without the page reloading and that title is highlighted
WHEN I load the portfolio the first time
THEN the About Me title and section are selected by default
WHEN I am presented with the About Me section
THEN I see a recent photo or avatar of the developer and a short bio about them
WHEN I am presented with the Portfolio section
THEN I see titled images of six of the developer’s applications with links to both the deployed applications and the corresponding GitHub repository
WHEN I am presented with the Contact section
THEN I see a contact form with fields for a name, an email address, and a message
WHEN I move my cursor out of one of the form fields without entering text
THEN I receive a notification that this field is required
WHEN I enter text into the email address field
THEN I receive a notification if I have entered an invalid email address
WHEN I am presented with the Resume section
THEN I see a link to a downloadable resume and a list of the developer’s proficiencies
WHEN I view the footer
THEN I am presented with text or icon links to the developer’s GitHub and LinkedIn profiles, and their profile on a third platform (Stack Overflow, Twitter)

```

## Requirements and Technologies Used

### Requirements

- Node.js
- npm

### Technologies Used

- **React**: For building the user interface.
- **React Router**: For managing navigation.
- V**ite: For building the application.
- **Tailwind CSS**: For styling the application.
- **Flowbite**: For pre-built components and utilities.
- **Firebase**: For backend services.
- **Redux**: For state management.
- **Nodemon**: For automatically restarting the server during development.
- **Express.js**: For setting up a backend server.
- **Netlify**: For deployment.
- **Heroku**: For backend deployment.
- **GitHub API**: For fetching profile data and contributions.
- **jsonwebtoken**: For token verification and authentication.

![IndexedDB](https://img.shields.io/badge/IndexedDB-FFCA28?style=for-the-badge&logo=indexeddb&logoColor=black)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Babel](https://img.shields.io/badge/babel-%23323330.svg?style=for-the-badge&logo=babel&logoColor=%23F9DC3E)
![Workbox](https://img.shields.io/badge/Workbox-3C873A?style=for-the-badge&logo=workbox&logoColor=white)
![idb](https://img.shields.io/badge/idb-3178C6?style=for-the-badge&logo=indexeddb&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Concurrently](https://img.shields.io/badge/Concurrently-000000?style=for-the-badge&logo=concurrently&logoColor=white)


## Installation

To install this application:

1. Clone the Repository:

```markdown
git clone https://github.com/PrestonNguyen2001/React-Portfolio.git
```

2. Navigate to the Root Directory:

```markdown
cd React-Portfolio
```

3. Install Dependencies:

```markdown
npm install
```

4. Build the Client:

```markdown
npm run build
```

5. Start the Application:

```markdown
npm run start:dev
```

## Deployment

The application is deployed on Render. You can access the live application [here](https://pwa-text-editor-kpd5.onrender.com)

## Usage

- **Open the Application**: Open the application in your browser by going to the deployed URL.
- **Navigate Through Sections**:  Use the navigation bar to switch between About Me, Portfolio, Contact, and Resume sections.
- **Submit Contact Form**: Fill out the contact form to send a message. Form validation is in place to ensure required fields are filled out correctly.
- **Download Resume**:  Go to the Resume section to download a copy of my resume.
- **View Github Data**: The application fetches profile data and contributions from GitHub using the GitHub API.
- **Dashboard for Users**: Signed-in users can access the dashboard to update their username, email, password, or profile image.

### Dashboard for Users

Signed-in users can access the dashboard to manage their profile. The dashboard allows users to:

- Update Username
- Update Email
- Update Password
- Update Profile Image
- Delete Profile

### Dashboard Components for Admins

Admins have access to additional dashboard components to manage the application:

**DashboardComp.jsx:** The main dashboard component displaying summaries and recent activities.

- Displays total counts and recent entries for users, comments, and posts.
- Allows navigation to detailed views of users, comments, and posts.

**DashComments.jsx**: Manage comments.

- View, delete, and paginate through user comments.
- Modal for confirming comment deletions.

**DashPosts.jsx**: Manage blog posts.

- View, edit, delete, and paginate through posts.
- Modal for confirming post deletions.

**DashProjects.jsx**: Manage portfolio projects.

- View, add, edit, and delete projects.
- Upload images to Firebase storage.
- Modal for adding and confirming deletions.

**DashTimeline.jsx**: Manage timeline events.

- View, add, edit, and delete timeline events.
- Modal for adding and confirming deletions.

**DashUsers.jsx**: Manage user accounts.

- View, delete, and paginate through users.
- Modal for confirming user deletions.

### Token Verification

The application uses JSON Web Tokens (JWT) for authentication and token verification. This ensures that only authorized users can access and perform actions within the admin dashboard.

## Screenshots

The following animation demonstrates the application functionality:

![Demo of PWA Text Editor](./client/src/images/Demo.gif)

The following image shows the application's `manifest.json` file:

![Demo Manifest File](./client/src/images/Demo-Manifest.png)

The following image shows the application's registered service worker:

![Demo Service Worker](./client/src/images/Demo-Service.png)

The following image shows the application's IndexedDB storage:

![Demo IndexedDB](./client/src/images/Demo-IndexedDB.png)


## Features

- **Single-Page Application**: Built with React for a seamless user experience.
- **Responsive Design**: Mobile-first design ensures the site looks great on all devices.
- **Dynamic Routing**: Navigation without page reloads using React Router.
- **Form Validation**: Contact form includes validation for required fields and email format.
- **Downloadable Resume**: Easy access to a downloadable resume in the Resume section.
- **Backend Services**: Backend is deployed on Heroku to handle server-side logic.
- **GitHub Integration**: Fetches profile data and contributions using the GitHub API.
- **User Dashboard**: Signed-in users can update their profile information.
- **Admin Dashboard**: Admins can manage comments, posts, projects, users, and timeline events.
- **JWT Authentication**: Secure token-based authentication for user sessions.



## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

- If you have any questions, feel free to reach out via: <https://github.com/PrestonNguyen2001>
- For additional questions or support, contact me at <prestonnguyen2001@gmail.com>





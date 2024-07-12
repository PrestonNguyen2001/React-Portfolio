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
- **Vite**: For building the application.
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

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Flowbite](https://img.shields.io/badge/Flowbite-38B2AC?style=for-the-badge&logo=flowbite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404d59?style=for-the-badge&logo=express&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![GitHub API](https://img.shields.io/badge/GitHub_API-181717?style=for-the-badge&logo=github&logoColor=white)
![jsonwebtoken](https://img.shields.io/badge/JSON_Web_Tokens-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

## Installation

To install this application:

1. Clone the Repository:

```bash
git clone https://github.com/PrestonNguyen2001/React-Portfolio.git
```

2. Navigate to the Root Directory:

```bash
cd React-Portfolio
```

3. Install Dependencies:

```bash
npm install
```

4. Build the Client:

```bash
npm run build
```

5. Start the Application:

```bash
npm run start:dev
```

## Deployment

The application is deployed on Render. You can access the live application [here](https://preston-devfolio.netlify.app).

## Usage

- **Open the Application**: Open the application in your browser by going to the deployed URL.
- **Navigate Through Sections**: Use the navigation bar to switch between About Me, Portfolio, Contact, and Resume sections.
- **Submit Contact Form**: Fill out the contact form to send a message. Form validation is in place to ensure required fields are filled out correctly.
- **Download Resume**: Go to the Resume section to download a copy of my resume.
- **View GitHub Data**: The application fetches profile data and contributions from GitHub using the GitHub API.
- **Dashboard for Users**: Signed-in users can access the dashboard to update their username, email, password, or profile image.

### User Dashboard

Signed-in users can access the dashboard to manage their profile. The dashboard allows users to:

- Update Username
- Update Email
- Update Password
- Update Profile Image
- Delete Profile

### Admin Dashboard

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

## Blog Functionality

### Overview

The blog functionality allows the admin to post blogs, which are displayed on the home page. Users can click on a blog to view its content, add comments, view other users' comments, and like comments.

### Features

- Post Blogs: Admins can create and post blogs from the dashboard.
- Display Blogs on Home Page: Posted blogs are displayed on the home page.
- View Blog Details: Users can click on a blog to view its full content.
- Add Comments: Users can add comments to blogs.
- View Comments: Users can view comments from other users.
- Like Comments: Users can like comments on blogs.

### Components

**DashPosts.jsx**: Admin component to manage blog posts.

- Create, edit, and delete blog posts

.
- Upload images and manage content using a rich text editor.

**Blog.jsx**: Component to display individual blog posts.

- Show blog content, comments, and like counts.
- Allow users to add and like comments.

**Blogs.jsx**: Component to display a list of all blog posts.

- Show previews of blog posts.
- Allow navigation to individual blog posts.

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
- **Blog Functionality**: Admins can post blogs, and users can interact with blog content through comments and likes.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

- If you have any questions, feel free to reach out via: [GitHub](https://github.com/PrestonNguyen2001)
- For additional questions or support, contact me at [prestonnguyen2001@gmail.com](mailto:prestonnguyen2001@gmail.com)


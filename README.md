# User-Authentication-App
## What this is

User Authentication App is a React single-page application that demonstrates a complete email-based authentication flow backed by Firebase Authentication. It allows users to register, log in, log out, reset forgotten passwords, change their current password, browse available full-stack courses, and submit questions through an EmailJS-powered doubt form.

**How it fits together:** `src/index.js` mounts the React application and renders `App.js`. `App.js` defines routes for login, registration, home, password recovery, password changes, course information, and the doubt form. Authentication operations are performed through Firebase Authentication, while the application stores the logged-in email in `localStorage` to control navigation and display authenticated links in `NavBar.js`. The `Doubt` component sends submitted questions through EmailJS.

### Main routes

| Route | Purpose | Access |
|---|---|---|
| `/` | Login page | Public |
| `/signup` | Create a new account | Public |
| `/forgotpassword` | Request a password reset email | Public |
| `/home` | Welcome page and logout | Authenticated |
| `/about` | Display available courses | Authenticated |
| `/changepassword` | Update the current password | Authenticated |
| `/doubt` | Submit a question or doubt | Intended for authenticated users |

### Features

- Email and password registration using Firebase
- Email and password login
- Email format validation
- Password confirmation during registration
- Friendly login error messages for invalid credentials and missing users
- Persistent login-state handling through `localStorage`
- Conditional navigation links for public and authenticated users
- Protected-page redirects for the home, about, and change-password pages
- Logout functionality
- Password reset email flow
- Authenticated password change with password-strength validation
- Course listing for:
  - JavaScript Full Stack
  - Java Full Stack
  - Python Full Stack
- Doubt submission form with EmailJS
- Responsive visual styling using CSS backgrounds, cards, forms, and navigation elements

## How to run it

The repository includes a generated `build/` directory, but the source repository currently does not include a `package.json` file. It also imports `./Firebase` from several components, although a corresponding `src/Firebase.js` file is not present in the repository tree. Therefore, a fresh clone cannot currently be started with a verified `npm install` / `npm start` workflow without restoring the missing project configuration and Firebase setup.

After adding the required React project manifest and Firebase configuration, the intended development workflow is:

```bash
git clone https://github.com/rajputapoorva94/User-Authentication-App.git
cd User-Authentication-App

npm install
npm start
```

The application requires a Firebase project configured for Email/Password Authentication. The Firebase configuration should be stored in a dedicated module such as `src/Firebase.js` and should not be committed with private credentials.

For a production build:

```bash
npm run build
```

The generated files can then be served from the `build/` directory using a static web server.

### Configuration notes

Before running the application, configure:

- Firebase Authentication with the Email/Password provider enabled
- Firebase application credentials
- EmailJS service, template, and public key values for the doubt form
- Environment variables instead of hard-coded service credentials

### Implementation considerations

- The current project uses `localStorage` to track the logged-in email, while Firebase maintains the actual authentication state.
- Password validation is explicitly implemented in `ChangePassword.js`.
- The existing starter test in `App.test.js` still checks for the default Create React App “learn react” text, which is not rendered by this application and should be updated.
- Firebase and EmailJS credentials should be moved out of source code before deploying the application publicly.

## Try asking

- How can I restore the missing `package.json` and Firebase configuration so this React app runs locally?
- How should authentication guards be refactored to use Firebase `onAuthStateChanged` instead of `localStorage`?
- Can you update `App.test.js` with tests for login, signup, logout, and password-reset behavior?

# Spot-the-BUGS Challenge!

This project aims to identify bugs found on https://qa-practice.netlify.app/bugs-form by utilizing an automated testing framework built with Playwright and TypeScript. 
I have managed to design and implement automated test cases, that identifies 15 different types of issues, ranging from UI inconsistencies and functionality errors.
The goal is to improve the registration functionality and user experience by detecting and resolving these bugs, ensuring a more reliable and efficient registration process.

## Run Locally

Clone the project

```bash
  git clone https://github.com/manas-jadye/Spot-the-BUGS.git
```

Go to the project directory

```bash
  cd Spot-the-BUGS
```

Install dependencies

```bash
  npm install
```

Run the test cases

```bash
  npx playwright test registration.spec.ts
```

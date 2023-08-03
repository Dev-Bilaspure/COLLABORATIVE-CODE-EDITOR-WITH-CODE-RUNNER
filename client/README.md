## Setup

To get the project up and running, use the following commands:

```bash
yarn # Install dependencies
yarn dev # Start application
```

## Miscellaneous

- React Router v6 documentation: https://reactrouter.com/en/main/start/tutorial.

- Never write TypeScript in this project! Only name your files `.ts` and `.tsx` for now. We'll add types later.

## Running Playwright tests on dev.

- Close the vite server and firebase emulators (if running).

- Then use the following command:

```bash
yarn playwright:ci
```

### Fix these rules before FULL production deployment

- Fix the firebase rules to disallow localhost access to firebase services.

### Testing

#### FAQ

Q: Setup?

A: Use the following commands:

```bash
cd playwright && yarn # Install dependencies for testing framework
cd .. && yarn start:dev # Start application & testing framework concurrently
```

Q: Firebase emulator won't run on anything before Java 11?

A: Have to download Java from here: https://www.oracle.com/java/technologies/javase/jdk19-archive-downloads.html. If doesn't get fixed, contact a developer.

# Introduction 
The **Survey Designer Automation Tests** project aims to automate the testing process for the Survey Designer application. This ensures that the application functions correctly and consistently meets the required quality standards. By automating tests, we can quickly identify issues and improve the efficiency of the development process.
## Installation Process
Follow these steps to get the project up and running on your local machine:

1. Clone the repository:
    ```bash
    git clone https://Dooblo@dev.azure.com/Dooblo/Survey%20Designer/_git/survey-designer-automation-tests
    cd survey-designer-automation-tests
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

## Configuration

1. Duplicate the `.env.example` file and rename it to `.env`:
    ```bash
    cp .env.example .env
    ```

2. Add the `BASE_URL` and user credentials to the `.env` file:
    ```env
    BASE_URL='https://staging.stg.qllaborate.com'
    USERNAME='your-username'
    PASSWORD='your-password'
    TENANT='your-tenant'
    AZURE_TOKEN='your-azure-token'
    ```

## Software Dependencies
Ensure you have the following software installed:

- Node.js (version 18)
- Playwright (version 1.44)
- Any other dependencies can be installed via `npm install`

## Running Tests
Execute the test suite with the following commands and examples:

1. **Run all tests**:
    ```bash
    npx playwright test
    ```

2. **Run tests in a specific file**:
    ```bash
    npx playwright test src/tests/example.spec.ts
    ```

3. **Run tests with a specific project** (e.g., chromium, firefox, webkit):
    ```bash
    npx playwright test --project=chromium
    ```

4. **Run tests in headed mode**:
    ```bash
    npm run headed
    ```



# Demoblaze Application Automation Using Playwright

## Pre-requisites

1. Visual Studio installed
2. Node.js installed
3. Access to Github.com

    
## Configuration Steps for Playwright and Test Automation Repository

1. In Visual Studio, open a new window, navigate to the Source Control section, and clone the repository:
    ```sh
    https://github.com/yogeshsjadhav13/IMDBPokeAPITestAutomation.git
    ```
2. Once the repository is cloned, open the terminal, select PowerShell, and run the following command to install all the required dependencies:
    ```sh
    npm install
    ```
3. Once the dependencies are installed, run the following command to install the required browsers for Playwright:
    ```sh
    npx playwright install --with-deps
    ```
4. Run all the test with the following command:
    ```sh
    npx playwright test
    ```

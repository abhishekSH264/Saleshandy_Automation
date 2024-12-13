To Run Cypress we need to insatll Node packages and Cypress

Commands To install Node Packages on ubuntu - 


Using Ubuntu (Node.js 23)
Before you begin, ensure that curl is installed on your system. If curl is not installed, you can install it using the following command:
sudo apt-get install -y curl


Download the setup script:
curl -fsSL https://deb.nodesource.com/setup_23.x -o nodesource_setup.sh


Run the setup script with sudo:
sudo -E bash nodesource_setup.sh


Install Node.js:
sudo apt-get install -y nodejs


Verify the installation:
node -v


Commands to install Cypress on ubuntu  - 


Install npm (Node Package Manager): If npm is not already installed with Node.js:
sudo apt install npm


Optional Step - 
Initialize a New Project (Optional): 
Navigate to your desired project folder and initialize a new project:
mkdir cypress-project && cd cypress-project



Initialize the Npm int he working directory - 
npm init -y

Ways to Open the Cypress - 
npx cypress open
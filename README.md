<br />
<div align="center">

  <h3 align="center">Diabuddy</h3>

  <p align="center">
    Diabuddy is a diabetes management mobile application (iOS/andriod).>
    <br />
    <br />
    <a href="https://github.com/frankieavina/diabuddy-frontend">View Demo</a>
    ·
    <a href="https://github.com/frankieavina/diabuddy-frontend/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/frankieavina/diabuddy-frontend/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

A diabetes management app engineered to facilitate monitoring for patients and doctors, seamlessly integrating with the Nightspot Web Monitor to provide real-time glucose readings 
for enhanced care. 


### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![React][React.js]][React-url]
* React-Native
* Express
* Node.js
* Expo

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

to get started you will need vs code xcode with simulator. For andriod you will need andriod studio. 

Lastly you will need MySQL Workbench installed on your computer. 

### Prerequisites

This version of diabuddy was built on older expo and react native versioins so make sure your npm is compatible. 

One error I did run into is since the react native version is older we have to run the simulator on an older version of ios. The version that worked for me was iOS 16.4.
Here is some more docutemtation or workarounds on this issue: [https://github.com/facebook/react-native/issues/36794#issuecomment-1500880284]

Also, I did use Edamam API to get my food carbohydrates data but now they changed there subscription and now have to pay for this feature. As a result, adding carbohydrates feature
is no longer supported. 

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo (both backend and frontend)
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Add a .env file both for your backend where you will define your MySQL database configurations that will connect your server to your DB. 
4. Start your client side app 
    ```sh
    expo start
   ```
5. In your backend uncomment line 21. Only do this once. This is to populate your DB and add the required tables needed 
   line 21  initial();  
6. start your backend (server) 
   ```sh
   nodemon server.js
   ```
7. going to your client(frontend) terminal it will ask you to press i to open your simulator (iOS) 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Patient Dashboard:
![Simulator Screenshot - old iOS iPhone 14 Pro - 2024-08-16 at 14 19 33](https://github.com/user-attachments/assets/eb916fb2-0840-485b-8639-d97488448362)

Doctor Dashboard:
![Simulator Screenshot - old iOS iPhone 14 Pro - 2024-08-16 at 14 22 10](https://github.com/user-attachments/assets/0f7e2965-244f-4040-80fa-174aa3893c1e)

Admin Dashboard:
![Simulator Screenshot - old iOS iPhone 14 Pro - 2024-08-16 at 14 20 17](https://github.com/user-attachments/assets/317accb0-b57c-4c92-af45-22d94d6e7115)

<!-- CONTACT -->
## Contact

Francisco Avina - [frankieavina@gmail.com]

Project Link: [https://github.com/frankieavina/diabuddy-frontend](https://github.com/frankieavina/diabuddy-frontend)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


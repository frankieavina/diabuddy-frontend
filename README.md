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

A diabetes management app engineered to facilitate monitoring for patients and doctors, seamlessly integrating with the Nightscout Web Monitor to provide real-time glucose readings for enhanced care. 

Nightscout (also known as CGM in the Cloud) is an open-source cloud application used by people with diabetes and parents of kids with diabetes to visualize, store and share the data from their Continuous Glucose Monitoring sensors in real-time. Once setup, Nightscout acts as a central repository of blood glucose and insulin dosing/treatment data for a single person, allowing you to view the CGM graph and treatment data anywhere using just a web browser connected to the internet.
![Screenshot 2024-08-16 at 3 49 15 PM](https://github.com/user-attachments/assets/661689c3-bbc7-47d5-8b17-4a7ea5084c4b)



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![React][React.js]][React-url]
* React-Native
* Express
* Node.js
* Expo
* MongoDB Atlas
* Redux
* MySQL Workbench

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

8. To set up nightscout and have live data do the following:
   a.There are several parts to this system. You need somewhere online to store, process and visualize this data (a Nightscout Site), something to upload CGM data to your             Nightscout (an Uploader), and then optionally you can use other devices to access or view this data (one - or more - Follower).
   ![Screenshot 2024-08-16 at 3 49 31 PM](https://github.com/user-attachments/assets/de3ce4c9-649f-4ad9-9001-9db6e7292c52)

   b.We got to Set Up DB using MongoDB Atlas: [https://nightscout.github.io/vendors/mongodb/atlas/]
   c.Set Up/Create own Nightscout Web App: [https://nightscout.github.io/vendors/railway/new_user/]
   d.Set up your uploader ( in this case I have a Medtronic pump so I will use Medtronic Carelink with xDrip+ app on an Andriod device) Nightscout: [https://nightscout.github.io/uploader/xdripcarelink/]  [https://nightscout.github.io/uploader/setup/]


Note: There are many ways both free and paid services each with pros and cons that you can go about setting up Nightscout. It just depends on your needs, hardware, and other variables. For more info here is a link: [https://nightscout.github.io/]


<!-- USAGE EXAMPLES -->
## Usage

Patient Dashboard:
<br>
<img src="https://github.com/user-attachments/assets/eb916fb2-0840-485b-8639-d97488448362" width="350" />

Doctor Dashboard:
<br>
<img src="https://github.com/user-attachments/assets/0f7e2965-244f-4040-80fa-174aa3893c1e" width="350" />

Admin Dashboard:
<br>
<img src="https://github.com/user-attachments/assets/317accb0-b57c-4c92-af45-22d94d6e7115" width="350" />

<!-- CONTACT -->
## Contact

Francisco Avina - [frankieavina@gmail.com]

Project Link: [https://github.com/frankieavina/diabuddy-frontend](https://github.com/frankieavina/diabuddy-frontend)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


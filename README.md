# react-meetup - FRAN ARAGÓN

## Overview

This repository contains the react-meetup project, developed as part of a technical test for AXPE Consulting. The web application allows users to create, view, and mark meetups as favourites. This README provides an overview of the project structure, functionalities, and setup instructions.

## Table of Contents

- [Features](#features)
- [Technology Stack](#tech-stack)
- [Installation and Setup](#installation-setup)

<a id="features"></a>
## Features

The project includes the following core functionalities:

1. **Scroll-based Header Animation**:
   - The header includes an animation that hides when scrolling down and reappears when scrolling up. This improves user experience by maximizing screen space while navigating.

2. **Navigation with SEO-Friendly URLs**:
   - The header includes navigation links that reflect the corresponding pages in the URL, ensuring proper SEO practices. For example, the Favorites page is now accessible through `/favourites`.

3. **Favorites Toggle Functionality**:
   - The project now includes functionality to add and remove meetups from the user's favorites list. The state of favorites is stored in `localStorage`, ensuring persistence even after page reloads. The badge in the header dynamically updates to reflect the number of favorites in real-time, providing a seamless experience for the user.

<a id="tech-stack"></a>
## Technology Stack

The project uses the following technologies and libraries:

- **React (v18.3.1)**: Core framework for building the UI.
- **React Router DOM (v7.0.1)**: Routing and navigation.

<a id="installation-setup"></a>
## Installation and Setup

To set up this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd react-meetup

2. Install dependencies:

   ```bash
   npm install

4. Run the Application:
Start the development server:
   ```bash
   npm start

The app should now be running on http://localhost:3000.

# StudyNotion - EdTech Platform

StudyNotion is a web-based EdTech platform that enables students to access a wide range of courses and instructors to manage their content. It offers full authentication, secure payment processing, and a user-friendly interface(completely responsive design).

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [For Students](#for-students)
  - [For Instructors](#for-instructors)
- [Back-end](#back-end)
  - [Back-end Architecture](#back-end-architecture)
  - [Features and Functionalities](#features-and-functionalities)
  - [Frameworks, Libraries, and Tools Used](#frameworks-libraries-and-tools-used)
- [Front-end](#front-end)

## Overview

StudyNotion is a comprehensive EdTech platform that caters to both students and instructors. Students can explore courses, make purchases, and track their progress. Instructors can manage courses, gather insights, and interact with their students effectively.



![homepage1](https://github.com/Sujeet76/StudyNotion/assets/126092124/e842a4e9-da24-4fb7-a61e-8b77b4a68b01)



![home2](https://github.com/Sujeet76/StudyNotion/assets/126092124/d21edb20-dcee-432a-a26f-e19893eed0ce) 
![home3](https://github.com/Sujeet76/StudyNotion/assets/126092124/191e5e0d-a1c5-4e06-968a-135842402ffa)

#### Video Preview


https://github.com/Sujeet76/StudyNotion/assets/126092124/fdf1d2e6-e3b7-445f-892a-95f8355171b8





## Getting Started

To set up and run StudyNotion locally for development, follow the steps below:

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- MongoDB
- Git

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/Sujeet76/StudyNotion.git
   ```

2. Navigate to the project directory:

   ```shell
   cd StudyNotion
   ```

3. Install frontend dependencies:

   ```shell
   cd client
   npm install
   ```

4. Install backend dependencies:

   ```shell
   cd server
   npm install
   ```

5. Set up environment variables as described in `sample.env.text` files in the `client` and `server` directories.

6. Start the client and server(backend) servers:


   ```shell
   # In the client(frontend) directory
   npm run dev

   # In the server(backend) directory
   npm run dev
   ```

## Usage

StudyNotion offers a range of features for both students and instructors.

### For Students

- **Homepage**: Provides an introduction to the platform and links to course lists and user details.
- **Course List**: Displays available courses, including descriptions and ratings.
- **Wishlist**: Shows courses added to a student's wishlist.
- **Cart Checkout**: Allows users to purchase courses.
- **Course Content**: Provides course materials, including videos and related content.
- **User Details**: Displays account information, including name and email.
- **User Edit Details**: Enables users to edit their account details.

### For Instructors

- **Dashboard**: Offers an overview of instructor courses, ratings, and feedback.
- **Insights**: Provides detailed course metrics, such as views and clicks.
- **Course Management Pages**: Allows instructors to create, update, and delete courses, as well as manage content and pricing.
- **View and Edit Profile Details**: Allows instructors to view and edit their account information.

## Back-end

### Back-end Architecture

StudyNotion employs a monolithic architecture, with the back end built using Node.js and Express.js, and MongoDB as the primary database. Monolithic architecture combines all application modules into a single program, ensuring control, security, and performance.

### Features and Functionalities

The StudyNotion back end offers the following features:

- **User Authentication and Authorization**: Supports user registration, login, OTP verification, and password recovery.
- **Course Management**: Enables instructors to perform CRUD operations on courses and manage content.
- **Payment Integration**: Facilitates course purchases with Razorpay integration for payment handling.
- **Cloud-Based Media Management**: Utilizes Cloudinary for storing and managing media content, including images, videos, and documents.
- **Markdown Formatting**: Stores course content in Markdown format for efficient rendering on the front end.

### Frameworks, Libraries, and Tools Used

The back end uses the following technologies:

- **Node.js**: As the primary framework.
- **MongoDB**: As the primary database.
- **Express.js**: As a web application framework.
- **JWT**: For secure authentication and authorization.
- **Bcrypt**: For password hashing.
- **Mongoose**: As an Object Data Modeling (ODM) library for MongoDB interactions.

## Front-end

The front end of StudyNotion is built using ReactJS, a powerful library for creating dynamic and responsive user interfaces. ReactJS ensures an engaging learning experience for students by offering a user-friendly interface that communicates with the back end through RESTful API calls.

### Frameworks, Libraries, and Tools Used

- **React**: AS the primary framework
- **Redux tool kit** : For state management
- **Framer motion**: For animation

---

This README provides an overview of StudyNotion, its architecture, features, and technologies used in both the front-end and back-end. For demo visit our website at [https://studynotion-edtech-pied.vercel.app/](https://studynotion-edtech-pied.vercel.app).

For any questions or support, feel free to reach out to us at ksujeetkumar7678@gmail.com.

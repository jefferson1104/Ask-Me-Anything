<div align="center" style="margin-bottom: 20px;">
  <div>
    <img alt="thumbnail" src="./public/images/thumbnail.png">
  </div>

  <div align="center">
    <img alt="technology" src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white">
    <img alt="technology" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
    <img alt="technology" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
    <img alt="technology" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
    <img alt="technology" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
  </div>
</div>

## :memo: About project

This project is an interactive Q&A system designed for AMA (Ask Me Anything) sessions. Users can create rooms and share the room link with others to join. Within the room, participants can submit questions and like existing ones. Each like boosts the question's ranking, pushing the most popular questions to the top for the room owner to answer.

## 🛠️ Features

- **Room Creation:** Users can create a room and share the ID to allow others to join and participate.
- **Question Submission and Likes:** Participants can submit questions and like others' questions. Each like increases the visibility of the question, moving it up in the ranking to help prioritize the most relevant questions for the room owner.
- **Real-Time Interactions:** All interactions, such as submitting questions, liking them, and marking questions as answered, are handled in real-time using WebSocket, ensuring a dynamic and instant experience.

## ⚡ Technologies Used

- **React.js 19:** The latest version of React is used to develop the user interface.
- **Vite:** A fast build tool for React development.
- **React Router DOM:** Used for smooth navigation between pages.
- **Tailwind CSS:** A utility-first CSS framework for fast and responsive styling.
- **TypeScript:** Provides static typing for more reliable and maintainable code.

## :cyclone: Run this project

**Before proceeding, you need to download and set up the [project API](https://github.com/jefferson1104/Ask-Me-Anything-Server). Visit the API repository at the link below and follow the provided instructions. Once the API is running, return here and follow the steps below to run the Client.**

```bash
# clone this repository
git clone https://github.com/jefferson1104/Ask-Me-Anything.git

# go to the folder
cd Ask-Me-Anything

# environment file
rename the .env.example file to .env

# Install dependencies
$ npm install

# Run app
$ npm run dev
```

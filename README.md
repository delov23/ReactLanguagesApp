# Lingo :u5272:
### An app that can teach you languages. The only limit is you.
![Langs](https://mycroft.ai/wp-content/uploads/2018/05/languages-edited.png)

##  1. Overview
Lingo is an application that aims to teach one a new language in a fun and creative way. Basically, the project consists of two parts - a `back-end` one and a `front-end` one. The `back-end` fragment is created with the framework _express_ whereas in the `front-end` piece I have used _React_. The functionality is divided into two roles - `Admin` and `User`. The admin is the one who creates courses and lessons and removes them. The user can take advantage of all the available lessons. There is also an `Anonymous` role in which one can only see the home page, register and login.
  
##  2. Back-end
### Type `node index` in the console of the API folder to start it
As I mentioned earlier the framework used for the server logic is _express_. The API works on port **9999** and has the following functionalities: 
  * User:
    - `/auth/signup` (Authentication route)
    - `/auth/signin` (Authentication route)
    - `/user/profile`
    - `/user/addCourse/:id`
  * Course:
    - `/course/all`
    - `/course/create`
  * **Lesson** - create, delete and preview a lesson
    - `/lesson/findByCourse/:id`
    - `/lesson/:id`
    - `/lesson/delete`
  * Question - create a question for the test that is in a lesson
    - _Has a reference to the test array in the lesson schema and is used when creating a test in a lesson_
  * Word - create a word for the lesson
    - _Has a reference to the words array in the lesson schema and is used when creating a word list in a lesson_
    
##  3. Front-end
### Type `npm start` in the console of the langs-app folder to start it
The used framework for the front-end is _React_. These are the highlights from it:
  * Home page:
    - Anonymous: A greeting message that switches languages
    - User/Admin: A preview of all the courses available
  * Create Lesson Form:
    - Dynamical addition of words and questions

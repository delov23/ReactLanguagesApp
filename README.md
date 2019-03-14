# Lingo :u5272:
### An app that can teach you languages. The only limit is you.
![Langs](https://mycroft.ai/wp-content/uploads/2018/05/languages-edited.png)

##  0. Initial Setup
Lessons and courses are hard to make. For this reason there is a folder DatabaseExample in which you can find the documents I made in order for you to have a look at the app without having to deal with creating entities. The admin username is 'delov23' and the password is '123456'. For a simple user you can go with u: 'user1' and p: 'user1'.

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
    - `/lesson/remove`
  * Question - create a question for the test that is in a lesson
    - _Has a reference to the test array in the lesson schema and is used when creating a test in a lesson_
  * Word - create a word for the lesson
    - _Has a reference to the words array in the lesson schema and is used when creating a word list in a lesson_
    
##  3. Front-end
### Type `npm start` in the console of the langs-app folder to start it
The used framework for the front-end is _React_. These are the highlights from it:
  * Home Page:
    - Anonymous: A greeting message that switches languages
    - User/Admin: A preview of all the courses available
  * Create Lesson Form:
    - Dynamic addition of words and questions
  * Preview Lesson:
    - A lesson has three stages and the `/lesson/preview/:id` is the route they can be found in. 
    - First, it shows th vocabulary secion, then the grammar one. 
    - Finally, when the stage property of this.state becomes the number three, a test (quiz) is displayed.
    - The test is the only stage of a lesson which is a class component, because it has bonus functionality - to show when an answer is correct or wrong.
  * User Profile:
    - The user profile shows the basic information about a registered person and their courses. A course is added to one's profile when they have completed at least one lesson of it.
  * Preview Lessons in a Course:
    - Dynamic page that shows all the lessons in a course. If the user is admin, they can manage the lessons (remove them).
  * Notifilcations:
    - I have used toastify as a notification helper. 
  * Data layer:
    - A requester makes the requests to the api and it is used in the `src/data/data.js` file in order to simplify the work of the components.

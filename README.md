# Quiz-app

 This project is a simple quize platform where user can register and after logging in complete some quizes. Each quiz can have unlimited number of questions with one correct answer. <br/><br/>
 After completing the quiz user won't be able to open it again, the grade will be dispalyed based on the number of correctly answered questions.<br/><br/>
 This app uses express on server side and mongo as the database, while React is used to handle the client side.<br/><br/>

## How to run the app in the docker

  To run the app in the docker, open the root folder of the project in the terminal and run `docker-compose up` command. <br/><br/>
  All the dependecies will be installed and the app will be built automatically. <br/><br/>
  Finally, open the `http://localhost:5173/` in the browser.<br/><br/>

## How to use the app

  1. First, register a new user. Use these credentials to log into the app.<br/>
  
  ![Screenshot (248)](https://github.com/BohdanStasov/quiz-platfrom/assets/113253107/c05a16bf-0210-4bcd-b1e1-d756e2edee5e)

  2. Click on the "Start" button to open the quiz.<br/>
  
  ![Screenshot (249)](https://github.com/BohdanStasov/quiz-platfrom/assets/113253107/8f1994f0-3c3f-473d-978f-18b010de8682)

  3. Answer the quiz and click "Submit button"
     
  ![Screenshot (250)](https://github.com/BohdanStasov/quiz-platfrom/assets/113253107/e526494e-5048-42e7-b90b-e5ac60dec500)

  4. Your grade will be displayed along with "Completed" sign instead of button.

  ![Screenshot (251)](https://github.com/BohdanStasov/quiz-platfrom/assets/113253107/e106db42-0c18-4f56-993d-adb5754652f6)

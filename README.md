Deploy To Staging Server.
1. To Deploy Client Application the Staging Server push the latest code to the master branch. After pushing or merging the latest code to the master branch, the latest 2. code will get updated to the latest server within 5 minutes.
3. Link to the staging server (https://testing-platform-clientstaging.herokuapp.com/) 

Deploy To Production Server.
1. To Deploy Client Application the Production Server push the latest code to the main branch. After pushing or merging the latest code to the main branch, the latest code will get updated to the latest server within 5 minutes.
3. Link to the Production server (https://client.marketingmgmt.net/)

How to change environment variable for Client app.
1. Log into teams heroku account or with account which have admin access to marketing-management teams.
2. After Login go to testing-platform-client app (if you want to change enviroment variable for Production server) or testing-platform-clientstaging (if you want to change enviroment variable for Staging server) and then click on settings. 

![image](https://user-images.githubusercontent.com/50096917/209548870-011ec664-649e-4a45-9db1-276e45c1dc42.png)
3. After clicking on reveal config vars button all the environment will appear. Here you can add, edit or delete environment variables.

‘/’ => Personal detail page (1st page)

“/startTest” => Instruction Page where start button is available for starting test (2nd page)

“/test” => here main test starts (3rd page)

“/testCompleted” => Last page where test is submitted successfully message and feedback is to be given

“/adminLogin” => Admin Login page

“/table” => It Displays all the users

“/retestExhausted” => Limit for attempting test is over





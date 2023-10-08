
# WeCare

WeCare is an online Life Coaching application that helps its users to sign up and log in to seek the guidance of famous Life Coaches. Users can search for a Life Coach based on specialty and can book an appointment within 7 days. They can also see upcoming appointments and can reschedule or cancel the appointments. Similarly, Life Coaches can also sign up and login and can see their upcoming schedule. 

### List of Software’s Required:

* Node JS
* React
* Visual Studio Code IDE
  
## Deployment

To deploy this project follow the below steps:


#### Backend Setup:

json-server will act as the backend for this application. Follow the below steps to run the json-server as backend

1. Open the application folder inside command prompt and install json-server using below command:

```bash
  npm install -g json-server
```
Create a db.json file in the application folder (parallel to src folder) and add the following data in the db.json file

```bash
  {
  "users": [
    {
      "id": 1,
      "name": "Maria",
      "password": "maria12345",
      "gender": "F",
      "dateOfBirth": "1996-01-01",
      "email": "maria@gmail.com",
      "mobileNumber": 1234567890,
      "pincode": 123456,
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India"
    }
  ],
  "coaches": [
    {
      "id": 1,
      "name": "Rose",
      "password": "rose12345",
      "gender": "F",
      "dateOfBirth": "1996-01-01",
      "mobileNumber": 1234567890,
      "speciality": "Confidence Issues"
    }
  ],
  "bookings": [
    {
      "appointmentDate": "2020-09-24",
      "slot": "10 AM to 11 AM",
      "userId": 1,
      "coachId": 1,
      "id": 1
    }
  ]
}
```
3. Start json-server using the below command in the terminal:

```bash
npx json-server --watch db.json --port 8080
```
This will start the server at port 8080

After the above step open the application folder in another terminal and run the below command:
```bash
npm start
```
You might face some errors it might be due to dependencies. To resolve that go into package.json folder and see the listed dependency and install all the dependencies. 

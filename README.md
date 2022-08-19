<pre>
# intern
in this project i have createda a app which i will explain line by line

in This app i am using mongodb as a database beacuse it stores data as Json format which is very easy to visulize

in this app i have created 3 routers hospital, psychiatrist, patient i will explain all one by one

<h4>hospital</h4>
hare i have created 3 function
1 CreateNewHospital (post request)
which will be called at the end point 
  /api/hospital/Create
 we also have to pass some data as req.body in format
  {
    "hospital_name" : "All India Institute Of Medical Science (AIIMS)",
  }
 this will create new hospital obj with name {hospital_name}
 
2 UpdateHospital (patch request)
end point /api/hospital/Create
req.body in format
{
    "hospital_name" : "All India Institute Of Medical Science (AIIMS)",
    "id" : "62ff66a68cfc3240833b6df9"
}
this will change hospital_name with given id
3 Hospitaldetails (get request)
end point /api/hospital/details/:HospitalID
we have to pass HospitalID in parsms example `62ff66a68cfc3240833b6df9`
and will get all the details about hospital like name psychiatrist details  patient count

<h4>psychiatrist</h4>
hare i created have 2 function
1 RegisterPsychiatrist (post request)
end point '/api/psychiatrist/ragister'
if i want to resister new psychiatrist in some hospital
{
    "HospitalID" : "62ff66748cfc3240833b6df5",
    "Psychiatrist_name" : "WildBeast_07",
    "password" : "12345678aA"
}
this password is for psychiatrist and i am also Encrypt the password with rolling has method
2 ChangeHospital (patch request)
end point '/api/psychiatrist/changeHospital/:HospitalID/:psychiatristID'
if i psychiatrist want to change  hospital
hare we have tio pass HospitalID, psychiatristID as params
example `http://localhost:8080/api/psychiatrist/changeHospital/62ff66928cfc3240833b6df7/62ff6ae3238179a826aa83ac'

<h4>patient</h4>
hare i created have 2 function
1 RegisterPatient (post request)
endpoint '/api/patient/create'
this is for resiter new patient with the help of some psychiatrist
psychiatrist will provide his id and password to create new patient 
req.body format 
{
    "Patient_name" : "vivek kumar ray",
    "email" : "rayvivek@gmail.com.com",
    "country_code": "+91",
    "Address" : "katni, Madhya Pradesh",
    "phoneNumber" : "7024572030",
    "photo" : "http://google.com",
    "PsychiatristID" : "62ff6a6d238179a826aa83a0",
    "password" : "12345678aA"
}
new patient will created added psychiatrist patients list
2 DeletePatient (delete requst)
end point '/api/patient/delete/:PatientID'
if patient is healthy then psychiatrist can also delete patient
if req.params we have to pass PatientID
req.body format
{
    "PsychiatristID" : "62ff6a6d238179a826aa83a0",
    "password" : "12345678aA"
}
 </pre>

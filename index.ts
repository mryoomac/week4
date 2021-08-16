import express from 'express';
import  { users, companies } from './database/db.json'
const app = express()


/// New JSON - for operations 
var operationalJSON = {
    Companies : Array()
}

companies.forEach(element => {
    /// CompanyID 
    const CompanyID = Number(element.name.split(` `)[1])
    /// loop assigning workers to operationalJSON
        var a = {
            CompanyName: element.name,
            CompanyID: CompanyID as number,
            CompanyURL: element.uri,
            Users: Array(),
        }
        
        users.forEach(element2 => {
        
        var b = {
            username: element2.name,
            userEmail: element2.email,
            userURL: element2.uri,
        }
        
        if (element2.uris.company.split(`/`)[2] === element.name.split(` `)[1]) a.Users.push(b)   
        });
                operationalJSON.Companies.push(a)
    });
    
app.get('/comp', function (req, res) {
        /// Sort companyID by ID number from the lowest
    var sortedArray: number[] = operationalJSON.Companies.sort((n1,n2) =>  n1.CompanyID - n2.CompanyID);
    res.json(operationalJSON)
})
    
app.get('/comp/sort', function (req, res) {
    /// Sort companyID by ID number from the highest
    var sortedArray: number[] = operationalJSON.Companies.sort((n1,n2) => n2.CompanyID - n1.CompanyID);
    res.json(operationalJSON)
})

app.get('/comp/userup', function (req, res) {
    /// Sort companyID from the highest number of users
    var sortedArray: number[] = operationalJSON.Companies.sort((n1,n2) => n2.Users.length - n1.Users.length);
    res.json(operationalJSON)
})

app.get('/comp/userdown', function (req, res) {
    /// Sort companyID from the lowest number of users
    var sortedArray: number[] = operationalJSON.Companies.sort((n1,n2) => n1.Users.length - n2.Users.length);
    res.json(operationalJSON)
})
 
app.get('/site', function (req, res) {
    /// Displaying via index
    res.sendFile('/site/index.html', { root: '.' })
})

app.listen(3000)

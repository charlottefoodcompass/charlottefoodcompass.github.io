// query = [organization, type, location, date, status]
// filter = options for id, boolean, location, daterange, status
// 0 = no filter, value = remove all queries except those with those values 

// init
const firebaseConfig = {
    apiKey: "AIzaSyBvNaTsxPXBcZraPPgSl7q1A5L-aTTvnOA",
    authDomain: "qch-project-thingy.firebaseapp.com",
    databaseURL: "https://qch-project-thingy-default-rtdb.firebaseio.com/",
    projectId: "qch-project-thingy",
    storageBucket: "qch-project-thingy.appspot.com",
    messagingSenderId: "725182269665",
    appId: "1:725182269665:web:2c00123b2d63ca724acfa0"
};


function getUserQueries(organization)
{
    firebase.initializeApp(firebaseConfig);
    
    const database = firebase.database();
    return filterQueries(getAllQueries(), [organization, 104, 104, 104, 104])
}

function createQuery(query)
{
    firebase.initializeApp(firebaseConfig);
    
    const database = firebase.database();
    dataRef = database.ref('nourishCLTQueryData');
    dataRef.push(query);
}

function updateQuery(query)
{
    firebase.initializeApp(firebaseConfig);
    
    const database = firebase.database();
    const dataRef = database.ref('nourishCLTQueryData').orderByChild("organization").equalTo(query.organization);
    dataRef.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
            child.ref.update(updateData);
        });
    });
}

function deleteQuery(query)
{
    firebase.initializeApp(firebaseConfig);
    
    const database = firebase.database();
    const dataRef = database.ref('nourishCLTQueryData');
    var queryToDelete = 0
    dataRef.on('value', (snapshot) => {
        const jsonData = snapshot.val();
        for (const key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                const item = jsonData[key];
                const id = item.organization;
                
                if (id == query[0])
                {
                    queryToDelete = key
                }
            }
        }
    });

    if (val == 0)
    {
        alert("invalid query id");
        return;
    }
    const deleteRef = database.ref('nourishCLTQueryData/' + val);
    deleteRef.remove()
    .then(() => {
        alert("delete successful!");
    })
    .catch((error) => {
        alert(error.message);
    });
}

// access others

function getAllQueries()
{
    firebase.initializeApp(firebaseConfig);
    
    const database = firebase.database();
    dataRef = database.ref('nourishCLTQueryData');
    var queries = [];
    dataRef.on('value', (snapshot) => {
        const jsonData = snapshot.val();
        for (const key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                const item = jsonData[key];
                queries.push([item.organization, item.type, item.location, item.date, item.status]);
            }
        }
    });

    return queries;
}

function filterQueries(queries, filters)
{
    firebase.initializeApp(firebaseConfig);
    
    const database = firebase.database();
    filterCopy = filters.filter((val) => val != 104);
    var finalQueries = [];
    for (query of queries)
    {
        let add = true;
        for (let i = 0; i < filters.length; i++)
        {
            if (query[i] != filter[i])
            {
                add = false;
            }
        }
        if (add)
        {
            finalQueries.push(query);
        }
    }

    return finalQueries;
}
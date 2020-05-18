

var firebaseConfig = {
    apiKey: "AIzaSyBeQnnKMSFeYs-d4eAMvrV3FXH1jllD_zA",
    authDomain: "todopwa-dbeb4.firebaseapp.com",
    databaseURL: "https://todopwa-dbeb4.firebaseio.com",
    projectId: "todopwa-dbeb4",
    storageBucket: "todopwa-dbeb4.appspot.com",
    messagingSenderId: "498851250546",
    appId: "1:498851250546:web:dc35907a2170d3a60addeb",
    measurementId: "G-ZYSN1LMEQM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore()








db.enablePersistence()
    .catch(function (err) {
        if (err.code == 'failed-precondition') {
            // probably multible tabs open at once
            console.log('persistance failed');
        } else if (err.code == 'unimplemented') {
            // lack of browser support for the feature
            console.log('persistance not available');
        }
    });

// Creating Render Function

let renderData = (db_Data) => {

    // Saving Data Into Variable

    let id = db_Data.id

    let task = db_Data.data().Task

    // Getting Dom Elements 

    let row = document.getElementById('row')

    // Creating Elements 

    let dataRow = document.createElement('row')

    let col1 = document.createElement('div')
    let col2 = document.createElement('div')
    let col3 = document.createElement('div')
    let col4 = document.createElement('div')

    let updateButton = document.createElement('button')
    let removeButton = document.createElement('button')
    // let editButton = document.createElement('button')



    // text_Context


    removeButton.textContent = "Remove"

    

    updateButton.textContent = "Update"

    // Adding Attributes


    dataRow.setAttribute('class', 'row')

    col1.setAttribute('class', 'col-md-8 col-3 taskWrapper  d-flex align-items-center')
    col1.setAttribute('id', `${id}`)
    col2.setAttribute('class', 'col-md-1 col-3 ')

    col3.setAttribute('class', 'col-md-1 col-3 ')
    col3.setAttribute('id', 'updateButton')

    col4.setAttribute('class', 'col-md-1 col-3 ')
    col4.setAttribute('id', 'updateButton')




 




    removeButton.setAttribute('class', 'btn btn-sm btn-danger mt-2')
    removeButton.setAttribute('onclick', 'remove("' + id + '")')
    removeButton.setAttribute('id', 'removeBtn')


    updateButton.setAttribute('class', 'btn btn-sm btn-primary mt-2')
    updateButton.setAttribute('onclick', 'update("' + id + '")')
    updateButton.setAttribute('id', 'updateBtn')




    // editButton.setAttribute('class', 'btn   btn-sm btn-warning mt-2')
    // editButton.setAttribute('onclick', 'editUI("' + task + '")')
    // editButton.setAttribute('id', 'editBtn')
    col4.innerHTML = `<button class="btn btn-sm btn-warning mt-2" onclick=editUI("${task}","${id}")>Edit </button>`


    // AppendIng Values
    col1.innerHTML = task
    col2.append(removeButton)
    col3.append(updateButton)
    // col4.append(editButton)


    dataRow.append(col1)
    dataRow.append(col2)
    dataRow.append(col3)
    dataRow.append(col4)


    row.append(dataRow)





}



// Creating AddTask Function


let addTask = () => {

    // getting Input Field Data

    let userInput = document.getElementById('userInput').value

    // Firebase Stuff

    if (userInput) {
        db.collection('users').add({
            Task: userInput
        })

    }
    document.getElementById('row').innerHTML = "";
    document.getElementById('userInput').value = '';


}




// Removing Task Fuction
let remove = (id) => {
    document.getElementById('row').innerHTML = "";
    db.collection('users').doc(id).delete()



}


// Edit Function


let editUI = (task, id) => {

    document.getElementById('userInput').value = task;
    document.getElementById('addBtn').hidden = true


    // let a = document.getElementById(id).parentElement.children[2].firstElementChild
    // a.classList.add('btn-success')
    // a.classList.remove('btn-primary')

    let a = document.getElementById(id).parentElement.children[3]
 a.style.display="none"






}

// Update Button


let update = (id) => {

    console.log(id)

    let userInput = document.getElementById('userInput').value

    if (userInput) {

        db.collection('users').doc(id).set({
            Task: userInput
        })
        document.getElementById('userInput').value = "";
        document.getElementById('addBtn').hidden = false

        document.getElementById('row').innerHTML = ""



    }
    let a = document.getElementById(id).parentElement.children[3]
 a.style.display="block"


}



// Real Time Data Listner
let dataListner = () => {
    document.getElementById('row').innerHTML = ' '

    db.collection('users').orderBy('Task').onSnapshot(a => {
        a.docs.forEach(db_Data => {
            renderData(db_Data)
        })


    })
}





// Caching DATA


if ('serviceWorker' in navigator) {
    console.log(navigator.serviceWorker)
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('service worker registered'))
        .catch(err => console.log('service worker not registered', err));
}























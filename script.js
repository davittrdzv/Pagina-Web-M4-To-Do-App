const form = document.querySelector('#create-to-do-form')
const toDoInput = document.querySelector('#to-do-input')
const toDoDate = document.querySelector('#due-date')
const actRad = document.querySelector('#active-radio')
const pendRad = document.querySelector('#pending-radio')
const closRad = document.querySelector('#closed-radio')
const addButton = document.querySelector('#add-button')
const toDosContainer = document.querySelector('#to-do-container')
const toDosActContainer = document.querySelector('#active-to-do-container')
const toDosPendContainer = document.querySelector('#pending-to-do-container')
const toDosClosContainer = document.querySelector('#closed-to-do-container')
let toDos = []

function submitHandler(event) {
    event.preventDefault();
    const toDoText = toDoInput.value;

    if(toDoText === '') {
        alert('Please include a "To Do" Item')
        return
    }

    if(toDoDate.value === '') {
        alert('Please include a Due Date')
        return
    }

    if(actRad.checked === false && pendRad.checked === false && closRad.checked === false) {
        alert('Please select status of "To Do"')
        return
    }

    const toDoId = Date.now();
    let toDoStatus = ''

    if (actRad.checked === true) {
        toDoStatus = 'Active'
    } else if (pendRad.checked === true) {
        toDoStatus = 'Pending'
    } else if (closRad.checked === true) {
        toDoStatus = 'Closed'
    }

    const newToDo = {
        title: toDoText,
        creation_date: '',
        due_date: toDoDate.value,
        status: toDoStatus,
        id: toDoId,
    }

    toDos.push(newToDo);
    renderToDos();
    toDoInput.value = ""
    toDoDate.value = ""
    actRad.checked = false
    pendRad.checked = false
    closRad.checked = false
}

function deleteHandler(event) {
    const idToDelete = parseInt(event.target.parentNode.getAttribute('data-id'))
    //parseInt convierte el string a número para poder comparar con el !==
    const newToDos = []
    
    for (let i = 0; i < toDos.length; i++) {
        if (idToDelete !== toDos[i].id) {
            newToDos.push(toDos[i]);
            //Este if checa que si texToDelete es distinto a la iteración, entonces hace un push de ese valor al arreglo.
        }
    }

    toDos = newToDos
    renderToDos()
}

function renderToDos() {
    toDosActContainer.innerHTML = ""
    toDosPendContainer.innerHTML = ""
    toDosClosContainer.innerHTML = ""
    //Esta línea hace que la variable toDosContainer
    //se borre todo su contenido,
    //porque el código está agregando todo el array
    
    for(let i = 0; i < toDos.length; i++) {
        const toDoItem = document.createElement('div');
        toDoItem.setAttribute('data-id', toDos[i].id)
        toDoItem.setAttribute('class', 'header-div')

        const toDoTitle = document.createElement('span');
        toDoTitle.textContent = toDos[i].title;

        const toDoCreationDate = document.createElement('span');
        const CreationDate = new Date();
        const dateOptions = {
            timeZone: 'America/Mexico_City',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };
        toDoCreationDate.textContent = Intl.DateTimeFormat("en-CA", dateOptions).format(CreationDate);

        const toDoDueDate = document.createElement('span');
        toDoDueDate.textContent = toDos[i].due_date;

        const toDoStatus = document.createElement('span');
        toDoStatus.textContent = toDos[i].status;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        toDoItem.appendChild(toDoTitle);
        toDoItem.appendChild(toDoCreationDate);
        toDoItem.appendChild(toDoDueDate);
        toDoItem.appendChild(toDoStatus);
        toDoItem.appendChild(editButton);
        toDoItem.appendChild(deleteButton);

        if (toDos[i].status === 'Active') {
            toDosActContainer.appendChild(toDoItem)
        } else if (toDos[i].status === 'Pending') {
            toDosPendContainer.appendChild(toDoItem)
        } else if (toDos[i].status === 'Closed') {
            toDosClosContainer.appendChild(toDoItem)
        }
        
        deleteButton.addEventListener('click', deleteHandler)
    }
    console.log(toDos);
}

form.addEventListener('submit', submitHandler)
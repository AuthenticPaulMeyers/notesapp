/*----- Toggle the edit area-----*/

// variables
const newButtonEl = document.querySelector('.js-new-button');
const cancelButtonEl = document.querySelector('.js-cancel-button');
const editBoxContainerEl = document.querySelector('.js-edit-box-container');
const bodyEl = document.querySelector('body');


// Toggle classes
newButtonEl.addEventListener('click', () => {
    editBoxContainerEl.classList.toggle('hidden');
});

cancelButtonEl.addEventListener('click', () => {
    editBoxContainerEl.classList.remove('hidden');
});

/* -----Add the content to the list-------*/
// Variables;
const saveButtonEl = document.querySelector('.js-create-button');
const contentEl = document.querySelector('.edit-area');
const titleEl = document.querySelector('.js-add-title');
const parentContainer = document.querySelector('.notes-list-container');

// Configure current time
const todayDate = new Date();
let hours = todayDate.getHours();
let minutes = todayDate.getMinutes();

hours = addZero(hours);
minutes = addZero(minutes);

const myTime = `${hours}:${minutes}`;

// create and object to keep the contents;
let allNotes = JSON.parse(localStorage.getItem('Notes'));

if(!allNotes){
    allNotes = [];
}

addHTML(); //Display the list by default

// Add notes to the list
function addNotes(){
    const content = contentEl.value;
    const title = titleEl.value;

     //Do not add the note if the edit area is empty
    if(content === '' || title === ''){
        alert('Please add a valid note!');
    }else{
        allNotes.unshift(
            {
                title: title,
                content: content,
                time: myTime
            });
        contentEl.value = '';
        titleEl.value = '';
        editBoxContainerEl.classList.remove('hidden');
    }
    addHTML();
}

// Add Event keydown 'Enter' to save the content
/*contentEl.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        addNotes();
    }
});*/

// When the save is clicked
saveButtonEl.addEventListener('click', () => {
    addNotes();
});

// Append data to HTML content
function addHTML (){
    let appendHTML = '';

        allNotes.forEach((notes, index) =>{
            const {title, time} = notes;
            const html = `
                <div class="note-item js-note-item">
                    <div class="title">
                        <h4>${title}</h4>
                        <span>${time}</span>
                    </div>
                    <button class="delete-button js-delete-button"><i class="fa-solid fa-trash"></i></button>
                </div>
                `;
            appendHTML += html;
        });
        // Add to HTML
        parentContainer.innerHTML = appendHTML;

		document.querySelectorAll('.js-delete-button').forEach((removeButton, index) => {
			removeButton.addEventListener('click', () => {
				allNotes.splice(index, 1);
				addHTML();
			});
		});
    
        // Save data to browser
	localStorage.setItem('Notes', JSON.stringify(allNotes));
}

// Add zero to time when its belowe 10
function addZero(zero){
    if(zero < 10){
        zero = '0' + zero;
    }

    return zero;
}

// -------Display the note on view container---------
// Variables
let allNotesEl = document.querySelectorAll('.js-note-item');
let parentViewContainer = document.querySelector('.view-container');

allNotesEl.forEach((noteItem) => {
    noteItem.addEventListener('click', () => {
        displayNote();
        // alert('clicked')
    });
});


function displayNote(){
    let appendHTML = '';

        allNotes.forEach((notes, index) =>{
            const {title, content} = notes;
            const html = `
            <div class="heading">
                <h3>${title}</h3>
                <button class="js-cancel-button cancel-button">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="text-container">
                <textarea class="js-view-note">${content}</textarea>
            </div>
            <div class="action-buttons">
                <button class="edit-button"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="trash-button js-trash-button"><i class="fa-solid fa-trash"></i></button>
            </div>
                `;
            appendHTML = html;
        });

        parentViewContainer.innerHTML = appendHTML;

		/*
        document.querySelector('.js-trash-button').forEach((removeButton, index) => {
			removeButton.addEventListener('click', () => {
				allNotes.splice(index, 1);
				addHTML();
			});
		});
        */
    
}
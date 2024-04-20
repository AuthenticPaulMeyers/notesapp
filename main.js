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
const notesCounterEl = document.querySelector('.count-all-notes');



if(!allNotes){
    allNotes = [];
}

let notesCounter = allNotes.length;

notesCounterEl.innerHTML = `(${notesCounter})`;


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
                <div class="note-item js-note-item" data-note-title="${title}">
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
let viewList = [];
let viewListHTML = '';
allNotesEl.forEach((noteItem) => {
    noteItem.addEventListener('click', () => {
        parentViewContainer.classList.add('active');
        const noteTitle = noteItem.dataset.noteTitle;

        //if the list container has an item, clear it and add another one
        if(viewList){
            viewList = [];
            viewList.unshift({
                noteTitle: noteTitle,
            });
        }
       
        viewList.forEach((note) => {
            const noteItemTitle = note.noteTitle;
        
            let matchingNote;
        
            allNotes.forEach((item) => {
                if(item.title === noteItemTitle){
                    matchingNote = item;
                }
            });
                    
        viewListHTML = `
            <div class="heading">
            <h3>${matchingNote.title}</h3>
            <span>${matchingNote.time}</span>
            <button class="js-cancel-btn cancel-button">
                <i class="fa-solid fa-xmark"></i>
            </button>
            </div>
            <div class="text-container">
                <textarea class="js-view-note">${matchingNote.content}</textarea>
            </div>
            <div class="action-buttons">
                <button class="trash-button js-trash-button"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
               
    });
        parentViewContainer.innerHTML = viewListHTML;

        document.querySelector('.js-cancel-btn').addEventListener('click', () => {
            parentViewContainer.classList.remove('active');
        }); 

        document.querySelectorAll('.js-trash-button').forEach((removeButton, index) => {
			removeButton.addEventListener('click', () => {
				allNotes.splice(index, 1);
				addHTML();
                parentViewContainer.classList.remove('active');

			});
		});

    });
        
});

// getting the list note from the list container



// HAMBURGER MENU

const menuBtn = document.querySelector('.js-hamburger-menu');
const nav = document.querySelector('.js-nav-list');
const icon = document.querySelector('.fa-bars');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('show-nav');
    if(icon.className === 'fa-solid fa-bars'){
        icon.className = 'fa-solid fa-xmark';
    }else{
        icon.className = 'fa-solid fa-bars';
    }
});


// -----------------search notes----------------
const searchInputEl = document.querySelector('.js-search-box');
const searchhValue = searchInputEl.value.toUpperCase();

// add eventlistener to the search box
searchInputEl.addEventListener('keyup', () =>{
    // Declare variables
  
});
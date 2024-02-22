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

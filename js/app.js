

(function addBtnClickHandler() {
    const userInputText = () => document.querySelector('.userInputText').value;
    const addButton = document.querySelector('.btn-add');
    addButton.addEventListener('click', (event) => {
        addNewPendingItem(userInputText());
        document.querySelector('.userInputText').value = null
        
    });
})();


// Add new pending item to pending list

function addNewPendingItem(label) {
    document.querySelector('.pending-items')
        .insertAdjacentHTML('afterbegin', newPendingItemHTML(label));
   
    // Add EventListeners to New Pending Items:
    let trashButton = document.querySelector('.pending-items>li>.btn-delete-item')
        trashButton.addEventListener('click', (event) => {
            removeCurrentTargetParentElement(event)
        });
    let checkBox = document.querySelector('.pending-items>li>.checkbox')
    checkBox.addEventListener('change', (event) => {
            if (checkBox.checked == true) {
                moveToCompleted(event)
            }
        })
    pendingNote();
    completedNote();
    
};




function newPendingItemHTML(label) {
    return `<li><input class="checkbox" type="checkbox" id="${label}">
<label class="pending">${label}</label><button class="btn btn-delete-item">
<i class="fa fa-trash-o" aria-hidden="true"></i></button></li>`
};

// Add new completed item to completed-list (move from pending-list)

function addNewCompletedItem(label) {
    document.querySelector('.completed-items')
        .insertAdjacentHTML('afterbegin', newCompletedItemHTML(label));

    // Add EventListeners to New Items:
    let trashButton = document.querySelector('.completed-items>li>.btn-delete-item')
        trashButton.addEventListener('click', (event) => {
            removeCurrentTargetParentElement(event);
        });
    let checkBox = document.querySelector('.completed-items>li>.checkbox')
    checkBox.addEventListener('change', (event) => {
             if (checkBox.checked == false) {
                moveToPending(event);
            };

        
    });
};


function newCompletedItemHTML(label) {
    return `<li><input class="checkbox" type="checkbox" id="${label}" checked>
<label class="completed">${label}</label><button class="btn btn-delete-item">
<i class="fa fa-trash-o" aria-hidden="true"></i></button></li>`
};

// TRASH BUTTON

(function deleteItemClickHandler() {
    const trashButtons = document.querySelectorAll('.btn-delete-item')
    trashButtons.forEach(element => element.addEventListener('click', (event) => {
        removeCurrentTargetParentElement(event);
    }));

})();


function removeCurrentTargetParentElement(event) {
    event.currentTarget.parentElement.remove() 
    pendingNote();
    completedNote();
};

// CLEAR ALL PENDING BUTTON

function removeAllPendingElements() {
    document.querySelectorAll('.pending').forEach(element => element.parentElement.remove());
    pendingNote();
    completedNote();
};

(function clearAllBtnClickHandler() {
    document.querySelector('.btn-clear-all-pending').addEventListener('click', (event) => {
        removeAllPendingElements();
        

    });
})();

// SHOW/HIDE COMPLETED BUTTON

(function showHideBtnClickHandler() {
    document.querySelector('.btn-show-hide-completed').addEventListener('click', (event) => {
        showHideCompletedItems();
    })
})();

function showHideCompletedItems() {
    document.querySelectorAll('.completed-items')
        .forEach(element => element.parentElement.classList.toggle("hidden"))
};


// MOVE TO COMPLETED - when checked in Pending-List

function moveToCompleted(event) {
    removeCurrentTargetParentElement(event)
    let label = event.currentTarget.parentElement.childNodes[2].textContent;
    addNewCompletedItem(label);
    pendingNote();
    completedNote();
};

// MOVE TO COMPLETED - when unchecked in Completed-List

function moveToPending(event) {
    removeCurrentTargetParentElement(event)
    let label = event.currentTarget.parentElement.childNodes[2].textContent;
    addNewPendingItem(label);
    pendingNote();
    completedNote();
};


// Refresh PENDING NOTE

function pendingNote() {
    const numberOfPendingItems = document.querySelectorAll('.pending').length;
    const pendingNote = `You have ${numberOfPendingItems} pending items`;
    document.querySelector('.pending-note').textContent = pendingNote;
}

// Refresh COMPLETED NOTE 

function completedNote() {
    const numberOfCompletedItems = document.querySelectorAll('.completed').length;
    const numberOfPendingItems = document.querySelectorAll('.pending').length;
    const percentage = 
    Math.round(numberOfCompletedItems/(numberOfCompletedItems + numberOfPendingItems)*100)
    const completedNote = () => {
        if (numberOfPendingItems < 1 && numberOfCompletedItems < 1) {
            return ''};
            return `Completed tasks: ${percentage}%`;
    }
    ;
    document.querySelector('.completed-note').textContent = completedNote();
};


// Show date.

const showDate = () => {

    const dayNames =  [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    
    const currentDate = new Date();
    const day = [
        currentDate.getMonth() + 1,
        currentDate.getDate(),
        currentDate.getFullYear(),

    ].map(num => num < 10 ? `0${num}` : num);

    document.querySelector('.day').textContent = dayNames[currentDate.getDay()];
    document.querySelector('.date').textContent = day.join('-');

    
};

showDate();

    


  

    
(function addButtonClickHandler() {
    document.querySelector('.btn-add').addEventListener('click', (event) => {
        addNewPendingItem();
        deleteItemClickHandler();
        // console.log(newPendingItemHTML(inputTextValue('input.text-input')));
        // console.log(document.querySelector('.pending-items'));
    });
})();

function addNewPendingItem() {
    document.querySelector('.pending-items')
    .insertAdjacentHTML('afterbegin', newPendingItemHTML(inputTextValue('input.text-input')));

};

function inputTextValue(inputSelector) {
    return document.querySelector(inputSelector).value;
};


function newPendingItemHTML(string) {
    return `<li><input class="checkbox" type="checkbox" id="${string}">
<label for="${string}"></label>${string}<button class="btn btn-delete-item">
<i class="fa fa-trash-o" aria-hidden="true"></i></button></li>`
};

function deleteItemClickHandler() {
    const trashButtons = document.querySelectorAll('.btn-delete-item')
        for ( let i = 0; i < trashButtons.length; i += 1 ) {
            trashButtons[i].addEventListener('click', (event) => {
                event.currentTarget.parentElement.remove();
            // console.log(event.currentTarget.parentElement);
        });
        
    };

};








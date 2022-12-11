const journals = [];
const RENDER_EVENT = 'render-journal';
const SAVED_EVENT = 'saved-journal';
const STORAGE_KEY = 'ADDJOURNAL';
 
function isStorageExist() {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

function saveData() {
    if (isStorageExist()) {
      const parsed = JSON.stringify(journals);
      localStorage.setItem(STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
    }
  }

  document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
  });

  function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
   
    if (data !== null) {
      for (const journal of data) {
        journals.push(journal);
      }
    }
   
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addJournal();
        Reset();
    });
    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

function Reset() {
    document.getElementById('form').reset();
}

function addJournal() {
    const titleJournal = document.getElementById('title').value;
    const authorJournal = document.getElementById('author').value;
    const linkJournal = document.getElementById('link').value;
   
    const generatedID = generateId();
    const journalObject = generateJournalObject(generatedID, titleJournal, authorJournal, linkJournal, false);
    journals.push(journalObject);
   
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

function generateId() {
    return +new Date();
  }
   
function generateJournalObject(id, title, author, link) {
    return {
      id,
      title,
      author,
      link
    }
  }

document.addEventListener(RENDER_EVENT, function () {

    const journalList = document.getElementById('list-journals')
    journalList.innerHTML = '';

    for (const journalItem of journals) {
        const journalElement = makeJournal (journalItem);
        if (journalItem != null) {
            journalList.append (journalElement)
        }
    }

  });

  function makeJournal(journalObject) {
    const textTitle = document.createElement('h3');
    textTitle.innerText = journalObject.title;
   
    const textAuthor = document.createElement('span');
    textAuthor.innerText = journalObject.author;

    const textLink = document.createElement('span');
    textLink.innerText = journalObject.link;
   
    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textAuthor, textLink);
   
    const container = document.createElement('div');
    container.classList.add('item');
    container.append(textContainer);
    container.setAttribute('id', `journal-${journalObject.id}`);
     
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');
     
        trashButton.addEventListener('click', function () {
          removeJournal(journalObject.id);
        });

        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');

        editButton.addEventListener('click', function() {
          editJournal(journalObject.id);
        });
       
        container.append(trashButton, editButton);

    return container;
  }

  function findJournal(journalId) {
    for (const journalItem of journals) {
      if (journalItem.id === journalId) {
        return journalItem;
      }
    }
    return null;
  }

  function removeJournal(journalId) {
    const journalTarget = findJournalIndex(journalId);

    if (journalTarget === -1) return;

    journals.splice(journalTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  function findJournalIndex(journalId) {
    for (const index in journals) {
      if (journals[index].id === journalId) {
        return index;
      }
    }
   
    return -1;
  }

  const inputSearchJournal = document.getElementById("searchJournalTitle");
  const formSearchJournal = document.getElementById("searchJournal");

  inputSearchJournal.addEventListener("keyup", (e) => {
    e.preventDefault();
    searchJournal();
  });

  formSearchJournal.addEventListener("submit", (e) => {
    e.preventDefault();
    searchJournal();
 }); 

  function searchJournal() {
    const inputSearchValue = document.getElementById("searchJournalTitle").value.toLowerCase();
    const listJournal = document.getElementById("list-journals");
    listJournal.innerHTML = "";
 
    if (inputSearchValue == "") {
       document.dispatchEvent(new Event(RENDER_EVENT));
       return;
    }
 
    for (const journal of journals) {
       if (journal.title.toLowerCase().includes(inputSearchValue)) {
            let el =`
            <div class="item" id="journal-${journal.id}">
            <div class="inner">
            <h3>${journal.title}</h3>
            <span>${journal.author}</span>
            <span>${journal.link}</span>
            </div>   
            <button class="trash-button" onclick="removeJournal(${journal.id})"></button>
            <button class="edit-button" onclick="editJournal(${journal.id})"></button>
            </div>
            `;
 
             listJournal.innerHTML += el;
          }
       }
    }

 function editJournal(journalId) {
  const sectionEdit = document.querySelector(".input_edit_section");
  sectionEdit.style.display = "flex";
  const editTitle = document.getElementById("inputEditTitle");
  const editAuthor = document.getElementById("inputEditAuthor");
  const editLink = document.getElementById("inputEditLink");
  const formEditData = document.getElementById("editData");
  const cancelEdit = document.getElementById("journalEditCancel");
  const SubmitEdit = document.getElementById("journalEditSubmit");

  journalTarget = findJournalIndex(journalId);

  editTitle.setAttribute("value", journals[journalTarget].title);
  editAuthor.setAttribute("value", journals[journalTarget].author);
  editLink.setAttribute("value", journals[journalTarget].link);

  SubmitEdit.addEventListener("click", (e) => {
     journals[journalTarget].title = editTitle.value;
     journals[journalTarget].author = editAuthor.value;
     journals[journalTarget].link = editLink.value;

     document.dispatchEvent(new Event(RENDER_EVENT));
     saveData();
     formEditData.reset();
     sectionEdit.style.display = "none";
     alert('Data Berhasil Di Edit');
  });

  cancelEdit.addEventListener("click", (e) => {
     e.preventDefault();
     sectionEdit.style.display = "none";
     formEditData.reset();
  });
}
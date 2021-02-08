//for add button
(function () {
  var removeSuccess;

  removeSuccess = function () {
    return $(".button").removeClass("success");
  };

  $(document).ready(function () {
    return $(".button").click(function () {
      $(this).addClass("success");
      return setTimeout(removeSuccess, 3000);
    });
  });
}.call(this));

// note styling
const addBtn = document.querySelector("#add-btn");
const addNewNote = (text = "") => {
  // debugger;
  const notes = document.querySelector(".notes");
  const note = document.createElement("div");
  note.classList.add("note");
  const noteData = `
  <div class="note-icons-div">
  <div class="note-icons">
  <i class="fas fa-edit"></i>
  <i class="fas fa-trash"></i>
  </div>
  </div>
  <div class="main ${text ? "" : "hidden"}"></div>
  <textarea name="text" id="text" class="${text ? "hidden" : ""}"></textarea>
  `;

  note.insertAdjacentHTML("afterbegin", noteData);
  notes.appendChild(note);

  //getting reference
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector("#text");
  const editBtn = note.querySelector(".fa-edit");
  const delBtn = note.querySelector(".fa-trash");

  // editing note
  editBtn.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.value = text;
  mainDiv.innerHTML = text;
  //to write in textArea
  textArea.addEventListener("change", (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;

    updateLSData();
  });

  //remove note
  delBtn.addEventListener("click", () => {
    note.remove();
    updateLSData();
  });
};

addBtn.addEventListener("click", () => addNewNote());

//To save note in local browser
//so that it won't vanishes after refreshes
const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  //console.log(textAreaData);
  const notes = [];
  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });
  //console.log(notes);

  //now to add in local storage
  //we can add in local storage only in string format
  localStorage.setItem("notes", JSON.stringify(notes));
};
//now for get the element from local storage
//to get the values of string first convert it to a object/array
//console.log(localStorage.getItem("notes")); - show the value in string format
const notes = JSON.parse(localStorage.getItem("notes"));
// console.log(notes);
if (notes) {
  notes.forEach((note) => addNewNote(note));
}

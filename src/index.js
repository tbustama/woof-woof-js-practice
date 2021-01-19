document.addEventListener("DOMContentLoaded", () => {
  fetchAllPups();
});

function fetchAllPups() {
  fetch("http://localhost:3000/pups")
    .then((resp) => resp.json())
    .then((object) => displayPupNames(object));
}

function displayPupNames(pups) {
  for (pup of pups) {
    const dogSpan = document.createElement("span");
    dogSpan.id = pup.id;
    dogSpan.innerText = pup.name;
    const dogBar = document.getElementById("dog-bar");
    dogSpan.addEventListener("click", addDogInfo);
    dogBar.appendChild(dogSpan);
  }
}

function addDogInfo(event) {
  fetch(`http://localhost:3000/pups/${event.target.id}`)
    .then((resp) => resp.json())
    .then((object) => {
      const dogDiv = document.getElementById("dog-info");
      dogDiv.innerHTML = "";
      const dogName = document.createElement("h2");
      dogName.innerText = object.name;
      const dogImage = document.createElement("img");
      dogImage.src = object.image;
      let dogButton = document.createElement("button");
      dogButton.id = object.id;
      dogButton.class = object.isGoodDog;
      dogButtonText(dogButton, object);
      dogButton.addEventListener("click", toggleGoodDog);
      dogDiv.appendChild(dogName);
      dogDiv.appendChild(dogImage);
      dogDiv.appendChild(dogButton);
    });
}

function dogButtonText(button, pup) {
  pup.isGoodDog === true
    ? (button.innerText = "Good Dog!")
    : (button.innerText = "Bad Dog!");
}

function toggleGoodDog(event) {
  fetch(`http://localhost:3000/pups/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      isGoodDog: !event.target.class,
    }),
  });
  setTimeout(() => {
    addDogInfo(event);
  }, 10);
}

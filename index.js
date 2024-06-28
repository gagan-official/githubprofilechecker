let data;

const usernameInput = document.querySelector("#githubUsernameValue");

let inputValue = "";
usernameInput.addEventListener("input", function (e) {
  inputValue = e.target.value;
});

// ----- UI updating function: -----
const updateUI = function (status) {
  const innerChildren = `
            <img src=${data?.avatar_url} alt="" />
            <span id="name"><strong>${
              data?.name ?? "Not Provided"
            }</strong></span>
            <span id="username">@${data?.login}</span>
            <span id="bio">${data?.bio ?? "Not Provided"}</span>
            <span id="followers"><strong>Followers:</strong> ${
              data?.followers
            } &#x2022; <strong>Following:</strong> ${data?.following}</span>
        `;

  let card = document.querySelector(".card.single");

  if (!card) {
    card = document.createElement("a");
    card.setAttribute("class", "card single");
    card.setAttribute("target", "blank");
    document.body.appendChild(card);
  }
  
  let loader = document.querySelector(".loader");
  
  card.innerHTML = data ? innerChildren : "";
  card.setAttribute("href", data?.html_url);
  card.setAttribute("title", `Go to ${data?.login}'s github profile`);

  if (!data && !loader) {
    loader = document.createElement("div");
    loader.setAttribute("class", "loader");
    card.appendChild(loader);
  }
  if (status === 404) {
    card.innerHTML = "<h4 class='wrongMsg'>Sorry! Wrong Username.</h4>";
    // card.removeAttribute("href");
    // card.removeAttribute("target");
    // card.removeAttribute("title");
  }
  if (inputValue === "") {
    card.innerHTML =
      "<h4 class='wrongMsg'>Dude! You have to write something there🙄</h4>";
    // card.setAttribute("href", "");
    // card.setAttribute("target", "");
    // card.setAttribute("title", "");
  }
  // Didn't included removeChild() method as innerHTML is already overwriting 'innerChildren' once data is loaded. ~by Gagandeep Singh
};

// ----- onreadystatechange function passing: -----
const handleReadyState = function () {
  console.log(this.readyState, this.status);
  if (this.readyState === 4 && this.status === 200) {
    data = JSON.parse(this.responseText);
  }
  updateUI(this.status);
};

// ----- Button click event function: -----
function handleBtnClick(e) {
  e.preventDefault();
  const url1 = `https://api.github.com/users/${inputValue}`;
  const xhr1 = new XMLHttpRequest();
  xhr1.open("GET", url1);
  xhr1.onreadystatechange = handleReadyState;
  xhr1.send();

  data = null;
  updateUI();
}

// ----- Button click eventlistener: -----
document
  .querySelector(".inputBtnCont")
  .addEventListener("submit", handleBtnClick);
document
  .querySelector("#githubUsernameValue")
  .addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleBtnClick(e);
  });

// const url = "https://api.github.com/users/hiteshchoudhary"

// const xhr = new XMLHttpRequest();
// xhr.open('GET', url);
// xhr.send();
// xhr.onreadystatechange = () => {
//     console.log(this.readyState);
//     if(this.readyState === 4) console.log(JSON.parse(this.responseText));
// }

//   let jj = {
//     fname: "gagandeep",
//     lname: "singh",
//     fullName: function () {
//       return this.fname + " " + this.lname;
//     },
//   };
//   const ho = function(fun) {
//     console.log(this)
//     if (fun) { return fun() };
//   }
//   console.log(ho(function(){return jj.fullName()}));

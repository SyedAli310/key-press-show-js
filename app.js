console.log("Js Connected!");
const output = document.getElementById("output");
let globalKeep = [];

let alphabet = "abcdefghijklmnopqrstuvwxyz";
let letterArray = alphabet.split("");
letterArray.push(" ");

let x = null;
const printArrayToScreen = (arr) => {
  if (typeof arr === "object") {
    output.innerHTML = arr.join("");
  } else {
    if (arr === " ") {
      output.innerHTML += `<span class='key-el'>Space</span>`;
    } else {
      output.innerHTML += `<span class='key-el'>${arr}</span>`;
    }
  }
  if (x) {
    clearTimeout(x);
  }
  x = setTimeout(() => {
    output.innerHTML = "";
  }, 2000);
};

document.onkeydown = function (e) {
  return false;
};
document.addEventListener("keydown", (e) => {
  //console.log(e.key);
  globalKeep.push(e.key);
  printArrayToScreen(e.key);
  if (globalKeep.length > 10) {
    output.innerHTML = "";
    globalKeep = [];
    printArrayToScreen(e.key);
  }
});

// light-dark mode handlers

// function to switch dark mode
function switchToDarkMode() {
  $(":root").css("--BG_MAIN", "#001b1b");
  $(":root").css("--FG_MAIN", "#1b1b1b");
  $(":root").css("--WHITE", "#fff");
  $(":root").css("--BLACK", "#000");
}

// function to switch light mode
function switchToLightMode() {
  $(":root").css("--BG_MAIN", "#c0bbbb");
  $(":root").css("--FG_MAIN", "royalblue");
  $(":root").css("--WHITE", "#000");
  $(":root").css("--BLACK", "#fff");
}

// function to set switch(button) content
function setSwitchText() {
  $("#color-mode-switch").html(`
      ${
        $("#color-mode-switch").attr("mode").toUpperCase() === "DARK"
          ? "<ion-icon name='sunny-outline'></ion-icon>"
          : "<ion-icon name='moon-outline'></ion-icon>"
      }
      `);
}

// function to check and apply saved mode preference from local storage
function checkColorMode() {
  const fetchedMode = localStorage.getItem("colorMode");
  if (fetchedMode) {
    if (fetchedMode === "dark") {
      $("#color-mode-switch").attr("mode", "dark");
      // console.log('setting dark mode');
      switchToDarkMode();
      setSwitchText();
    } else if (fetchedMode === "light") {
      $("#color-mode-switch").attr("mode", "light");
      // console.log('setting light mode');
      switchToLightMode();
      setSwitchText();
    }
  } else {
    return;
  }
}

// checking for saved mode in local storage on page load
window.onload = setSwitchText();
window.onload = checkColorMode();

// light-dark mode switcher
$("#color-mode-switch").click(() => {
  if ($("#color-mode-switch").attr("mode") == "light") {
    $("#color-mode-switch").attr("mode", "dark");
    switchToDarkMode();
    setSwitchText();
    localStorage.setItem("colorMode", "dark");
  } else if ($("#color-mode-switch").attr("mode") == "dark") {
    $("#color-mode-switch").attr("mode", "light");
    switchToLightMode();
    setSwitchText();
    localStorage.setItem("colorMode", "light");
  }
});

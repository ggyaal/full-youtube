const profile = document.getElementById("headerProfile");
const menubar = document.querySelector(".profile-menu");

const HIDDEN = "hidden";

const isMenuClick = ({ toElement }) => {
  if (
    !toElement.offsetParent.classList.value.split().includes("profile-menu") &&
    !menubar.classList.value.split().includes(HIDDEN)
  ) {
    menubar.classList.add(HIDDEN);
    document.body.removeEventListener("click", isMenuClick);
  }
};

const handleProfileMenu = () => {
  document.body.removeEventListener("click", isMenuClick);
  menubar.classList.toggle(HIDDEN);
  if (!menubar.classList.value.split().includes(HIDDEN)) {
    timeoutId = setTimeout(
      () => document.body.addEventListener("click", isMenuClick),
      100
    );
  }
};

function init() {
  profile.addEventListener("click", handleProfileMenu);
}

init();

const avatarFile = document.getElementById("avatarFile");
const avatarContainer = document.getElementById("editAvatarContainer");

let avatarImg = document.getElementById("editAvatar");

const changeHandler = ({ target }) => {
  if (target.files && target.files[0]) {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!avatarImg) {
        avatarImg = document.createElement("img");
        avatarContainer.innerHTML = "";
        avatarContainer.appendChild(avatarImg);
      }
      avatarImg.src = e.target.result;
    };
    reader.readAsDataURL(target.files[0]);
  }
};

function init() {
  avatarFile.addEventListener("change", changeHandler);
}

init();

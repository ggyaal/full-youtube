const preview = document.getElementById("previewVideo");
const videoFile = document.getElementById("videoFile");

function changeHandler() {
  console.log("Oh! change it!!!");
  // ffmpge의 활약이 필요할 듯 싶습니다.
}

function init() {
  videoFile.addEventListener("change", changeHandler);
}

init();

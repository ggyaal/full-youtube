import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const preview = document.getElementById("previewVideo");
const videoFile = document.getElementById("videoFile");

function changeHandler({ target }) {
  console.log("Oh! change it!!!");
  // ffmpeg의 활약이 필요할 듯 싶습니다.
  const reader = new FileReader();

  reader.onload = async (e) => {
    preview.src = e.target.result;
    preview.load();
    const fileExtention = target.files[0].name.split(".")[1];
    const ffmpegFile = `video.${fileExtention}`;

    const ffmpeg = createFFmpeg({
      log: true,
      corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
    });
    await ffmpeg.load();

    ffmpeg.FS("writeFile", ffmpegFile, await fetchFile(e.target.result));

    await ffmpeg.run(
      "-i",
      ffmpegFile,
      "-ss",
      "00:00:01",
      "-frames:v",
      "1",
      "thumb.jpg"
    );

    const thumbFile = ffmpeg.FS("readFile", "thumb.jpg");

    const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });
    const thumbUrl = URL.createObjectURL(thumbBlob);
    // 썸네일 blob -> controls 만든 후에 썸네일 선택 만들기
  };
  reader.readAsDataURL(target.files[0]);
}

function init() {
  videoFile.addEventListener("change", changeHandler);
}

init();

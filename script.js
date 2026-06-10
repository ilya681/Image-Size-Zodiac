const img1Small = document.querySelector(".img1Small");
const img2Big = document.querySelector(".img2Big");
const range = document.querySelector(".range");
const valueRange = document.querySelector(".value-range");
const chooseFile = document.querySelector(".choose-file");
const number = document.querySelector(".number");
const Show = document.querySelector(".Show");
const width = document.querySelector(".width");
const height = document.querySelector(".height");
const KB = document.querySelector(".KB");
const B = document.querySelector(".B");
const Newwidth = document.querySelector(".Newwidth");
const Newheight = document.querySelector(".Newheight");
const NewKB = document.querySelector(".NewKB");
const NewB = document.querySelector(".NewB");
const save = document.querySelector(".SAVE");
const divChoose = document.querySelector(".div-Chooser");
const hamburger = document.querySelector(".hamburger");
const cloes = document.querySelector(".cloes");
const FormatChooser = document.querySelector(".FormatChooser");
const ulChooser = document.querySelector(".ulChooser");
const liChooser = document.querySelectorAll(".liChooser");
const FormatChooser_P = document.querySelector(".FormatChooser p");
let value = 50;
let currentBlob = null;
let isclicked_FormatChooser = false;
let format = "webp";
range.value = value;
valueRange.innerText = `${value}%`;
img2Big.style.clipPath = `inset(0 50% 0 0)`;
img1Small.style.clipPath = `inset(0 0 0 50%)`;
range.addEventListener("input", (event) => {
  value = event.target.value;
  Reload();
});
range.addEventListener("click", (event) => {
  value = event.target.value;
  Reload();
});
function Reload() {
  if (value == 50) {
    img2Big.style.clipPath = `inset(0 50% 0 0)`;
    img1Small.style.clipPath = `inset(0 0 0 50%)`;
  } else if (value < 50) {
    img2Big.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
    img1Small.style.clipPath = `inset(0 0 0 ${value}%)`;
  } else if (value > 50) {
    img2Big.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
    img1Small.style.clipPath = `inset(0 0 0 ${value}%)`;
  }
  valueRange.innerHTML = "";
  valueRange.innerText = `${value}%`;
}

chooseFile.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  Newwidth.innerHTML = "";
  Newheight.innerHTML = "";
  NewKB.innerHTML = "";
  NewB.innerHTML = "";
  number.value = "";
  FormatChooser_P.innerHTML = "";
  FormatChooser_P.innerText = "Chooser Format";

  const originalSizeKB = (file.size / 1024).toFixed(2);
  KB.innerText = `KB => ${originalSizeKB}`;
  B.innerText = `B => ${file.size}`;

  const url = URL.createObjectURL(file);
  img2Big.src = url;
  img1Small.src = url;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      originalImg = img;

      // document.querySelector(".div-img").style.width = `${img.width}px`;
      // document.querySelector(".div-img").style.height = `${img.height}px`;
      // document.querySelector(".div-x").style.width = `${img.width}px`;
      // document.querySelector(".div-x").style.height = `${img.height}px`;
      width.innerText = `Width => ${img.width}px`;
      height.innerText = `Height => ${img.height}px`;
      // اطلاعات ارتفاع و عرض اصلی را هم پاک نکنید
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

Show.addEventListener("click", () => {
  Resolutioan(format);
});
number.addEventListener("click", () => {
  Resolutioan(format);
});

liChooser.forEach((element) => {
  element.addEventListener("click", (event) => {
    console.log(event.target.innerText);
    FormatChooser_P.innerHTML = "";
    FormatChooser_P.innerText = event.target.innerText;
    format = event.target.innerText;
    Resolutioan(format);
  });
});

function Resolutioan(Format) {
  let newWidth = parseFloat(number.value);
  if (isNaN(newWidth) || newWidth <= 0) {
    return;
  }

  const originalWidth = originalImg.width;
  const originalHeight = originalImg.height;
  const newHeight = (originalHeight / originalWidth) * newWidth;

  const canvas = document.createElement("canvas");
  canvas.width = newWidth;
  canvas.height = newHeight;

  Newwidth.innerText = `New Width => ${Math.round(newWidth)}px`;
  Newheight.innerText = `New Height => ${Math.round(newHeight)}px`;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(originalImg, 0, 0, newWidth, newHeight);

  canvas.toBlob(
    (blob) => {
      if (blob) {
        currentBlob = blob;
        const sizeKB = (blob.size / 1024).toFixed(2);
        NewKB.innerText = `KB => ${sizeKB}`;
        NewB.innerText = `B => ${blob.size}`;
        const url = URL.createObjectURL(blob);
        img1Small.src = url;
        img1Small.onload = () => URL.revokeObjectURL(url);
      }
    },
    `image/${Format}`,
    `.75`,
  );
}

save.addEventListener("click", () => {
  const today = new Date();

  if (!currentBlob) {
    alert(
      "هیچ تصویر بهینه‌ای برای ذخیره وجود ندارد. لطفاً ابتدا تصویر را تغییر اندازه دهید.",
    );
    return;
  }
  const url = URL.createObjectURL(currentBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Zodiac  ${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});

hamburger.addEventListener("click", () => {
  divChoose.style.left = "0%";
});

cloes.addEventListener("click", () => {
  divChoose.style.left = "-100%";
});

FormatChooser.addEventListener("click", () => {
  if (!isclicked_FormatChooser) {
    ulChooser.style.zIndex = "10";
    ulChooser.style.opacity = "1";
    FormatChooser.style.borderBottomLeftRadius = "0px";

    isclicked_FormatChooser = true;
  } else {
    FormatChooser.style.borderBottomLeftRadius = "10px";
    ulChooser.style.zIndex = "-10";
    ulChooser.style.opacity = "0";
    isclicked_FormatChooser = false;
  }
});

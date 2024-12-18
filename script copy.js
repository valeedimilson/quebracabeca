const table = document.querySelector(".table");
const inputImg = document.querySelector("#inputImg");
const btLoadImg = document.querySelector("#btLoadImg");

const MAX_QD = 3;

function reDrawImgs(img) {
  const qdImgX = img.width / MAX_QD;
  const qdImgY = img.height / MAX_QD;

  const qds = document.querySelectorAll(".qd");

  qds.forEach((qd, index) => {
    qd.style.backgroundPosition = `-${qdImgX * qd.x}px -${qdImgY * qd.y}px`;

    if (index == MAX_QD * MAX_QD - 1) {
      return;
    }

    qd.style.backgroundImage = `url('${img.src}')`;
    qd.image = img.src;
  });
}

function loadImg() {
  const txt = btLoadImg.textContent;
  btLoadImg.textContent = "Carregando imagem...aguarde.";
  // console.log(inputImg.value);

  const img = document.createElement("img");
  img.src = inputImg.value;

  img.addEventListener("load", function () {
    btLoadImg.textContent = txt;
    // console.log(this.width);
    // console.log(this.height);

    reDrawImgs(this);
  });
}

function moveQd(x, y, obj) {
  // console.log(x + "\n" + y + "\n" + value);

  const directions = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ]; // left, right, up, bottom

  directions.forEach((direction) => {
    const qd = document.querySelector(`#qd${direction[0]}${direction[1]}`);
    if (qd) {
      if (qd.textContent == "") {
        qd.textContent = obj.textContent;
        obj.textContent = "";

        [obj.style.backgroundPosition, qd.style.backgroundPosition] = [
          qd.style.backgroundPosition,
          obj.style.backgroundPosition,
        ];
        qd.style.backgroundImage = "";
        obj.style.backgroundImage = qd.image;

        console.log(`obj: ${obj.style.backgroundPosition}`);
        console.log(`qd: ${qd.style.backgroundPosition}`);
        return;
      }
    }
  });
}

for (let x = 0; x < MAX_QD; x++) {
  const line = document.createElement("div");
  table.appendChild(line);

  for (let y = 0; y < MAX_QD; y++) {
    const qd = document.createElement("div");
    qd.className = "qd";
    qd.id = `qd${x}${y}`;
    qd.y = y;
    qd.x = x;

    qd.addEventListener("click", function () {
      moveQd(x, y, this);
    });
    line.appendChild(qd);
    if (table.querySelectorAll(".qd").length == MAX_QD * MAX_QD) {
      break;
    }
    qd.innerHTML = `${x}${y}`;
  }
}

btLoadImg.addEventListener("click", loadImg);

const inputImg = "https://picsum.photos/300/300.jpg";
const btLoadImg = document.querySelector("#btLoadImg");
const table = document.querySelector(".table");

const MAX_QD_HORIZONTAL = 3;
const MAX_QD_VERTICAL = 3;

const TOTAL_QD = MAX_QD_HORIZONTAL * MAX_QD_VERTICAL;
let cliques = 0;

const drawTable = () => {
  const sequence = [];
  for (let y = 0; y < MAX_QD_VERTICAL; y++) {
    const linha = document.createElement("div");
    linha.className = "linha";
    table.appendChild(linha);
    for (let x = 0; x < MAX_QD_HORIZONTAL; x++) {
      const qd = document.createElement("div");
      qd.className = "qd";

      sequence.push([`${-(100 * x)}px`, `${-(100 * y)}px`]);
      qd.id = `qd${y}${x}`;
      qd.backgroundImage = `url('${inputImg}')`;
      qd.empty = false;
      qd.x = x;
      qd.y = y;
      qd.addEventListener("click", function () {
        moveQd(this);
      });
      linha.appendChild(qd);
      // qd.textContent = `${y}${x}`;
      qd.style.backgroundImage = `url('${inputImg}')`;
      if (x == MAX_QD_HORIZONTAL - 1 && y == MAX_QD_VERTICAL - 1) {
        qd.empty = true;
        qd.style.backgroundImage = "";
      }
    }
  }

  const newSequence = sequence.sort((a, b) => 0.5 - Math.random());

  const qds = document.querySelectorAll(".qd");

  qds.forEach((qd, index) => {
    qd.style.backgroundPosition =
      newSequence[index][0] + " " + newSequence[index][1];
  });
};
drawTable();

function moveQd(qdActual) {
  console.log(`y:${qdActual.y} | x:${qdActual.x}`);
  directions = [
    [qdActual.y, qdActual.x - 1],
    [qdActual.y, qdActual.x + 1],
    [qdActual.y - 1, qdActual.x],
    [qdActual.y + 1, qdActual.x],
  ]; // left, right, up, down

  directions.forEach((direction) => {
    const qd = document.querySelector(`#qd${direction[0]}${direction[1]}`);
    if (!qd) {
      return;
    }
    if (qd.empty == true) {
      qd.style.backgroundImage = qdActual.backgroundImage;
      qdActual.style.backgroundImage = "";
      [qd.style.backgroundPosition, qdActual.style.backgroundPosition] = [
        qdActual.style.backgroundPosition,
        qd.style.backgroundPosition,
      ];
      qd.empty = false;
      qdActual.empty = true;
    }
  });

  cliques++;
  document.querySelector("#cliques").textContent = cliques;
}

function mostraDica() {
  document.querySelector(".table").classList.toggle("hidden");
  document.querySelector(".img-preview").classList.toggle("hidden");
}

document.querySelector("#btDica").addEventListener("click", mostraDica);

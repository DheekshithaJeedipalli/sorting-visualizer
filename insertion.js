let arr = [5,3,8,4,2];
let steps = [];
let current = 0;

document.addEventListener("DOMContentLoaded", () => {
  render({array: arr, key:-1, compare:-1});
});

function setArray() {
  let input = document.getElementById("userInput").value;
  arr = input.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x));
  render({array: arr, key:-1, compare:-1});
}

function render(state) {
  let container = document.getElementById("array");
  container.innerHTML = "";

  state.array.forEach((val, idx) => {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = val * 10 + "px";

    // show number
    bar.innerText = val;
    bar.style.display = "flex";
    bar.style.alignItems = "flex-end";
    bar.style.justifyContent = "center";

    if (idx === state.key) {
      bar.style.background = "red"; // key
    }

    if (idx === state.compare) {
      bar.style.background = "yellow"; // comparing
    }

    container.appendChild(bar);
  });
}

function start() {
  steps = [];
  current = 0;

  let a = [...arr];

  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;

    steps.push({
      array: [...a],
      keyIndex: i,
      compare: j,
      text: `🔑 Key = ${key}`
    });

    while (j >= 0 && a[j] > key) {

      steps.push({
        array: [...a],
        keyIndex: i,
        compare: j,
        text: `🟡 Comparing ${a[j]} > ${key}`
      });

      a[j+1] = a[j];

      steps.push({
        array: [...a],
        keyIndex: j,
        compare: j,
        text: `➡️ Shifting ${a[j]} right`
      });

      j--;
    }

    a[j+1] = key;

    steps.push({
      array: [...a],
      keyIndex: j+1,
      compare: -1,
      text: `🟢 Insert ${key} at correct position`
    });
  }

  if (steps.length > 0) {
    showStep(0);
    current = 1;
  }
}

function showStep(index) {
  let step = steps[index];

  render({
    array: step.array,
    key: step.keyIndex,
    compare: step.compare
  });

  document.getElementById("explain").innerText = step.text;
  document.getElementById("stepBox").innerText = step.text;
}

function nextStep() {
  if (steps.length === 0) {
    alert("Click Start first!");
    return;
  }

  if (current < steps.length) {
    showStep(current);
    current++;
  }
}

function prevStep() {
  if (current > 0) {
    current--;
    showStep(current);
  }
}
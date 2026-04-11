let arr = [5,3,8,4,2];
let steps = [];
let current = 0;

document.addEventListener("DOMContentLoaded", () => {
  render({array: arr, i:-1, j:-1, min:-1, swapped:false});
});

function setArray() {
  let input = document.getElementById("userInput").value;
  arr = input.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x));
  render({array: arr, i:-1, j:-1, min:-1, swapped:false});
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

    // highlight current index
    if (idx === state.i) {
      bar.style.background = "yellow";
    }

    // highlight current min
    if (idx === state.min) {
      bar.style.background = "orange";
    }

    // swap
    if (state.swapped && (idx === state.i || idx === state.min)) {
      bar.style.background = "red";
    }

    container.appendChild(bar);
  });
}

function start() {
  steps = [];
  current = 0;

  let a = [...arr];

  for (let i = 0; i < a.length; i++) {
    let min = i;

    for (let j = i + 1; j < a.length; j++) {

      // comparing
      steps.push({
        array: [...a],
        i: j,
        min: min,
        swapped: false,
        text: `🟡 Comparing ${a[j]} with current min ${a[min]}`
      });

      if (a[j] < a[min]) {
        min = j;

        steps.push({
          array: [...a],
          i: j,
          min: min,
          swapped: false,
          text: `🟠 New minimum found: ${a[min]}`
        });
      }
    }

    if (min !== i) {
      let temp = a[i];
      a[i] = a[min];
      a[min] = temp;

      steps.push({
        array: [...a],
        i: i,
        min: min,
        swapped: true,
        text: `🔴 Swapping ${a[min]} and ${a[i]}`
      });
    }
  }

  // show first step immediately
  if (steps.length > 0) {
    render(steps[0]);
    document.getElementById("explain").innerText = steps[0].text;
    document.getElementById("stepBox").innerText = steps[0].text;
    current = 1;
  }
}

function nextStep() {
  if (current < steps.length) {
    let step = steps[current];
    render(step);

    document.getElementById("explain").innerText = step.text;
    document.getElementById("stepBox").innerText = step.text;

    current++;
  }
}

function prevStep() {
  if (current > 0) {
    current--;
    let step = steps[current];

    render(step);

    document.getElementById("explain").innerText = step.text;
    document.getElementById("stepBox").innerText = step.text;
  }
}
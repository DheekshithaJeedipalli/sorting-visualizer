let arr = [5,3,8,4,2];
let steps = [];
let current = 0;

document.addEventListener("DOMContentLoaded", () => {
  render({array: arr, i:-1, j:-1, swapped:false, sortedFrom: arr.length});
});

function setArray() {
  let input = document.getElementById("userInput").value;
  arr = input.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x));
  render({array: arr, i:-1, j:-1, swapped:false, sortedFrom: arr.length});
}

function render(state) {
  let container = document.getElementById("array");
  container.innerHTML = "";

  state.array.forEach((val, idx) => {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = val * 20 + "px";
    bar.innerText = val;

    if (idx === state.i || idx === state.j) {
      bar.classList.add("compare");
    }

    if (state.swapped && (idx === state.i || idx === state.j)) {
      bar.classList.remove("compare");
      bar.classList.add("swap");
    }

    if (idx >= state.sortedFrom) {
      bar.classList.remove("compare");
      bar.classList.remove("swap");
      bar.classList.add("sorted");
    }

    container.appendChild(bar);
  });
}

function start() {
  steps = [];
  current = 0;

  let a = [...arr];

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {

      let val1 = a[j];
      let val2 = a[j+1];

      // comparison step
      steps.push({
        array: [...a],
        i: j,
        j: j+1,
        val1: val1,
        val2: val2,
        swapped: false,
        sortedFrom: a.length - i
      });

      if (a[j] > a[j+1]) {
        [a[j], a[j+1]] = [a[j+1], a[j]];

        // swap step
        steps.push({
          array: [...a],
          i: j,
          j: j+1,
          val1: val1,
          val2: val2,
          swapped: true,
          sortedFrom: a.length - i
        });
      }
    }
  }

  // show first step immediately
  if (steps.length > 0) {
    showStep(0);
    current = 1;
  }
}

function showStep(index) {
  let step = steps[index];

  render(step);

  let text = step.swapped
    ? `🔴 Swapping ${step.val1} and ${step.val2}`
    : `🟡 Comparing ${step.val1} and ${step.val2}`;

  document.getElementById("stepBox").innerText = text;
  document.getElementById("explain").innerText = text;
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
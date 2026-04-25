// 🔵 Default array
let defaultArr = [5,3,8,4,2];

// 🟢 Working array
let arr = [...defaultArr];

let steps = [];
let current = 0;
let swapCount = 0;
let interval;


// Initial render
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("userInput").value = defaultArr.join(",");

  render({
    array: arr,
    i:-1,
    j:-1,
    minIndex:-1,
    swapped:false,
    sortedUpto: -1
  });
});


// 🔵 Use default
function useDefault() {
  arr = [...defaultArr];
  steps = [];
  current = 0;
  swapCount = 0;

  document.getElementById("userInput").value = defaultArr.join(",");
  document.getElementById("swapCount").innerText = "0 swaps";

  render({
    array: arr,
    i:-1,
    j:-1,
    minIndex:-1,
    swapped:false,
    sortedUpto: -1
  });

  document.getElementById("stepBox").innerText = "Using default example";
  document.getElementById("explain").innerText = "Default input loaded";
}


// 🟢 User input
function setArray() {
  let input = document.getElementById("userInput").value;

  if (!input) {
    alert("Enter numbers!");
    return;
  }

  arr = input
    .split(/[\s,]+/)
    .map(x => parseInt(x.trim()))
    .filter(x => !isNaN(x));

  if (arr.length < 2) {
    alert("Enter at least 2 numbers!");
    return;
  }

  steps = [];
  current = 0;
  swapCount = 0;

  document.getElementById("swapCount").innerText = "0 swaps";

  render({
    array: arr,
    i:-1,
    j:-1,
    minIndex:-1,
    swapped:false,
    sortedUpto: -1
  });

  document.getElementById("stepBox").innerText = "Using custom input";
}


// 🎨 Render bars
function render(state) {
  let container = document.getElementById("array");
  container.innerHTML = "";

  state.array.forEach((val, idx) => {
    let bar = document.createElement("div");
    bar.classList.add("bar");

    bar.style.height = val * 20 + "px";
    bar.innerText = val;

    if (idx === state.j) {
      bar.classList.add("compare");
    }

    if (idx === state.minIndex) {
      bar.style.background = "orange";
    }

    if (state.swapped && idx === state.i) {
      bar.classList.add("swap");
    }

    if (idx <= state.sortedUpto) {
      bar.classList.add("sorted");
    }

    container.appendChild(bar);
  });
}


// ▶ Start Selection Sort
function start() {

  let input = document.getElementById("userInput").value;

  if (input) {
    arr = input
      .split(/[\s,]+/)
      .map(x => parseInt(x.trim()))
      .filter(x => !isNaN(x));
  }

  if (arr.length < 2) {
    alert("Enter at least 2 numbers!");
    return;
  }

  steps = [];
  current = 0;
  swapCount = 0;

  document.getElementById("swapCount").innerText = "0 swaps";

  let a = [...arr];

  for (let i = 0; i < a.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < a.length; j++) {

      steps.push({
        array: [...a],
        i,
        j,
        minIndex,
        swapped:false,
        sortedUpto: i - 1,
        swapCount: swapCount,
        text: `🟡 Comparing ${a[j]} with current min ${a[minIndex]}`
      });

      if (a[j] < a[minIndex]) {
        minIndex = j;

        steps.push({
          array: [...a],
          i,
          j,
          minIndex,
          swapped:false,
          sortedUpto: i - 1,
          swapCount: swapCount,
          text: `🔍 New minimum found: ${a[minIndex]}`
        });
      }
    }

    if (minIndex !== i) {

      let val1 = a[i];
      let val2 = a[minIndex];

      [a[i], a[minIndex]] = [a[minIndex], a[i]];

      swapCount++;

      steps.push({
        array: [...a],
        i,
        j: minIndex,
        minIndex,
        swapped:true,
        sortedUpto: i,
        swapCount: swapCount,
        text: `🔴 Swapping ${val1} and ${val2}`
      });

    } else {
      steps.push({
        array: [...a],
        i,
        j: -1,
        minIndex,
        swapped:false,
        sortedUpto: i,
        swapCount: swapCount,
        text: `✅ ${a[i]} is already in correct position`
      });
    }
  }

  if (steps.length > 0) {
    showStep(0);
    current = 1;
  }
}


// 🔍 Show step
function showStep(index) {
  let step = steps[index];

  render(step);

  document.getElementById("stepBox").innerText = step.text;
  document.getElementById("explain").innerText = step.text;

  document.getElementById("swapCount").innerText =
    step.swapCount + " swaps";
}


// ⏭ Next
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


// ⏮ Prev
function prevStep() {
  if (current > 0) {
    current--;
    showStep(current);
  }
}


// ▶ Play animation
function play() {
  clearInterval(interval);

  if (steps.length === 0) {
    start();
  }

  interval = setInterval(() => {
    if (current < steps.length) {
      showStep(current);
      current++;
    } else {
      clearInterval(interval);
    }
  }, 700);
}
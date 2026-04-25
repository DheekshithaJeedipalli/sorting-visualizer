// 🔵 Default array
let defaultArr = [5,3,8,4,2];

// 🟢 Working array
let arr = [...defaultArr];

let steps = [];
let current = 0;
let swapCount = 0;
let interval;


// 🔁 Initial render
document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("userInput").value = defaultArr.join(",");

  render({
    array: arr,
    i:-1,
    j:-1,
    pivot:-1,
    swapped:false
  });

  document.getElementById("swapCount").innerText = "0 swaps";
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
    pivot:-1,
    swapped:false
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
    pivot:-1,
    swapped:false
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

    // Pivot
    if (idx === state.pivot) {
      bar.style.background = "purple";
    }

    // Comparing
    if (idx === state.j) {
      bar.classList.add("compare");
    }

    // Swapping
    if (state.swapped && (idx === state.i || idx === state.j)) {
      bar.classList.add("swap");
    }

    container.appendChild(bar);
  });
}


// 🔁 Quick Sort
function quickSort(a, low, high) {
  if (low < high) {
    let pi = partition(a, low, high);

    quickSort(a, low, pi - 1);
    quickSort(a, pi + 1, high);
  }
}


// 🔁 Partition
function partition(a, low, high) {

  let pivot = a[high];
  let i = low - 1;

  // Choose pivot
  steps.push({
    array: [...a],
    pivot: high,
    i:-1,
    j:-1,
    swapped:false,
    swapCount: swapCount,
    text: `🔵 Pivot chosen: ${pivot}`
  });

  for (let j = low; j < high; j++) {

    // Compare with pivot
    steps.push({
      array: [...a],
      pivot: high,
      i,
      j,
      swapped:false,
      swapCount: swapCount,
      text: `🟡 Compare ${a[j]} with pivot ${pivot}`
    });

    if (a[j] < pivot) {
      i++;

      let val1 = a[i];
      let val2 = a[j];

      [a[i], a[j]] = [a[j], a[i]];
      swapCount++;

      // Swap step
      steps.push({
        array: [...a],
        pivot: high,
        i,
        j,
        swapped:true,
        swapCount: swapCount,
        text: `🔴 Swap ${val1} and ${val2}`
      });
    }
  }

  // Place pivot
  let val1 = a[i + 1];
  let val2 = a[high];

  [a[i + 1], a[high]] = [a[high], a[i + 1]];
  swapCount++;

  steps.push({
    array: [...a],
    pivot: i + 1,
    i,
    j: high,
    swapped:true,
    swapCount: swapCount,
    text: `🔴 Place pivot (${val2}) at correct position`
  });

  return i + 1;
}


// ▶ Start
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

  quickSort(a, 0, a.length - 1);

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
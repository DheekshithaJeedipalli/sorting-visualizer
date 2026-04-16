// 🔵 Default array
let defaultArr = [5,3,8,4,2];

// 🟢 Working array
let arr = [...defaultArr];

let steps = [];
let current = 0;


// 🔁 Initial render
document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("userInput").value = defaultArr.join(",");

  render({
    array: arr,
    i:-1,
    j:-1,
    keyIndex:-1,
    swapped:false,
    sortedUpto: 0
  });
});


// 🔵 Use default
function useDefault() {
  arr = [...defaultArr];
  steps = [];
  current = 0;

  document.getElementById("userInput").value = defaultArr.join(",");

  render({
    array: arr,
    i:-1,
    j:-1,
    keyIndex:-1,
    swapped:false,
    sortedUpto: 0
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

  render({
    array: arr,
    i:-1,
    j:-1,
    keyIndex:-1,
    swapped:false,
    sortedUpto: 0
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

    // Key element
    if (idx === state.keyIndex) {
      bar.style.background = "purple";
    }

    // Comparing / shifting
    if (idx === state.j) {
      bar.classList.add("compare");
    }

    // Sorted portion
    if (idx <= state.sortedUpto) {
      bar.classList.add("sorted");
    }

    container.appendChild(bar);
  });
}


// ▶ Start Insertion Sort
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

  let a = [...arr];

  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;

    // picking key
    steps.push({
      array: [...a],
      i,
      j,
      keyIndex: i,
      sortedUpto: i - 1,
      text: `🔑 Pick ${key} as key`
    });

    while (j >= 0 && a[j] > key) {

      steps.push({
        array: [...a],
        i,
        j,
        keyIndex: i,
        sortedUpto: i - 1,
        text: `🟡 Compare ${key} with ${a[j]}`
      });

      a[j + 1] = a[j];

      steps.push({
        array: [...a],
        i,
        j,
        keyIndex: i,
        sortedUpto: i - 1,
        text: `➡ Shift ${a[j]} to right`
      });

      j--;
    }

    a[j + 1] = key;

    steps.push({
      array: [...a],
      i,
      j: j + 1,
      keyIndex: j + 1,
      sortedUpto: i,
      text: `🔴 Insert ${key} at correct position`
    });
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
let defaultArr = [5,3,8,4,2];
let arr = [...defaultArr];

let steps = [];
let current = 0;
let mergeCount = 0;
let interval;

// INIT
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("userInput").value = defaultArr.join(",");
  updateMergeCount();
  render({ array: arr, active: [], merging: false });
});

// DEFAULT
function useDefault() {
  arr = [...defaultArr];
  steps = [];
  current = 0;
  mergeCount = 0;

  document.getElementById("userInput").value = defaultArr.join(",");
  updateMergeCount();
  render({ array: arr, active: [], merging: false });

  document.getElementById("stepBox").innerText = "Using default example";
  document.getElementById("explain").innerText = "Default input loaded";
}

// INPUT
function setArray() {
  let input = document.getElementById("userInput").value;

  arr = input
    .split(/[\s,]+/)
    .map(x => parseInt(x))
    .filter(x => !isNaN(x));

  if (arr.length < 2) {
    alert("Enter at least 2 numbers");
    return;
  }

  steps = [];
  current = 0;
  mergeCount = 0;

  updateMergeCount();
  render({ array: arr, active: [], merging: false });

  document.getElementById("stepBox").innerText = "Using custom input";
}

// 🎨 RENDER
function render(state) {
  let container = document.getElementById("array");
  container.innerHTML = "";

  state.array.forEach((val, i) => {
    let bar = document.createElement("div");
    bar.className = "bar";

    bar.style.height = val * 20 + "px";
    bar.innerText = val;

    // 🔵 Left half
    if (state.leftRange && i >= state.leftRange[0] && i <= state.leftRange[1]) {
      bar.style.background = "#93c5fd";
    }

    // 🌸 Right half
    if (state.rightRange && i >= state.rightRange[0] && i <= state.rightRange[1]) {
      bar.style.background = "#f9a8d4";
    }

    // 🟡 Comparing
    if (state.active.includes(i) && !state.merging) {
      bar.style.background = "#facc15";
    }

    // 🟢 Merging (placement)
    if (state.merging && state.active.includes(i)) {
      bar.style.background = "#22c55e";
    }

    container.appendChild(bar);
  });
}

// 🔁 MERGE SORT
function mergeSort(a, l, r) {
  if (l >= r) return;

  let mid = Math.floor((l + r) / 2);

  mergeSort(a, l, mid);
  mergeSort(a, mid + 1, r);
  merge(a, l, mid, r);
}

// 🔄 MERGE FUNCTION
function merge(a, l, m, r) {
  let left = a.slice(l, m + 1);
  let right = a.slice(m + 1, r + 1);

  let i = 0, j = 0, k = l;

  while (i < left.length && j < right.length) {

    // 🟡 Comparison step
    steps.push({
      array: [...a],
      active: [l + i, m + 1 + j],
      leftRange: [l, m],
      rightRange: [m + 1, r],
      merging: false,
      text: `Comparing ${left[i]} and ${right[j]}`
    });

    if (left[i] <= right[j]) {
      a[k] = left[i];
      i++;
    } else {
      a[k] = right[j];
      j++;
    }

    // 🟢 Placement step
    steps.push({
      array: [...a],
      active: [k],
      leftRange: [l, m],
      rightRange: [m + 1, r],
      merging: true,
      text: `Placing ${a[k]} at position ${k}`
    });

    k++;
  }

  // Remaining LEFT
  while (i < left.length) {
    a[k] = left[i];

    steps.push({
      array: [...a],
      active: [k],
      leftRange: [l, m],
      rightRange: [m + 1, r],
      merging: true,
      text: `Adding remaining ${left[i]}`
    });

    i++; k++;
  }

  // Remaining RIGHT
  while (j < right.length) {
    a[k] = right[j];

    steps.push({
      array: [...a],
      active: [k],
      leftRange: [l, m],
      rightRange: [m + 1, r],
      merging: true,
      text: `Adding remaining ${right[j]}`
    });

    j++; k++;
  }

  mergeCount++;
}

// ▶ START
function start() {
  let input = document.getElementById("userInput").value;

  if (input) {
    arr = input
      .split(/[\s,]+/)
      .map(x => parseInt(x))
      .filter(x => !isNaN(x));
  }

  if (arr.length < 2) {
    alert("Enter at least 2 numbers");
    return;
  }

  steps = [];
  current = 0;
  mergeCount = 0;

  updateMergeCount();

  let a = [...arr];
  mergeSort(a, 0, a.length - 1);

  if (steps.length > 0) {
    showStep(0);
    current = 1;
  }
}

// 🔍 SHOW STEP
function showStep(i) {
  let step = steps[i];

  render(step);

  document.getElementById("stepBox").innerText = step.text;
  document.getElementById("explain").innerText = step.text;

  updateMergeCount();
}

// ⏭ NEXT
function nextStep() {
  if (steps.length === 0) {
    alert("Click Start first!");
    return;
  }

  if (current < steps.length) {
    showStep(current++);
  }
}

// ⏮ PREV
function prevStep() {
  if (current > 0) {
    current--;
    showStep(current);
  }
}

// ▶ PLAY
function play() {
  if (steps.length === 0) start();

  clearInterval(interval);

  interval = setInterval(() => {
    if (current < steps.length) {
      showStep(current++);
    } else {
      clearInterval(interval);
    }
  }, 600);
}

// 🔢 UPDATE MERGE COUNT
function updateMergeCount() {
  document.getElementById("mergeCount").innerText =
    mergeCount + " merges";
}
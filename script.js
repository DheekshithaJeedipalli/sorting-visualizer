// 🔵 Default array
let defaultArr = [5,3,8,4,2];

// 🟢 Working array
let arr = [...defaultArr];

// 📊 Steps
let steps = [];
let current = 0;


// 🔁 Initial render
document.addEventListener("DOMContentLoaded", () => {
  render({
    array: arr,
    i:-1,
    j:-1,
    swapped:false,
    sortedFrom: arr.length
  });
});


// 🔵 Use default
function useDefault() {
  arr = [...defaultArr];
  steps = [];
  current = 0;

  // 🔥 Fill input box automatically
  document.getElementById("userInput").value = defaultArr.join(",");

  render({
    array: arr,
    i:-1,
    j:-1,
    swapped:false,
    sortedFrom: arr.length
  });

  document.getElementById("stepBox").innerText = "Using default example";
  document.getElementById("explain").innerText = "Default input loaded";
}


// 🟢 User input
function setArray() {
  let input = document.getElementById("userInput").value;

  if (!input) {
    alert("Please enter values!");
    return;
  }

  arr = input
    .split(",")
    .map(x => parseInt(x.trim()))
    .filter(x => !isNaN(x));

  if (arr.length === 0) {
    alert("Invalid input!");
    return;
  }

  steps = [];
  current = 0;

  render({
    array: arr,
    i:-1,
    j:-1,
    swapped:false,
    sortedFrom: arr.length
  });

  document.getElementById("stepBox").innerText = "Using custom input";
  document.getElementById("explain").innerText = "Custom input loaded";
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

    // Comparing
    if (idx === state.i || idx === state.j) {
      bar.classList.add("compare");
    }

    // Swapping
    if (state.swapped && (idx === state.i || idx === state.j)) {
      bar.classList.remove("compare");
      bar.classList.add("swap");
    }

    // Sorted
    if (idx >= state.sortedFrom) {
      bar.classList.remove("compare");
      bar.classList.remove("swap");
      bar.classList.add("sorted");
    }

    container.appendChild(bar);
  });
}


// ▶ Start Bubble Sort
function start() {

  let input = document.getElementById("userInput").value;

  // Use input if provided, else default
  if (input && input.trim() !== "") {
  arr = input
    .split(/[\s,]+/)   // 🔥 paste here
    .map(x => parseInt(x.trim()))
    .filter(x => !isNaN(x));
  }
   else {
    arr = [...defaultArr];
  }

  // Safety check
  if (arr.length < 2) {
    alert("Enter at least 2 numbers!");
    return;
  }

  steps = [];
  current = 0;

  let a = [...arr];

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {

      let val1 = a[j];
      let val2 = a[j+1];

      // comparison
      steps.push({
        array: [...a],
        i: j,
        j: j+1,
        val1,
        val2,
        swapped: false,
        sortedFrom: a.length - i
      });

      if (a[j] > a[j+1]) {
        [a[j], a[j+1]] = [a[j+1], a[j]];

        // swap
        steps.push({
          array: [...a],
          i: j,
          j: j+1,
          val1,
          val2,
          swapped: true,
          sortedFrom: a.length - i
        });
      }
    }
  }

  console.log("Steps generated:", steps.length); // 🔍 DEBUG

  // Show first step
  if (steps.length > 0) {
    showStep(0);
    current = 1;
  } else {
    alert("No steps generated!");
  }
}


// 🔍 Show step
function showStep(index) {
  let step = steps[index];

  render(step);

  let text = step.swapped
    ? `🔴 Swapping ${step.val1} and ${step.val2}`
    : `🟡 Comparing ${step.val1} and ${step.val2}`;

  document.getElementById("stepBox").innerText = text;
  document.getElementById("explain").innerText = text;
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


// ⏮ Previous
function prevStep() {
  if (current > 0) {
    current--;
    showStep(current);
  }
}
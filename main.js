const sudukoArray = document.querySelectorAll("input");
const reset = document.getElementById("reset");
const solved = document.getElementById("solve");
const section = document.querySelector("section");
const body = document.body;
let count = 0;
let res = false;

// for designing  thick border around and between the box;
for (let i = 0; i < 81; i++) {
  let ro = parseInt(i / 9) + 1;
  let co = (i % 9) + 1;
  if (ro == 1 || ro == 4 || ro == 7) {
    sudukoArray[i].style.borderTop = "3px solid white";
  }
  if (ro == 9) {
    sudukoArray[i].style.borderBottom = "3px solid white";
  }
  if (co == 1 || co == 4 || co == 7) {
    sudukoArray[i].style.borderLeft = "3px solid white";
  }
  if (co == 9) {
    sudukoArray[i].style.borderRight = "3px solid white";
  }
}
solved.addEventListener("click", solveSuduko);

// This is used to reset to begining
reset.addEventListener("click", () => {
  // console.log("Button is clicked!!!");
  for (let i = 0; i < 81; i++) {
    sudukoArray[i].value = "";
    sudukoArray[i].style.backgroundColor = "black";
    sudukoArray[i].disabled = false;
    let row = parseInt(i / 9);
    let col = i % 9;
    row = parseInt(row);
    mat[row][col] = 0;
    grid[row][col] = 0;
    totalSolution = 0;
    vis = [];
    count = 0;
    // console.log(divv);
  }
  res = false;
  section.removeChild(section.lastChild);
});
const le = sudukoArray.length;
let mat = [];
let grid = [];
for (let i = 0; i < 9; i++) {
  mat[i] = [];
  grid[i] = [];
  for (let j = 0; j < 9; j++) {
    mat[i][j] = 0;
    grid[i][j] = 0;
  }
}
// mat = [
//   [6, 2, 4, 0, 0, 0, 0, 0, 9],
//   [0, 0, 0, 0, 6, 5, 0, 0, 7],
//   [0, 0, 0, 0, 9, 0, 0, 0, 0],
//   [2, 4, 7, 0, 0, 9, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 9, 0, 0],
//   [0, 0, 0, 0, 0, 4, 1, 0, 5],
//   [0, 0, 1, 0, 3, 0, 0, 2, 0],
//   [7, 0, 0, 2, 0, 0, 6, 0, 0],
//   [0, 0, 0, 6, 0, 0, 0, 3, 0],
// ];

let vis = [];
for (let i = 0; i < le; i++) {
  sudukoArray[i].addEventListener("input", (e) => {
    // console.log(e.target.value);
    let row = i / 9;
    let col = i % 9;
    row = parseInt(row);
    if (mat[row][col] != 0) {
      mat[row][col] = 0;
      const index = vis.indexOf(i);
      if (index > -1) {
        vis.splice(index, 1);
      }
      count -= 1;
    } else {
      const val = parseInt(e.target.value);
      // console.log(Number.isInteger(val));
      if (Number.isInteger(val) && val > 0) {
        // console.log(row,col);
        mat[row][col] = val;
        vis.push(i);
        count += 1;
      } else if (Number.isInteger(val)) {
        setTimeout(() => {
          alert("Please enter the number between 1 to 9");
          sudukoArray[i].value = "";
        }, 100);
      } else {
        setTimeout(() => {
          alert("Please enter the number between 1 to 9");
          sudukoArray[i].value = "";
        }, 100);
      }
    }
  });
}
let totalSolution = 0; // It is used to check whether there exist 0,1 or multiple solution
function solveSuduko() {
  if (res) return;
  // console.log("1");
  if (count == 0) {
    alert("Please Enter some number");
    return;
  }
  res = true;
  // console.log(mat);
  if (!satrtingSafe(mat)) {
    // console.log("0000");
  } else {
    console.log("2");
    solve(0, mat, 0, 0);
    // console.log(grid);
    // console.log(totalSolution);
  }
  setTimeout(() => {
    console.log(vis);
    if (totalSolution != 0) {
      const heading = document.createElement("h1");
      // heading.textContent = 'Solution is :';
      createNewBox(totalSolution);
    } else {
      alert("No solution exist");
    }
    for (let i = 0; i < 81; i++) {
      sudukoArray[i].disabled = true;
    }
  }, 100);
}
// This function find the solution if there exist
function solve(c, mat2, sr, sc) {
  if (totalSolution == 2) return;
  if (c == 81) {
    totalSolution += 1;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        grid[i][j] = mat2[i][j];
      }
    }
    return;
  }
  let nr = (c + 1) / 9;
  nr = parseInt(nr);
  let nc = (c + 1) % 9;
  if (mat2[sr][sc] != 0) {
    solve(c + 1, mat2, nr, nc);
  } else {
    for (let i = 1; i <= 9; i++) {
      if (!isSafe(mat2, sr, sc, i)) continue;
      mat2[sr][sc] = i;
      solve(c + 1, mat2, nr, nc);
      mat2[sr][sc] = 0;
    }
  }
}

// It check wether the number we are putting is safe to put
function isSafe(mat2, sr, sc, value) {
  // console.log(mat2);
  // console.log(sr,sc,value);
  for (let i = 0; i < 9; i++) {
    if (mat2[sr][i] === value || mat2[i][sc] === value) return false;
  }
  let nr = parseInt(sr / 3) * 3;
  let nc = parseInt(sc / 3) * 3;
  for (let x = nr; x <= nr + 2; x++) {
    for (let y = nc; y <= nc + 2; y++) {
      if (mat2[x][y] == value) return false;
    }
  }
  return true;
}

// It check whether there are any number which exist twice in the starting
function satrtingSafe(mat2) {
  // console.log(mat2);
  for (let i = 0; i < 9; i++) {
    let s1 = [];
    let s2 = [];
    for (let j = 0; j < 9; j++) {
      let n1 = mat2[i][j];
      let n2 = mat2[j][i];
      if (n1 != 0) {
        if (s1.includes(n1)) {
          return false;
        }
        s1.push(n1);
      }
      if (n2 != 0) {
        if (s2.includes(n2)) {
          return false;
        }
        s2.push(n2);
      }
    }
  }
  // console.log(" ----- ");
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      let s1 = [];
      for (let x = i; x <= i + 2; x++) {
        for (let y = j; y <= j + 2; y++) {
          if (mat2[x][y] != 0) {
            if (s1.includes(mat2[x][y])) {
              return false;
            }
            s1.push(mat2[x][y]);
          }
        }
      }
    }
  }
  return true;
}

//This function is used to create the output box
function createNewBox(num) {
  let divv = document.createElement("div");
  for (let i = 0; i < 81; i++) {
    let inputt = document.createElement("input");
    inputt.setAttribute("type", "text");
    inputt.setAttribute("class", "createNewBoxInput");
    inputt.setAttribute("maxlength", "1");
    inputt.setAttribute("inputmode", "numeric");
    inputt.style.width = "3vw";
    inputt.style.border = "1px solid white";
    inputt.style.padding = "1vh";
    inputt.style.fontSize = "large";
    inputt.style.textAlign = "center";
    inputt.style.colo = "white";
    inputt.disabled = true;
    divv.appendChild(inputt);
    let ro = i / 9 + 1;
    let co = (i % 9) + 1;
    ro = parseInt(ro);
    if (!vis.includes(i)) {
      inputt.style.backgroundColor = "blue";
    } else {
    }
    inputt.value = grid[ro - 1][co - 1];
    if (ro == 1 || ro == 4 || ro == 7) {
      inputt.style.borderTop = "3px solid white";
    }
    if (ro == 9) {
      inputt.style.borderBottom = "3px solid white";
    }
    if (co == 1 || co == 4 || co == 7) {
      inputt.style.borderLeft = "3px solid white";
    }
    if (co == 9) {
      inputt.style.borderRight = "3px solid white";
    }
  }
  divv.style.display = "grid";
  divv.style.gridGap = "0px";
  divv.style.gridTemplateColumns = "repeat(9,1fr)";
  divv.style.width = "35vw";
  for (let i = 0; i < 4; i++) {
    let br = document.createElement("br");
    divv.appendChild(br);
  }
  let x1 = window.matchMedia("(min-width: 1300px)");
  let x2 = window.matchMedia("(max-width: 600px)");
  let x3 = window.matchMedia("(max-width: 400px)");
  if (x1.matches) {
    divv.style.width = "25vw";
  }
  if (x2.matches) {
    divv.style.width = "50vw";
  }
  if (x3.matches) {
    divv.style.width = "60vw";
  }
  divv.style.marginBottom = "1vh";
  section.appendChild(divv);
}

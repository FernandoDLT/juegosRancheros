document.querySelector("#clickMe").addEventListener("click", makeReq);

// document.getElementById("hide").style.display = "none";
async function makeReq() {
  const userName = document.querySelector("#userName").value;
  const res = await fetch(`/api?games=${userName}`);
  const data = await res.json();

  console.log(data);
  let status = document.querySelector("#personStatus");
  if (
    userName == "game" ||
    userName == "rock" ||
    userName == "scissors" ||
    userName == "paper"
  ) {
    document.querySelector("#personName").textContent = data.name;
    document.querySelector("#personOccupation").textContent =
      data.currentOccupation;
    let link = document.createElement("a");
    var text = document.createTextNode("Go here");
    link.appendChild(text);
    link.href = data.status;
    status.appendChild(link);
    // document.getElementById("hide").style.display = "block";
  } else {
    document.querySelector("#personName").textContent = data.name;
    status.textContent = data.status;
    document.querySelector("#personOccupation").textContent =
      data.currentOccupation;
  }
}

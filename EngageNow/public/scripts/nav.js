let mainopen = document.getElementById("mainopen");
      let main = document.getElementById("main");
      let violet = document.getElementById("violet");
      let purple = document.getElementById("purple");
      let blue = document.getElementById("blue");
      let childnav = document.getElementById("childnav");
      mainopen.addEventListener("click", () => {
        if (childnav.style.display === "none") {
          violet.style.transform = "rotate(45deg)";
          violet.style.position = "absolute";
          purple.style.position = "absolute";
          blue.style.position = "absolute";
          blue.style.width = "40px";
          blue.style.height = "40px";
          blue.style.borderRadius = "50%";
          blue.style.border = "5px solid blue";
          blue.style.background = "transparent";
          violet.style.marginTop = "12px";
          purple.style.marginTop = "12px";
          blue.style.marginTop = "15px";
          violet.style.marginLeft = "28px";
          purple.style.marginLeft = "28px";
          blue.style.marginLeft = "15px";
          purple.style.transform = "rotate(-45deg)";
          childnav.style.display = "flex";
          main.style.zIndex = "100";
          mainopen.style.flexDirection = "column";
        } else {
          main.style.background = "transparent";
          mainopen.style.display = "flex";
          violet.style.position = "relative";
          purple.style.position = "relative";
          blue.style.position = "relative";
          violet.style.marginLeft = "0px";
          violet.style.marginTop = "0px";
          purple.style.marginTop = "0px";
          blue.style.marginTop = "0px";
          purple.style.marginLeft = "0px";
          blue.style.marginLeft = "0px";
          blue.style.width = "25px";
          blue.style.height = "5px";
          blue.style.borderRadius = "5px";
          blue.style.border = "none";
          blue.style.background = "blue";
          violet.style.transform = "rotate(0deg)";
          purple.style.transform = "rotate(0deg)";
          childnav.style.display = "none";
          main.style.zIndex = "0";
        }
      });
      function flipCard() {
        var card = document.getElementById('card');
        card.classList.toggle('flipped');
    }
    function showExtraFields() {
      var role = document.getElementById('role').value;
      var card = document.getElementsByClassName('card')[0];
      var extraFields = document.getElementById('extra-fields');
      if (role === 'business') {
          extraFields.style.display = 'flex';
          card.style.height = '850px';
      } else {
          extraFields.style.display = 'none';
          card.style.height = '600px';
      }
  }
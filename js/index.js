var engine;

window.onload = function() {

    engine = new Engine();
    document.querySelector("#btnSearch").addEventListener("click", function() {
        let result = engine.search(document.querySelector("#txtKeywords").value);
        document.querySelector("#searchResults").innerHTML = engine.generateResults(result);
    });

    document.querySelector("#txtKeywords").addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("btnSearch").click();
        }
      });

};
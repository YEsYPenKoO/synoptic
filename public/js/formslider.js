document.addEventListener("DOMContentLoaded", function() {
    var slider = document.getElementById("pain-severity");
    var output = document.getElementById("slider-value");

    output.innerHTML = slider.value;

    slider.oninput = function() {
        output.innerHTML = this.value;
    };
});

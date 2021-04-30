let bookmarkBtn = document.querySelector(".bookmark");
let searchingBtn = document.querySelector(".searching");
let sharingBtn = document.querySelector(".sharing");
let featureBtn = document.querySelectorAll(".feature__link");
let featureImg = document.querySelector(".feature__img");
let featureTitle = document.querySelector(".feature__title");
let featureDesc = document.querySelector(".feature__desc");

featureBtn.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target.className.includes("bookmark")) {
      bookmarkBtn.classList.add("current");
      searchingBtn.classList.remove("current");
      sharingBtn.classList.remove("current");

      featureImg.src = "assets/images/curved-arrow-with-broken-line.png";
      featureTitle.textContent = "Line Follower";
      featureDesc.textContent =
        "This bot follows the path indicated by a line of some width. The bot senses the line with its infrared ray (IR) sensors installed under the robot. After that, the data is transmitted to the processor by specific transition buses. Thus, the processor decodes the commands and sends them to the driver to follow the path.";
    } else if (e.target.className.includes("searching")) {
      bookmarkBtn.classList.remove("current");
      searchingBtn.classList.add("current");
      sharingBtn.classList.remove("current");

      featureImg.src = "assets/images/caution.png";
      featureTitle.textContent = "Obstacle Avoidance ";
      featureDesc.textContent =
        "Now we are done with following our path and controlling it, but it is a robot after all and can't decide whether there is any obstacle around it.So we are using Ultrasonic range finder sensors to avoid collisions which will make the bot pass easily from any obstacle. ";
    } else {
      bookmarkBtn.classList.remove("current");
      searchingBtn.classList.remove("current");
      sharingBtn.classList.add("current");

      featureImg.src = "assets/images/remote-control (2).png";
      featureTitle.textContent = "Bluetooht Controled Bot";
      featureDesc.textContent =
      "In this mode, we are going to connect our bot to Bluetooth, we will be implementing Bluetooth Control using Arduino and a few other components to our line follower bot.";
    }
  });
});

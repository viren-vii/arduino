let bookmarkBtn = document.querySelector(".bookmark1");
let searchingBtn = document.querySelector(".searching1");
let sharingBtn = document.querySelector(".sharing1");
let featureBtn = document.querySelectorAll(".feature__link1");
let featureImg = document.querySelector(".feature__img1");
let featureTitle = document.querySelector(".feature__title1");
let featureDesc = document.querySelector(".feature__desc1");

featureBtn.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target.className.includes("bookmark")) {
      bookmarkBtn.classList.add("current");
      searchingBtn.classList.remove("current");
      sharingBtn.classList.remove("current");

      featureImg.src = "assets/images/curved-arrow-with-broken-line.png";
      featureTitle.textContent = "Bookmark in one click";
      featureDesc.textContent =
        "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.";
    } else if (e.target.className.includes("searching")) {
      bookmarkBtn.classList.remove("current");
      searchingBtn.classList.add("current");
      sharingBtn.classList.remove("current");

      featureImg.src = "assets/images/caution.png";
      featureTitle.textContent = "Intelligent Search";
      featureDesc.textContent =
        "Our powerful search feature will help you find saved sites in not time at all. No need to trawl through all of your bookmarks.";
    } else {
      bookmarkBtn.classList.remove("current");
      searchingBtn.classList.remove("current");
      sharingBtn.classList.add("current");

      featureImg.src = "assets/images/remote-control (2).png";
      featureTitle.textContent = "Share your bookmarks";
      featureDesc.textContent =
        "Easily share your bookmarks and collections with others.Create a shareable link that you can send at the click of a button.";
    }
  });
});

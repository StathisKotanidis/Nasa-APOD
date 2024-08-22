const fetchImgBtn = document.querySelector("#get-image");
const mediaContainer = document.querySelector(".media-container");

fetchImgBtn.addEventListener("click", () => {
  const date = document.querySelector("#input-date").value;
  getImage(date);
});

function getImage(date) {
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=5vuyk3S6GMWc4r8Ito0nNoarMEhqd8tBqV7jCSIt&date=${date}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      mediaContainer.innerHTML = "";
      mediaContainer.style.display = "flex";
      if (data.media_type === "image") {
        const nasaImage = document.createElement("img");
        nasaImage.id = "nasa-image";
        nasaImage.src = data.hdurl;
        mediaContainer.appendChild(nasaImage);
      } else if (data.media_type === "video") {
        const nasaVideo = document.createElement("iframe");
        nasaVideo.id = "nasa-video";
        nasaVideo.src = data.url;
        mediaContainer.appendChild(nasaVideo);
      }
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

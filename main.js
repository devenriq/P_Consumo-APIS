"use strict";
const API_URL_RANDOM =
  "https://api.thedogapi.com/v1/images/search?limit=2&api_key=618c7cbe-dc52-4731-bb80-21e27330cc00";

const API_URL_FAVORITES =
  "https://api.thedogapi.com/v1/favourites?limit=2&api_key=618c7cbe-dc52-4731-bb80-21e27330cc00";

const spanError = document.getElementById("error");

async function loadRandomDoggos() {
  try {
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();

    if (response.status !== 200) {
      spanError.innerHTML = "Hubo un error " + response.status;
    } else {
      const img1 = document.querySelector("#img1");
      const img2 = document.querySelector("#img2");
      const btn1 = document.querySelector("#btn1");
      const btn2 = document.querySelector("#btn2");
      img1.src = data[0].url;
      img2.src = data[1].url;

      btn1.onclick = () => saveFavoriteDoggo(data[0].id);
      btn2.onclick = () => saveFavoriteDoggo(data[1].id);
    }

    console.log(data[0].id);
  } catch (error) {
    console.error(new Error("Something happened  with the information"));
  }
}

async function loadFavoriteDoggos() {
  try {
    const response = await fetch(API_URL_FAVORITES);
    const data = await response.json();
    console.log("Favoritos", data);

    if (response.status !== 200) {
      spanError.innerHTML = "Hubo un error " + response.status;
    } else {
      data.forEach((dog) => {
        const section = document.getElementById("favoriteDoggos");
        const article = document.createElement("article");
        const img = document.createElement("img");
        const btn = document.createElement("button");
        const btnText = document.createTextNode(
          "Take out the dog of favorites"
        );

        img.src = dog["image"]["url"];
        img.width = 300;
        btn.appendChild(btnText);
        article.appendChild(img);
        article.appendChild(btn);
        section.appendChild(article);
      });
    }
  } catch (error) {
    console.error(new Error("Something happened with the information"));
  }
}

async function saveFavoriteDoggo(id) {
  const response = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await response.json();
  console.log("POST", response);

  if (response.status !== 200) {
    spanError.innerHTML = "Hubo un error " + response.status + data.message;
  }
}

loadRandomDoggos();
loadFavoriteDoggos();

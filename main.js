"use strict";
const API_URL_RANDOM =
  "https://api.thecatapi.com/v1/images/search?limit=2&5d4bf7e0-d05e-4483-b7eb-5657787c908c";

const API_URL_FAVORITES =
  "https://api.thecatapi.com/v1/favourites?api_key=5d4bf7e0-d05e-4483-b7eb-5657787c908c";

const API_URL_FAVORITES_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}?api_key=5d4bf7e0-d05e-4483-b7eb-5657787c908c`;

const spanError = document.getElementById("error");

async function loadRandomCattos() {
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

      btn1.onclick = () => saveFavoriteCatto(data[0].id);
      btn2.onclick = () => saveFavoriteCatto(data[1].id);
    }

    console.log(data[0].id);
  } catch (error) {
    console.error(new Error("Something happened  with the information"));
  }
}

async function loadFavoriteCattos() {
  try {
    const response = await fetch(API_URL_FAVORITES);
    const data = await response.json();
    console.log("Favoritos", data);

    if (response.status !== 200) {
      spanError.innerHTML = "Hubo un error " + response.status + data.message;
    } else {
      const section = document.getElementById("favoriteCattos");

      section.innerHTML = "";
      const h2 = document.createElement("h2");
      const h2Text = document.createTextNode("Favorites Cattos");

      h2.appendChild(h2Text);
      section.appendChild(h2);

      data.forEach((cat) => {
        const section = document.getElementById("favoriteCattos");
        const article = document.createElement("article");
        const img = document.createElement("img");
        const btn = document.createElement("button");
        const btnText = document.createTextNode(
          "Take out the cat of favorites"
        );

        img.src = cat["image"]["url"];
        img.width = 300;
        btn.appendChild(btnText);
        btn.onclick = () => deleteFavoriteCattos(cat["id"]);
        article.appendChild(img);
        article.appendChild(btn);
        section.appendChild(article);
      });
    }
  } catch (error) {
    console.error(new Error("Something happened with the information"));
  }
}

async function saveFavoriteCatto(id) {
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
  } else {
    console.log("Catto saved in favorites");
    loadFavoriteCattos();
  }
}

async function deleteFavoriteCattos(id) {
  const response = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: "DELETE",
  });

  const data = await response.json();
  if (response.status !== 200) {
    spanError.innerHTML = "Hubo un error " + response.status + data.message;
  } else {
    console.log("Catto deleted from favorites");
    loadFavoriteCattos();
  }
}

loadRandomCattos();
loadFavoriteCattos();

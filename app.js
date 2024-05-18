document.addEventListener("DOMContentLoaded", function () {
  chargerMangas();
  document
    .getElementById("form-ajout-manga")
    .addEventListener("submit", submitForm);
});

function submitForm(event) {
  event.preventDefault();
  const nomManga = document.getElementById("nom-manga").value;
  const serieManga = document.getElementById("serie-manga").value;
  const qualiteManga = document.getElementById("qualite-manga").value;

  if (nomManga.trim() === "" || serieManga === "" || qualiteManga === "") {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  const manga = {
    nom: nomManga,
    serie: serieManga,
    qualite: qualiteManga,
  };
  ajouterManga(manga);
  document.getElementById("form-ajout-manga").reset();
}

function ajouterManga(manga) {
  const section = document.getElementById(manga.serie);
  const div = document.createElement("div");
  div.classList.add("manga");
  div.innerHTML = `${manga.nom} - ${convertirQualiteEnEtoiles(manga.qualite)}
        <button onclick="deleteManga(this, '${manga.nom}')">Delete</button>`;
  section.appendChild(div);

  // Sauvegarder le manga dans le localStorage
  let mangas = JSON.parse(localStorage.getItem("mangas")) || [];
  mangas.push(manga);
  localStorage.setItem("mangas", JSON.stringify(mangas));
}

function deleteManga(button, nomManga) {
  button.parentNode.remove();

  // Supprimer le manga du localStorage
  let mangas = JSON.parse(localStorage.getItem("mangas")) || [];
  mangas = mangas.filter((manga) => manga.nom !== nomManga);
  localStorage.setItem("mangas", JSON.stringify(mangas));
}

function convertirQualiteEnEtoiles(qualite) {
  const etoiles = ["☆☆☆☆☆", "★☆☆☆☆", "★★☆☆☆", "★★★☆☆", "★★★★☆", "★★★★★"];
  return etoiles[parseInt(qualite, 10)];
}

function chargerMangas() {
  let mangas = JSON.parse(localStorage.getItem("mangas")) || [];
  mangas.forEach((manga) => ajouterManga(manga));
}

document.addEventListener("DOMContentLoaded", function () {
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
        <button onclick="deleteManga(this)">Delete</button>`;
  section.appendChild(div);
}

function deleteManga(button) {
  button.parentNode.remove();
}

function convertirQualiteEnEtoiles(qualite) {
  const etoiles = ["☆☆☆☆☆", "★☆☆☆☆", "★★☆☆☆", "★★★☆☆", "★★★★☆", "★★★★★"];
  return etoiles[parseInt(qualite, 10)];
}

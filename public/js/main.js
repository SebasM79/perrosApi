const form = document.getElementById("apiForm");
const resultDiv = document.getElementById("result");
const baseButton = document.getElementById("fetchBase");
const actionButtons = document.getElementById("actionButtons");
const breedSelect = document.getElementById("breed");

// Mostrar alerta en "Sobre nosotros"
document.getElementById("aboutUs").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Queremos compartir el amor por los perros.");
});

// Consultar lista de razas
async function fetchBreeds() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();

    if (response.ok) {
      populateBreeds(data.message);
    } else {
      alert("Error al cargar las razas.");
    }
  } catch (error) {
    alert("Ocurrió un error al conectar con el servidor.");
  }
}

// Llenar el menú desplegable con razas
function populateBreeds(breeds) {
  breedSelect.innerHTML = "";
  Object.keys(breeds).forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed;
    option.textContent = breed;
    breedSelect.appendChild(option);
  });
}

// Manejar el formulario para consultar imágenes
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const breed = breedSelect.value;

  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();

    if (response.ok) {
      displayImages(data.message);
      actionButtons.style.display = "block";
    } else {
      alert("Error al obtener imágenes.");
      actionButtons.style.display = "none";
    }
  } catch (error) {
    alert("Ocurrió un error al conectar con el servidor.");
    actionButtons.style.display = "none";
  }
});

// Mostrar imágenes
function displayImages(images) {
  resultDiv.innerHTML = "";
  images.slice(0, 10).forEach((img) => {
    const imageElement = document.createElement("img");
    imageElement.src = img;
    resultDiv.appendChild(imageElement);
  });
}

// Consultar razas disponibles
baseButton.addEventListener("click", fetchBreeds);

// Descargar resultados
document.getElementById("downloadResults").addEventListener("click", () => {
  const images = resultDiv.querySelectorAll("img");
  if (images.length === 0) {
    alert("No hay resultados para descargar.");
    return;
  }

  const links = Array.from(images).map((img) => img.src).join("\n");
  const blob = new Blob([links], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "imagenes.txt";
  link.click();
  URL.revokeObjectURL(url);
});

// Cargar razas al inicio
fetchBreeds();

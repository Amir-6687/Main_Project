const cards = [
  {
    title: "Berlin",
    description: "A luxurious modern mansion...",
    image: "assets/modern_mansion.png",
  },
  {
    title: "Hamburg",
    description: "A beautiful beachfront property with stunning views.",
    image: "bild02.webp",
  },
  {
    title: "München",
    description: "A cozy cabin in the mountains for a peaceful retreat.",
    image: "assets/mountain_cabin.png",
  },
  {
    title: "Köln",
    description: "A stylish penthouse in the heart of the city.",
    image: "assets/urban_penthouse.png",
  },
  {
    title: "Frankfurt am Main",
    description: "A spacious home perfect for a growing family.",
    image: "assets/family_home.png",
  },
  {
    title: "Stuttgart",
    description: "A sleek, modern apartment with a city view.",
    image: "assets/modern_apartment.png",
  },
  {
    title: "Leipzig",
    description: "A charming cottage with a rustic feel.",
    image: "assets/classic_cottage.png",
  },
  {
    title: "Dortmund",
    description: "A luxurious villa with expansive grounds and a pool.",
    image: "assets/luxury_villa.png",
  },
  {
    title: "Dresden",
    description: "A high-end penthouse with panoramic views.",
    image: "assets/penthouse_suite.png",
  },
  {
    title: "Hanover",
    description: "A grand country estate with a large garden.",
    image: "assets/country_estate.png",
  },
  {
    title: "Nürnberg",
    description: "A peaceful retreat on the coast with ocean views.",
    image: "assets/coastal_retreat.png",
  },
  {
    title: "Bremen",
    description: "A cozy chalet with a beautiful mountain view.",
    image: "assets/mountain_chalet.png",
  },
  {
    title: "Mannheim",
    description: "A sophisticated townhouse in the heart of the city.",
    image: "assets/luxury_townhouse.png",
  },
  {
    title: "Karlsruhe",
    description: "An eco-friendly home built with sustainable materials.",
    image: "assets/eco_friendly_home.png",
  },
  {
    title: "Oberhausen",
    description: "A modern loft with an open-plan design.",
    image: "assets/stylish_loft.png",
  },
  {
    title: "Bochum",
    description: "A grand seaside mansion with stunning views.",
    image: "assets/seaside_mansion.png",
  },
  {
    title: "Essen",
    description: "A spacious ranch with plenty of land for horses.",
    image: "assets/luxury_ranch.png",
  },
  {
    title: "Duisburg",
    description: "A sleek, modern bungalow with minimalist design.",
    image: "assets/modern_bungalow.png",
  },
  {
    title: "Rostock",
    description: "An estate with highland views and a private lake.",
    image: "assets/highland_estate.png",
  },
  {
    title: "Bonn",
    description: "A beautifully designed apartment with luxury finishes.",
    image: "assets/designer_apartment.png",
  },
  {
    title: "Kiel",
    description: "A tropical villa with a large outdoor pool.",
    image: "assets/tropical_villa.png",
  },
  {
    title: "Mainz",
    description: "A spacious city loft with high ceilings.",
    image: "assets/city_loft.png",
  },
  {
    title: "Freiburg im Brreisgau",
    description: "A quaint farmhouse surrounded by fields.",
    image: "assets/charming_farmhouse.png",
  },
  {
    title: "Münster",
    description: "A contemporary mansion with luxurious interiors.",
    image: "assets/contemporary_mansion.png",
  },
  {
    title: "Heidelberg",
    description: "A peaceful retreat located by the river.",
    image: "assets/riverside_retreat.png",
  },
  {
    title: "Augsburg",
    description: "A serene house with a beautiful lakefront view.",
    image: "assets/lakefront_house.png",
  },
  {
    title: "Kassel",
    description: "A modern houseboat offering unique living on the water.",
    image: "assets/modern_houseboat.png",
  },
  {
    title: "Würzburg",
    description: "A luxury chalet located in a prime ski resort.",
    image: "assets/luxury_ski_chalet.png",
  },
  {
    title: "Erfurt",
    description: "An elegant mansion with grand interiors.",
    image: "assets/elegant_mansion.png",
  },
  {
    title: "Düsseldorf",
    description: "An exclusive villa offering maximum privacy.",
    image: "assets/exclusive_villa.png",
  },
  {
    title: "Bielefeld",
    description: "A quaint cottage located right by the beach.",
    image: "assets/beachside_cottage.png",
  },
  {
    title: "Ingolstadt",
    description: "A stylish suburban home with a spacious backyard.",
    image: "assets/modern_suburban_home.png",
  },
  {
    title: "Magdeburg",
    description: "A luxury highrise offering panoramic city views.",
    image: "assets/luxury_highrise.png",
  },
  {
    title: "Lübeck",
    description: "A classic estate with sprawling grounds and gardens.",
    image: "assets/classic_estate.png",
  },
  {
    title: "Aachen",
    description: "A newly renovated house with modern amenities.",
    image: "assets/newly_renovated_house.png",
  },
  {
    title: "Regensburg",
    description: "A newly renovated house with modern amenities.",
    image: "assets/newly_renovated_house.png",
  },
];

const cardsElement = document.querySelector(".cards");
const itemsPerPage = 3;

const totalPages = Math.max(1, Math.ceil(cards.length / itemsPerPage));

let currentPage = Math.min(
  Math.max(
    Number(new URLSearchParams(window.location.search).get("page")) || 1,
    1
  ),
  totalPages
);

const previousPageButton = document.getElementById("go-to-previous-page");
const nextPageButton = document.getElementById("go-to-next-page");
const pagesContainer = document.getElementById("pages");

const setButtonState = (button, isDisabled) => {
  button.disabled = isDisabled;
  button.classList.toggle("pagination_button--disabled", isDisabled);
};

const changeCards = (cards, pageIndex, itemsPerPage) => {
  const startIndex = (pageIndex - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  cardsElement.innerHTML = cards
    .slice(startIndex, endIndex)
    .map(
      (card) => `
    <article>
      <figure>
        <img src="${card.image}" alt="${card.title}" onerror="this.src='assets.default.jpg'; this.alt='Image not available';">
      </figure>
      <div class="article-preview">
        <h2>${card.title}</h2>
        <p>${card.description}</p>
      </div>
    </article>
  `
    )
    .join("");

  currentPage = pageIndex;
  setButtonState(previousPageButton, currentPage === 1);
  setButtonState(nextPageButton, currentPage === totalPages);
  generatePageLinks();

  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("page", currentPage);
  window.history.pushState({}, "", `?${urlParams.toString()}`);
};

const generatePageLinks = () => {
  pagesContainer.innerHTML = "";
  if (totalPages === 1) return;

  const maxVisiblePages = 3;
  let pages = [];

  if (totalPages <= maxVisiblePages + 2) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);
  }

  pages.forEach((page) => {
    if (page === "...") {
      const dots = document.createElement("span");
      dots.textContent = "...";
      dots.classList.add("pagination", "dots");
      pagesContainer.appendChild(dots);
    } else {
      const pageLink = document.createElement("a");
      pageLink.textContent = page;
      pageLink.href = `?page=${page}`;
      pageLink.classList.toggle(
        "pagination_link--active",
        currentPage === Number(page)
      );
      pageLink.setAttribute(
        "aria-current",
        currentPage === Number(page) ? "page" : ""
      );
      pageLink.addEventListener("click", (event) => {
        event.preventDefault();
        changeCards(cards, Number(page), itemsPerPage);
      });
      pagesContainer.appendChild(pageLink);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  changeCards(cards, currentPage, itemsPerPage);

  previousPageButton.onclick = () =>
    currentPage > 1 && changeCards(cards, currentPage - 1, itemsPerPage);
  nextPageButton.onclick = () =>
    currentPage < totalPages &&
    changeCards(cards, currentPage + 1, itemsPerPage);

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && currentPage > 1) {
      changeCards(cards, currentPage - 1, itemsPerPage);
    } else if (event.key === "ArrowRight" && currentPage < totalPages) {
      changeCards(cards, currentPage + 1, itemsPerPage);
    }
  });
});

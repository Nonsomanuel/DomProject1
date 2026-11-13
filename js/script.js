// Shopping Cart functionality
// The script is loaded at the bottom of index.html, so the cart elements
// are already available when this code runs.

const productsContainer = document.querySelector(".list-products");
const totalElement = document.querySelector(".total");

// Convert a displayed price such as "100 $" into the number 100.
function getUnitPrice(productCard) {
  const priceText = productCard.querySelector(".unit-price").textContent;
  return Number.parseFloat(priceText.replace(/[^0-9.]/g, "")) || 0;
}

// Recalculate the total using each remaining product's price and quantity.
function updateTotal() {
  let total = 0;

  document.querySelectorAll(".list-products .card").forEach((productCard) => {
    const quantity = Number(
      productCard.querySelector(".quantity").textContent
    );
    total += getUnitPrice(productCard) * quantity;
  });

  totalElement.textContent = `${total.toFixed(2)} $`;
}

// Event delegation: one listener handles clicks on all product controls.
productsContainer.addEventListener("click", (event) => {
  const clickedControl = event.target.closest(
    ".fa-plus-circle, .fa-minus-circle, .fa-trash-alt, .fa-heart"
  );

  // Ignore clicks that are not on one of the cart controls.
  if (!clickedControl) return;

  const productCard = clickedControl.closest(".card");
  if (!productCard) return;

  const quantityElement = productCard.querySelector(".quantity");

  if (clickedControl.classList.contains("fa-plus-circle")) {
    // Increase this product's quantity by one.
    quantityElement.textContent = Number(quantityElement.textContent) + 1;
    updateTotal();
  } else if (clickedControl.classList.contains("fa-minus-circle")) {
    // Decrease the quantity, but never allow it to go below zero.
    const currentQuantity = Number(quantityElement.textContent);
    if (currentQuantity > 0) {
      quantityElement.textContent = currentQuantity - 1;
      updateTotal();
    }
  } else if (clickedControl.classList.contains("fa-trash-alt")) {
    // The .card is inside the outer .card-body product wrapper.
    productCard.parentElement.remove();
    updateTotal();
  } else if (clickedControl.classList.contains("fa-heart")) {
    // Toggle between the normal heart colour and red.
    const isLiked = clickedControl.classList.toggle("liked");
    clickedControl.style.color = isLiked ? "red" : "black";
    clickedControl.setAttribute("aria-pressed", String(isLiked));
  }
});

// Make the initial total accurate if the starting quantities are changed.
updateTotal();

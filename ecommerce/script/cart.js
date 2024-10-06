const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.querySelector("#cart-container");

showCart();


function showCart() {
  cartContainer.innerHTML = ""; 

  for (let i = 0; i < cart.length; i++) {
    const card = document.createElement("section");
    card.className = "card";

  
    const image = document.createElement("img");
    image.className = "card-img";
    image.src = cart[i].img;
    card.appendChild(image);


    const h1 = document.createElement("h1");
    h1.classList.add("brand-name");
    h1.innerText = `${cart[i].brand}`;
    card.appendChild(h1);

    const details = document.createElement("small");
    details.classList.add("details");
    details.innerText = cart[i].details;
    card.appendChild(details);

    const priceCategoryContainer = document.createElement("div");
    priceCategoryContainer.classList.add("price-category-container");

    const category = document.createElement("span");
    category.classList.add("category");
    category.innerText = cart[i].category.replace("_", " ");
    priceCategoryContainer.appendChild(category);

    
    const price = document.createElement("span");
    price.classList.add("price");
    price.innerHTML = `₹${cart[i].price}`;
    priceCategoryContainer.appendChild(price);

    card.appendChild(priceCategoryContainer);

    
    const btnSection = document.createElement("section");
    btnSection.classList.add("button-section");
    card.appendChild(btnSection);

    
    const quantitySection = document.createElement("span");
    quantitySection.classList.add("quantity-section");

    const quantitySpan = document.createElement("span");
    quantitySpan.classList.add("quantity-span");
    quantitySpan.id = "quantity-span-" + cart[i].id; 
    quantitySpan.innerText = cart[i].quantity; 

   
    const decrementBtn = document.createElement("button");
    decrementBtn.classList.add("decrement-btn");
    decrementBtn.innerText = "–";

    decrementBtn.addEventListener("click", (event) => {
      if (cart[i].quantity > 1) {

        cart[i].quantity--;
        document.getElementById("quantity-span-" + cart[i].id).innerText =
          cart[i].quantity; 
        localStorage.setItem("cart", JSON.stringify(cart)); 
        showTotalCount(); 
      }
    });


    // Increment Button
    const incrementBtn = document.createElement("button");
    incrementBtn.classList.add("increment-btn");
    incrementBtn.innerText = "+";

    incrementBtn.addEventListener("click", (event) => {
      cart[i].quantity++; 
      document.getElementById("quantity-span-" + cart[i].id).innerText =
        cart[i].quantity; 
      localStorage.setItem("cart", JSON.stringify(cart)); 
      showTotalCount(); 
    });


    //Delete Button Logic
    const removeIcon = document.createElement("i");
    removeIcon.classList.add("remove-icon", "fa-solid", "fa-trash-can");

    removeIcon.addEventListener("click", (event) => {
      cart.splice(i, 1); 
      localStorage.setItem("cart", JSON.stringify(cart)); 
      showCart(); 
      showTotalCount();

      if (cart.length === 0) {
        localStorage.clear();
      }
    });

    // Appending elements to btnSection
    quantitySection.appendChild(decrementBtn);
    quantitySection.appendChild(quantitySpan);
    quantitySection.appendChild(incrementBtn);
    btnSection.appendChild(quantitySection);
    btnSection.appendChild(removeIcon);
    cartContainer.appendChild(card); 
  }
  showTotalCount(); 
}


// Total Amount
function showTotalCount() {
  let totalPrice = 0;
  let cartPriceLabel = document.querySelector("#cart-price"); 
  cartPriceLabel.innerHTML = "";
  cartPriceLabel.innerText = "Your Total Cart Price is: ";

  let cartTotalSpan = document.createElement("span"); 
  cartTotalSpan.classList.add("cart-total");
  cart.forEach((element) => {
    totalPrice += element.price * element.quantity;
  });
  cartTotalSpan.innerText = totalPrice;
  cartPriceLabel.appendChild(cartTotalSpan);
}


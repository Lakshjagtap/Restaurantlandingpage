document.addEventListener("DOMContentLoaded", () => {
    const cartItemsElement = document.getElementById("cart-items");
    const checkoutButton = document.getElementById("checkout-button");
    const menuContainer = document.querySelector(".menu-container");

    let cart = [];
    const menuData = {
        starters: [
            { name: "Bruschetta", description: "Toasted bread with tomatoes and basil", price: 699 },
            { name: "Garlic Bread", description: "Crispy garlic-flavored bread", price: 499 },
            { name: "Caprese Salad", description: "Tomatoes, mozzarella, and basil", price: 799 },
            { name: "Stuffed Mushrooms", description: "Mushrooms filled with cheese and herbs", price: 749 },
            { name: "Chicken Wings", description: "Spicy and tangy chicken wings", price: 899 },
            { name: "Onion Rings", description: "Crispy fried onion rings", price: 599 }
        ],
        mainCourse: [
            { name: "Grilled Salmon", description: "Perfectly grilled salmon fillet", price: 1899 },
            { name: "Spaghetti Carbonara", description: "Pasta with creamy carbonara sauce", price: 1450 },
            { name: "Vegetable Stir Fry", description: "Assorted vegetables in a savory sauce", price: 1299 },
            { name: "Butter Chicken", description: "Tender chicken in a rich butter sauce", price: 1650 },
            { name: "Grilled Chicken Breast", description: "Juicy grilled chicken breast", price: 1599 },
            { name: "Fish Curry", description: "Spicy and flavorful fish curry", price: 1799 },
            { name: "Paneer Tikka Masala", description: "Paneer cubes in a spicy masala sauce", price: 1475 }
        ],
        desserts: [
            { name: "Tiramisu", description: "Classic Italian coffee-flavored dessert", price: 850 },
            { name: "Chocolate Lava Cake", description: "Rich chocolate cake with molten center", price: 900 },
            { name: "Cheesecake", description: "Creamy cheesecake with a graham cracker crust", price: 775 },
            { name: "Gulab Jamun", description: "Sweet Indian milk dumplings in syrup", price: 650 },
            { name: "Ice Cream Sundae", description: "Ice cream topped with chocolate sauce and nuts", price: 725 },
            { name: "Fruit Tart", description: "Crispy tart filled with custard and fresh fruits", price: 800 }
        ],
        drinks: [
            { name: "Cappuccino", description: "Coffee with steamed milk and foam", price: 450 },
            { name: "Mojito", description: "Refreshing mint and lime cocktail", price: 675 },
            { name: "Fresh Orange Juice", description: "Freshly squeezed orange juice", price: 500 },
            { name: "Herbal Tea", description: "Calming herbal tea blend", price: 350 },
            { name: "Mango Lassi", description: "Yogurt-based mango drink", price: 425 },
            { name: "Iced Latte", description: "Coffee with cold milk and ice", price: 475 },
            { name: "Soft Drinks", description: "Various carbonated beverages", price: 250 }
        ]
    };

    // Function to populate menu items
    function populateMenu() {
        menuContainer.innerHTML = Object.entries(menuData).map(([category, items]) => `
            <div class="menu-category">
                <h3>${capitalizeFirstLetter(category)}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Dish</th>
                            <th>Description</th>
                            <th>Price (₹)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.description}</td>
                                <td>${item.price}</td>
                                <td><button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Add to Cart</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `).join('');
    }

    // Capitalize first letter of each category
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Function to update the cart display
    function updateCart() {
        if (cart.length === 0) {
            cartItemsElement.innerHTML = "Your cart is empty.";
        } else {
            cartItemsElement.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <p>${item.name} - ₹${item.price} x ${item.quantity}</p>
                    <button class="remove-from-cart" data-name="${item.name}">Remove</button>
                </div>
            `).join("");
        }
    }

    // Add item to cart
    menuContainer.addEventListener("click", event => {
        if (event.target.classList.contains("add-to-cart")) {
            const name = event.target.getAttribute("data-name");
            const price = parseInt(event.target.getAttribute("data-price"));

            // Check if item already exists in the cart
            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCart();
        }
    });

    // Remove item from cart
    cartItemsElement.addEventListener("click", event => {
        if (event.target.classList.contains("remove-from-cart")) {
            const name = event.target.getAttribute("data-name");

            // Filter out the item from the cart
            cart = cart.filter(item => item.name !== name);

            updateCart();
        }
    });

    // Handle checkout
    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Proceeding to checkout...");
            // Here you could add your checkout logic
        }
    });

    populateMenu(); // Populate menu on page load
    updateCart(); // Update cart display on page load
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('form-message');

    // Simple validation
    if (name === '' || email === '' || message === '') {
        formMessage.textContent = 'Please fill in all fields.';
        formMessage.style.color = 'red';
        return;
    }

    // Simulate form submission
    formMessage.textContent = 'Thank you for contacting us! We will get back to you soon.';
    formMessage.style.color = 'green';

    // Optionally, you could send the form data to a server here
    // Example:
    // fetch('/submit-form', {
    //     method: 'POST',
    //     body: JSON.stringify({ name, email, message }),
    //     headers: { 'Content-Type': 'application/json' }
    // })
    // .then(response => response.json())
    // .then(data => {
    //     formMessage.textContent = 'Thank you for contacting us!';
    //     formMessage.style.color = 'green';
    // })
    // .catch(error => {
    //     formMessage.textContent = 'There was an error submitting the form. Please try again.';
    //     formMessage.style.color = 'red';
    // });
});

document.addEventListener("alpine:init", () => {
  Alpine.data("pizzaCartWithAPIWidget",  ()=> {
    return {
      items: [
        {
          name: "Small Pizza",
          description: "Snack for One! top-view-pepperoni-pizza-with",
          price: 79.99,
          quantity: 0,
        },
        {
          name: "Medium Pizza",
          description:
            "Jallepino flavoured Pizza made by Chef Kay secret sausages-bell",
          price: 198.99,
          quantity: 0,
        },
        {
          name: "Large Pizza",
          description: "Full deluxe cheddar cheese Pizza mushroom-pepper-olive",
          price: 289.99,
          quantity: 0,
        },
      ],
      pizzas: [],
      cartItems: [],
      cartQuantity: 0,
      cartTotal: 0,
      cashInput: 0,
      showMessage: false,
      successMessage: "",
      warningMessage: "",
      addToCart: function (item) {
        if (item.quantity === undefined) {
          item.quantity = 1;
          this.pizzas.push(item);
        } else {
          item.quantity++;
        }
        this.cartQuantity++;
        this.cartTotal += item.price;
        this.cartItems.push(item); // Add the item to the cartItems array
      },
      removeFromCart(item) {
        this.cartTotal -= item.price * item.quantity;
        this.cartQuantity -= item.quantity;
        item.quantity = 0;

        if (item.quantity === undefined) {
          // Remove the item from the pizzas array
          const index = this.pizzas.findIndex((pizza) => pizza.id === item.id);
          if (index !== -1) {
            this.pizzas.splice(index, 1);
          }
        }

        // Remove the item from the cartItems array
        const cartIndex = this.cartItems.findIndex(
          (cartItem) => cartItem.id === item.id
        );
        if (cartIndex !== -1) {
          this.cartItems.splice(cartIndex, 1);
        }
      },

      validatePayment() {
        if (this.cashInput > this.cartTotal) {
          this.showMessage = true;
          this.successMessage = "Congratulations! Your order is on the way.";
          this.warningMessage = "";
        } else {
          this.showMessage = true;
          this.warningMessage = "Oops, not enough cash";
          this.successMessage = "";
        }

        setTimeout(() => {
          this.showMessage = false;
          this.successMessage = "";
          this.warningMessage = "";
        }, 3000);
      },
      init() {
        axios
          .get("https://pizza-api.projectcodex.net/api/pizzas")
          .then((response) => {
            this.pizzas = response.data.pizzas;
          });
      },
    };
  });
});

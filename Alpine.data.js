document.addEventListener("alpine:init", () => {
  Alpine.data("pizzaCartWithAPIWidget", function () {
    return {
      pizzas: [],

      drawPizza() {
        const url = "https://pizza-api.projectcodex.net/api/pizzas";

        axios.get(url).then((result) => {
          this.pizzas = result.data.pizzas;
        });
      },
    };
  });
});

<!-- eslint-disable vue/html-self-closing -->
<template>
  <section>
    <div class="product---page---img">
      <!-- <img :src="data.productByHandle.images.edges[0].node.src" /> -->

      <img
        v-for="image in product.productByHandle.images.edges"
        :key="image.node.src"
        :src="image.node.src"
      />
    </div>
    <div class="product---actions">
      <div class="main---actions">
        <div class="desc---button">
          <button class="nav---button desc" @click="descFunction">
            <h3 class="nav---text desc">Description</h3>
          </button>
        </div>
        <div class="price---tag">
          <div class="nav---button price">
            <h3 class="nav---text price">{{ price }}</h3>
          </div>
        </div>
        <div class="buy---button">
          <button class="nav---button buy" @click="redirectToPayment">
            <h3 class="nav---text buy">Buy</h3>
          </button>
        </div>
      </div>
      <div class="more---options">
        <div class="variant-options" v-if="displayVariants">
          <button
            v-for="(variant, index) in displayVariants"
            :key="index"
            class="variant other---text"
            @click="selectVariant(index, $event)"
          >
            {{ variant.node.title }}
          </button>
        </div>
        <div class="quantity">
          <label for="quantityInt" class="other---text">Quantity</label>
          <input
            id="quantityInt"
            type="number"
            placeholder="Quantity"
            value="1"
            inputmode="numeric"
            pattern="[0-9]*"
            min="1"
            @input="updateQuantity($event)"
          />
        </div>
      </div>
      <div class="desc---modal">
        <h2 class="about---text">{{ product.productByHandle.description }}</h2>
      </div>
    </div>
  </section>
</template>

<script setup>
import { createCheckoutMutation } from "../../graphql/createCheckoutMutation";
import { getProductQuery } from "../../graphql/getProduct";
const route = useRoute();

const { data: product } = await useAsyncQuery(getProductQuery, {
  handle: route.params.handle,
});

const variants = product.value.productByHandle.variants.edges;
let displayVariants = null;

if (variants.length > 1) {
  displayVariants = variants;
}

let selectedVariantIndex = 0;
let quantity = 1;

const updateQuantity = (e) => {
  quantity = e.target.value;
};

const price = computed(
  () => `$${product.value.productByHandle.priceRange.maxVariantPrice.amount}`
);

const removeSelectedClass = () => {
  const variantsButton = document.querySelectorAll(".variant");

  variantsButton.forEach((button) => {
    button.classList.remove("selected");
  });
};

const handleButtonClickedStyle = (e) => {
  removeSelectedClass();

  e.target.classList.add("selected");
};

const redirectToPayment = async (e) => {
  try {
    const apolloClient = useApolloClient();

    const result = await apolloClient.client.mutate({
      mutation: createCheckoutMutation,
      variables: {
        variantId:
          product.value.productByHandle.variants.edges[selectedVariantIndex]
            .node.id,
        quantity: parseInt(quantity),
      },
    });

    window.location.href = result.data.checkoutCreate.checkout.webUrl;
    // console.log(result.data.checkoutCreate.checkout);
  } catch (error) {
    console.error("Error:", error);
  }
};

const descFunction = () => {
  const desc_box = document.querySelector(".desc---modal");
  desc_box.classList.toggle("open");
};

const selectVariant = (index, e) => {
  handleButtonClickedStyle(e);
  selectedVariantIndex = index;
};
</script>

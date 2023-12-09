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
      <div class="desc---modal">
        <h2 class="about---text">{{ product.productByHandle.description }}</h2>
      </div>
    </div>
    <!-- <h1>{{ price }}</h1> -->
  </section>
</template>

<script setup>
import { createCheckoutMutation } from "../../graphql/createCheckoutMutation";
import { getProductQuery } from "../../graphql/getProduct";
const route = useRoute();

const { data: product } = await useAsyncQuery(getProductQuery, {
  handle: route.params.handle,
});

const price = computed(
  () => `$${product.value.productByHandle.priceRange.maxVariantPrice.amount}`
);

const redirectToPayment = async (e) => {
  try {
    const apolloClient = useApolloClient();

    const result = await apolloClient.client.mutate({
      mutation: createCheckoutMutation,
      variables: {
        variantId: product.value.productByHandle.variants.edges[0].node.id,
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
</script>

<template>
  <section class="shop">
    <div class="shop---head">
      <h1 class="shop---head---text">Shop</h1>
    </div>
    <section class="shop---products page---align">
      <!-- {{ data.products }} -->

      <ProductCard
        v-for="product in data.products.edges"
        :key="product.node.id"
        :title="product.node.title"
        :handle="product.node.handle"
        :image="product.node.images.edges[0].node.src"
      />
    </section>
    <About />
  </section>
</template>

<script setup>
import { getProductsQuery } from "../graphql/getProducts";

const variables = { first: 3 };
const { data } = await useAsyncQuery(getProductsQuery, variables);
</script>

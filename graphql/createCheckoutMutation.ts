export const createCheckoutMutation = gql`
  mutation Checkout($variantId: ID!, $quantity: Int!) {
    checkoutCreate(
      input: { lineItems: { variantId: $variantId, quantity: $quantity } }
    ) {
      checkout {
        webUrl
      }
    }
  }
`;

export const createCheckoutMutation = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(
      input: $input
    ) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

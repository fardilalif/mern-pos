export const currencyFormatter = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "MYR",
  }).format(value);

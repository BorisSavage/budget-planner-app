export const currencyFormatter = new Intl.NumberFormat(navigator.language, {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 0,
});

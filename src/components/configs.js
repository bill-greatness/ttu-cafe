export const config = (email, amount) => {
  return {
    reference: new Date().getTime().toString(),
    email,
    amount: parseInt(amount) * 100,
    currency:"GHS",
    publicKey: "pk_test_fa247787f57bc02996abeb9fa58236ead7c9babf",
  };
};

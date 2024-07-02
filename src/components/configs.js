export const config = (email, amount) => {
  return {
    reference: new Date().getTime().toString(),
    email,
    amount: parseInt(amount) * 1000,
    publicKey: "pk_test_dsdfghuytfd2345678gvxxxxxxxxxx",
  };
};

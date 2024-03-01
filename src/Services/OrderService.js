export const fetchAllOrder = async () => {
  // console.log(ids);

  try {
    await apiAxios.get("user/getUsersOrders").then((response) => {
      console.log(response);
    });
  } catch (error) {
    // console.log(error);
    // store.dispatch(ProductIsError(error));
  }
};

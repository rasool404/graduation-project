export function handleMax(productsStore) {
  let summ = 0;
  productsStore &&
    productsStore.forEach((item) => {
      if (summ < item.price) {
        summ = item.price;
      }
    });
  return summ;
}

export function handleCounterCount(state) {
  let counter = 0;
  state.forEach((el) => {
    if (el.activeBasket) {
      counter += el.count;
    }
  });
  return counter;
}

export function handleCounterTotal(state) {
  let total = 0;
  state.forEach((el) => {
    if (el.activeBasket) {
      total += el.price * el.count;
    }
  });
  return total;
}

export function increaseProductCount(id, state, dispatch) {
  const newState = state;
  newState.forEach((product) => {
    if (product.id === Number(id)) {
      product.count++;
    }
  });
  dispatch({ type: "CHANGE_STATE", payload: newState });
}

export function decreaseProductCount(id, state, dispatch) {
  const newState = state;
  newState.forEach((product) => {
    if (product.id === Number(id)) {
      if (product.count > 1) {
        product.count--;
      }
    }
  });
  dispatch({ type: "CHANGE_STATE", payload: newState });
}

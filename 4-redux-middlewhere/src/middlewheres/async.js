export default function ({ dispatch }) {
  //next is a function that references the next middlewhere in the chain
  return function (next) {
    return function (action) {
      //here that action object is dispatced and will have a type property and possibly a payload.
    };
  };
}

//This folder helps me for making non errors on Api call
import AxiosCall from "./AxiosCall";
// ContrFunc object helps me to keep instances of functions or controls name used by backend functions
export const ContrFunc = {
  Controllers: {},
  Functions: {
    products: "products",
    ads: "ads",
  },
};
// I dont use directly axios.finction(get) but i make my own function in order if i need spinner and some aditional attributes that helps me and organize my work
export const getData = async (functionname, spinnerFunct, parameters) => {
  if (spinnerFunct !== null) {
    spinnerFunct();
  }
  let response = await AxiosCall.get(
    `/${functionname}`,
    parameters
      ? {
          params: {
            ...parameters,
          },
        }
      : null
  );
  return response;
};

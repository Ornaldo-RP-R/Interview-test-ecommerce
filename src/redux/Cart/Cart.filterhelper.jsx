//Helper function to keep reducer code clean

//1. Give an increment and an id and if id is found in array add increment to value
//but not pass unallowed values(negative values)
export const FindItemToArrayByIdIncreaseOrDecrease = (Id, Array, Increment) => {
  let ModifiedArray = Array;
  for (let i = 0; i < ModifiedArray.length; i++) {
    if (ModifiedArray[i].product.id === Id) {
      if (ModifiedArray[i].value === 1 && Increment === -1) {
        ModifiedArray[i].value += 0;
      } else {
        ModifiedArray[i].value += Increment;
      }
    }
  }
  return ModifiedArray;
};
//2.loop in array find product by id given and using splice remove it
export const RemoveProductById = (Id, Array) => {
  let ModifiedArray = Array;
  for (let i = 0; i < ModifiedArray.length; i++) {
    if (ModifiedArray[i].product.id === Id) {
      ModifiedArray.splice(i, 1);
    }
  }
  return ModifiedArray;
};
//3.loop in array and if product by id is found toggle checkOption proper name would be selectOrDeselectOneById
export const SelectOneById = (Id, Array) => {
  let ModifiedArray = Array;
  for (let i = 0; i < ModifiedArray.length; i++) {
    if (ModifiedArray[i].product.id === Id) {
      ModifiedArray[i].checkOption = ModifiedArray[i].checkOption
        ? !ModifiedArray[i].checkOption
        : true;
    }
  }
  return ModifiedArray;
};
//4.If in array has unchecked values check it all otherwise uncheck it all
export const SelectAllOrDeselectAll = (Array) => {
  let IfAllChecked = true;
  let ModifiedArray = Array;

  for (let i = 0; i < ModifiedArray.length; i++) {
    if (ModifiedArray[i].checkOption === false) {
      IfAllChecked = false;
      break;
    }
  }
  if (IfAllChecked === false) {
    for (let i = 0; i < ModifiedArray.length; i++) {
      ModifiedArray[i].checkOption = true;
    }
  } else {
    for (let i = 0; i < ModifiedArray.length; i++) {
      ModifiedArray[i].checkOption = false;
    }
  }

  return ModifiedArray;
};

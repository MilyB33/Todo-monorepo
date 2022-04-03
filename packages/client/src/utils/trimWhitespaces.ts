interface IObject {
  [key: string]: any;
}

export const trimWhitespaces = (ob: IObject) => {
  for (let key of Object.keys(ob)) {
    if (typeof ob[key] === "string") {
      ob[key] = ob[key].trim();
    }

    if (typeof ob[key] === "object" && ob[key] !== null) {
      trimWhitespaces(ob[key]);
    }
  }

  return ob; // Probably needs to be returned new object to avoid mutation
};

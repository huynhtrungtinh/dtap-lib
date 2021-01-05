import privateFn from "./private";
import publicFn from "./public";
export const routeProvider = (key: string) => {
  if (key === "public") {
    return publicFn();
  } else if (key === "private") {
    return privateFn();
  }
  return [];
};

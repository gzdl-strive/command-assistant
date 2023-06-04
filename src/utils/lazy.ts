import { lazy } from "react";

// lazy load route component
function lazyImportComponent(url: string) {
  const com = lazy(() => import(`${url}`));
  return com;
}

export {
  lazyImportComponent
};
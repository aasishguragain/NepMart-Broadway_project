export const useBreadcrumbTitle = (pathname) => {
  let data = [];

  if (pathname === "/home") {
    data = ["home"];
  }
  if (pathname === "/products") {
    data = ["products"];
  }

  if (pathname.includes("/products/details/")) {
    data = ["products", "details"];
  }

  if (pathname.includes("/product/edit/")) {
    data = ["products", "edit"];
  }

  if (pathname.includes("/products/add")) {
    data = ["products", "add"];
  }

  if (pathname === "/about") {
    data = ["about"];
  }
  if (pathname === "/cart") {
    data = ["product", "cart"];
  }

  if (pathname.includes("/products/edit")) {
    data = ["products", "edit"];
  }

  return data;
};

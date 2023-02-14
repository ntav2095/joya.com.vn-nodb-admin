import { useMemo } from "react";
import { placeholder } from "../assets/images/index";

export default function useLazyLoading() {
  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entry) =>
          entry.forEach((item) => {
            if (item.isIntersecting) {
              const loadingimage = (img) => {
                const lazzy = img.getAttribute("lazy");
                if (lazzy) {
                  img.setAttribute("src", lazzy);
                  img.removeAttribute("lazy");
                }
              };
              loadingimage(item.target);
              observer.unobserve(item.target);
            }
          }),
        {
          rootMargin: "50px",
        }
      ),
    []
  );

  function lazzy() {
    const image = document.querySelectorAll("img[lazy]");
    image.forEach((item) => {
      observer.observe(item);
    });
  }
  return [
    () => {
      lazzy();
    },
  ];
}

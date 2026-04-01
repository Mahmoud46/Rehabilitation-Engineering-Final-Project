import { HOME_UI, STATIC_DATA } from "../ui/home.js";

export function ActivateFeaturePopWindow(img_url, feature_title) {
  HOME_UI.features_pop.querySelector("img").src = img_url;
  HOME_UI.features_pop.querySelector("h1").innerText = feature_title;
  HOME_UI.features_pop.querySelector("p").innerText =
    STATIC_DATA.content[feature_title];

  HOME_UI.features_pop.classList.add("active");
}

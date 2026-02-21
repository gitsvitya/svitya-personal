import moexLogo from "../images/moex_logo.png";
import lukoilLogo from "../images/lukoil_logo.png";
import kalashnikovlLogo from "../images/kalashnikov_logo.png";
import reutersLogo from "../images/reuters_logo.png";
import mappngoLogo from "../images/mappngoLogo_black.png";
import veniviLogo from "../images/veniviLogo.png";
import strokeOffLabel from "../images/stroke_off_label.png";
import svityaComLabel from "../images/svitya_com_label.png";
import mbcLogo from "../images/mbc_logo.png";
import ciLogo from "../images/ci_logo.png";

function resolveImageSrc(image) {
  if (typeof image === "string") return image;
  return image?.src || "";
}

// Карта соответствия ключей компаний и путей к логотипам.
export const logos = {
  // Work
  CI: resolveImageSrc(ciLogo),
  NTB: resolveImageSrc(moexLogo),
  LRNPT: resolveImageSrc(lukoilLogo),
  KG: resolveImageSrc(kalashnikovlLogo),
  TR: resolveImageSrc(reutersLogo),
  // Projects
  MBC: resolveImageSrc(mbcLogo),
  MNG: resolveImageSrc(mappngoLogo),
  VNV: resolveImageSrc(veniviLogo),
  // Activities
  SKO: resolveImageSrc(strokeOffLabel),
  SDC: resolveImageSrc(svityaComLabel),
};

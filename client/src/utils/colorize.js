import { colors } from "../constants/colors";
import { transparentize } from "./transparentize";

export const colorize = (opaque, theme) => {
  const colorsSet = colors[theme];

  return (ctx) => {
    const v = ctx.parsed.y;

    let c;
    if (v <= 2) c = colorsSet[0].color;
    else if (v <= 4) c = colorsSet[1].color;
    else if (v <= 6) c = colorsSet[2].color;
    else if (v <= 8) c = colorsSet[3].color;
    else c = colorsSet[4].color;

    return opaque ? c : transparentize(c, 0.4);
  };
};

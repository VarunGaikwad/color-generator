import { useCallback, useEffect, useState } from "react";
import ColorCell from "./components/ColorCell";
import Popup from "./components/Popup";

let timeout;
export default function App() {
  const onGenerateColorPaletteClick = () => {
      setPalette(onGenerateColorPalette());
    },
    onGenerateColorPalette = useCallback(() => {
      const newPalette = [],
        baseHue = Math.floor(Math.random() * 360);

      for (let i = 0; i < 5; i++) {
        const hue = (baseHue + i * 30) % 360,
          saturation = 60 + Math.random() * 20,
          lightness = 50 + Math.random() * 10,
          [r, g, b] = _hslToRgb(hue, saturation, lightness),
          hexColor = _rgbToHex(r, g, b);
        newPalette.push({ color: hexColor, id: i + 1 });
      }
      return [...newPalette];
    }, []),
    _hslToRgb = (h, s, l) => {
      s /= 100;
      l /= 100;

      const k = (n) => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = (n) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

      return [
        Math.round(f(0) * 255),
        Math.round(f(8) * 255),
        Math.round(f(4) * 255),
      ];
    },
    _rgbToHex = (r, g, b) =>
      `#${((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .toUpperCase()}`,
    [palette, setPalette] = useState(onGenerateColorPalette()),
    blendColors = (hexCodes) => {
      if (hexCodes.length === 0) return "#000000";

      function hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
      }

      function rgbToHex(r, g, b) {
        const toHex = (c) => c.toString(16).padStart(2, "0");
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      }

      let totalR = 0,
        totalG = 0,
        totalB = 0;

      hexCodes.forEach((hex) => {
        const { r, g, b } = hexToRgb(hex);
        totalR += r;
        totalG += g;
        totalB += b;
      });

      const numColors = hexCodes.length;
      const avgR = Math.round(totalR / numColors);
      const avgG = Math.round(totalG / numColors);
      const avgB = Math.round(totalB / numColors);

      return rgbToHex(avgR, avgG, avgB);
    },
    [copiedColor, setCopiedColor] = useState(""),
    [isPopVisible, setIsPopVisible] = useState(false),
    onCellClick = (color) => {
      if (timeout) clearTimeout(timeout);

      navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setIsPopVisible(true);
      timeout = setTimeout(() => {
        setIsPopVisible(false);
      }, 1000);
    };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setIsPopVisible(false);
      if (e.key === " ") setPalette(onGenerateColorPalette());
    });
  }, [onGenerateColorPalette]);

  return (
    <div className="grid min-h-screen w-screen place-content-center text-center bg-neutral-300">
      <div>
        {isPopVisible && <Popup colorCode={copiedColor} />}
        <span className="text-3xl font-bold capitalize">
          Color palette generator
        </span>
        <div className="flex flex-wrap gap-4 md:gap-10 justify-center mt-5">
          {palette.map((color) => (
            <ColorCell
              key={color.id}
              color={color.color}
              onCellClick={onCellClick}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={onGenerateColorPaletteClick}
            className="mt-5 px-20 text-stone-50 font-bold py-4 rounded opacity-80 hover:opacity-100 transition-all duration-300 hover:rounded-3xl hover:scale-110"
            style={{
              backgroundColor: `${blendColors(
                palette.map((color) => color.color)
              )}`,
            }}
          >
            Generate Palette
          </button>
          <span>
            Or just press the <q>Spacebar</q>
            to generate new palette.
          </span>
        </div>
      </div>
    </div>
  );
}

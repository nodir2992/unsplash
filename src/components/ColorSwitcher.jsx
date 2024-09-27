//  UTILS
import { joinClassNames } from "../utils/classnames";
//  CUSTOM HOOKS
import { useGlobalContext } from "../hooks/useGlobalContext";

function ColorSwitcher() {
  const context = useGlobalContext();
  const { colors, selectedColor, dispatch } = context;

  const handleChangeColor = (color) => {
    dispatch({ type: "CHANGE_SELECTED_COLOR", payload: color });
  };

  return (
    <div className="flex space-x-2 my-5 justify-end">
      {colors &&
        colors.map((color) => {
          return (
            <div
              key={color}
              className={joinClassNames(
                "w-5 h-5 rounded-full cursor-pointer border-2 hover:border-transparent",
                color,
                color != selectedColor ? "border-white" : "border-transparent"
              )}
              onClick={() => handleChangeColor(color)}
            />
          );
        })}
    </div>
  );
}

export default ColorSwitcher;

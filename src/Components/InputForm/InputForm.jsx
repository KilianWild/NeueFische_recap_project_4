import "./InputForm.css";
import { defaultColor } from "../../lib/colors";

export default function InputForm({
   customColors,
   setCustomColor,
   formType,
   setShowColorEdit,
   currentColor,
   contrasCheckInProgress,
   setContrasCheckInProgress,
}) {
   const lastArrayIndex = customColors.length;

   if (currentColor == undefined || currentColor == null) currentColor = defaultColor;

   return (
      <form
         className="inputForm"
         onSubmit={(event) => {
            async function checkColorContrast(colorToCheck, colorArray) {
               setContrasCheckInProgress(true);
               function hexColorToDigitOnly(hexCode) {
                  return hexCode.slice(1);
               }

               let colorCheckReult = "";
               try {
                  const response = await fetch(
                     `https://webaim.org/resources/contrastchecker/?fcolor=${hexColorToDigitOnly(colorToCheck.hex)}&bcolor=${hexColorToDigitOnly(colorToCheck.contrastText)}&api`,
                  );

                  if (!response.ok) {
                     throw new Error(`Request failed: ${response.status}`);
                  }

                  colorCheckReult = await response.json();
                  if (formType == "Update Color") console.log("Update: colorCheckReult ", colorCheckReult);
               } catch (error) {
                  console.error("Error sending data:", error);
               }

               const newColorsArray = colorArray.map((color) => {
                  if (color.id === colorToCheck.id) {
                     console.log("In map change loop");
                     return {
                        ...color,
                        colorsCheck:
                           "ratio: " +
                           colorCheckReult.ratio +
                           " - " +
                           "AA: " +
                           colorCheckReult.AA +
                           " " +
                           "AAA: " +
                           colorCheckReult.AAA,
                     };
                  }
                  return color;
               });
               setCustomColor(newColorsArray);
               setContrasCheckInProgress(false);
            }

            if (!contrasCheckInProgress) {
               const newColor = {
                  id: "c" + (Number(lastArrayIndex) + 1),
                  role: event.target.elements.inputRole.value,
                  hex: event.target.elements.inputHexColor.value,
                  contrastText: event.target.elements.inputContrastColor.value,
               };
               event.preventDefault();

               let newColorArray;
               if (formType == "New Color") {
                  newColorArray = [newColor, ...customColors];
                  setCustomColor(newColorArray);
                  checkColorContrast(newColor, newColorArray);
               } else if (formType == "Update Color") {
                  newColorArray = customColors.map((color) => {
                     if (color.id === currentColor.id) {
                        return { ...color, hex: newColor.hex, role: newColor.role, contrastText: newColor.contrastText };
                     }
                     return color;
                  });
                  const updatedColor = {
                     ...currentColor,
                     hex: newColor.hex,
                     role: newColor.role,
                     contrastText: newColor.contrastText,
                  };

                  setCustomColor(newColorArray);
                  checkColorContrast(updatedColor, newColorArray);
                  setShowColorEdit(false);
               }
            }
         }}
      >
         <label htmlFor="inputRole">Role: </label>

         <input id="inputRole" name="inputRole" className="inputField" type="text" defaultValue={currentColor.role} />
         <label htmlFor="inputHexColor">Hex: </label>
         <div>
            <input
               id="inputHexColor"
               name="inputHexColor"
               className="inputField"
               type="text"
               defaultValue={currentColor.hex}
               onChange={(event) => {
                  const parent = event.currentTarget.parentElement;
                  const hexInput = parent.querySelector(".inputField__ColorPicker");
                  hexInput.value = event.target.value;
               }}
            />
            <input
               type="color"
               defaultValue={currentColor.hex}
               name="inputHexColorPicker"
               className="inputField__ColorPicker"
               onChange={(event) => {
                  const parent = event.currentTarget.parentElement;
                  const hexInput = parent.querySelector(".inputField");
                  hexInput.value = event.target.value;
               }}
            />
         </div>

         <label htmlFor="inputContrastColor">Contrast Color: </label>
         <div>
            <input
               id="inputContrastColor"
               name="inputContrastColor"
               className="inputField"
               type="text"
               defaultValue={currentColor.contrastText}
               onChange={(event) => {
                  const parent = event.currentTarget.parentElement;
                  const hexInput = parent.querySelector(".inputField__ColorPicker");
                  hexInput.value = event.target.value;
               }}
            />
            <input
               type="color"
               defaultValue={currentColor.contrastText}
               name="inputContrastColorPicker"
               className="inputField__ColorPicker"
               onChange={(event) => {
                  const parent = event.currentTarget.parentElement;
                  const hexInput = parent.querySelector(".inputField");
                  hexInput.value = event.target.value;
               }}
            />
         </div>

         {formType == "New Color" && !contrasCheckInProgress && (
            <button type="submit" className="input__addColorButton">
               ADD COLOR
            </button>
         )}
         {formType == "Update Color" && !contrasCheckInProgress && (
            <button type="submit" className="input__addColorButton">
               UPDATE COLOR
            </button>
         )}
         {contrasCheckInProgress && (
            <button type="button" className="input__addColorButton">
               WAIT FOR COLORCHECK
            </button>
         )}
      </form>
   );
}

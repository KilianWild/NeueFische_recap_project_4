import "./InputForm.css";
import ColorInput from "../ColorInput/ColorInput";

export default function InputForm({
   customColors,
   setCustomColor,
   formType,
   setShowColorEdit,
   currentColor,
   stateColorCheck,
   setStateColorCheck,
}) {
   const lastArrayIndex = customColors.length;

   return (
      <form
         className="inputForm"
         onSubmit={(event) => {
            const newColor = {
               id: "c" + (Number(lastArrayIndex) + 1),
               role: event.target.elements.inputRole.value,
               hex: event.target.elements.inputHexColor.value,
               contrastText: event.target.elements.inputContrastColor.value,
            };
            event.preventDefault();

            async function postFetch(colorToCheck) {
               const response = await fetch("https://www.aremycolorsaccessible.com/api/are-they", {
                  method: "POST",
                  body: JSON.stringify({ colors: [colorToCheck.hex, colorToCheck.contrastText] }),
                  headers: {
                     "Content-Type": "application/json",
                  },
               });
               const colorCheckReult = await response.json();
               console.log("colorCheckReult", colorCheckReult);
               //colorToCheck.setCustomColor(newColorArray);

               return response;
            }

            if (formType == "New Color") {
               setCustomColor([newColor, ...customColors]);
            } else if (formType == "Update Color") {
               const newColorArray = customColors.map((color) => {
                  if (color.id === currentColor.id) {
                     return { ...color, hex: newColor.hex, role: newColor.role, contrastText: newColor.contrastText };
                  }
                  return color;
               });
               setCustomColor(newColorArray);
               setShowColorEdit(false);
            }

            console.log(postFetch(newColor));
         }}
      >
         <label htmlFor="inputRole">Role: </label>

         <input id="inputRole" name="inputRole" className="inputField" type="text" defaultValue="some color" />
         <label htmlFor="inputHexColor">Hex: </label>
         <div>
            <input id="inputHexColor" name="inputHexColor" className="inputField" type="text" defaultValue="#123456" />
            <input
               type="color"
               defaultValue="#123456"
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
            <input id="inputContrastColor" name="inputContrastColor" className="inputField" type="text" defaultValue="#ffffff" />
            <input
               type="color"
               defaultValue="#ffffff"
               name="inputContrastColorPicker"
               className="inputField__ColorPicker"
               onChange={(event) => {
                  const parent = event.currentTarget.parentElement;
                  const hexInput = parent.querySelector(".inputField");
                  hexInput.value = event.target.value;
               }}
            />
         </div>
         {formType == "New Color" && (
            <button type="submit" className="input__addColorButton">
               ADD COLOR
            </button>
         )}
         {formType == "Update Color" && (
            <button type="submit" className="input__addColorButton">
               UPDATE COLOR
            </button>
         )}
      </form>
   );
}

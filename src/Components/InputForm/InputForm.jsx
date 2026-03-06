import "./InputForm.css";

export default function InputForm({ customColors }) {
   /*  const customColor = {
      id: "",
      role: "",
      hex: "",
      contrastText: "",
   };*/
   const lastArrayIndex = customColors.length;

   return (
      <form
         className="inputForm"
         onSubmit={(event) => {
            event.preventDefault();

            customColors.push({
               id: "c" + (Number(lastArrayIndex) + 1),
               role: event.target.elements.inputRole.value,
               hex: event.target.elements.inputHexColor.value,
               contrastText: event.target.elements.inputContrastColor.value,
            });
            customColors.role = event.target.elements.inputRole.value;
            customColors.hex = event.target.elements.inputHexColor.value;
            customColors.contrastText = event.target.elements.inputContrastColor.value;
            console.log(customColors);
         }}
      >
         <label htmlFor="inputRole">Role: </label>
         <input id="inputRole" name="inputRole" className="inputField" type="text" />
         <label htmlFor="inputHexColor">Hex: </label>
         <input id="inputHexColor" name="inputHexColor" className="inputField" type="text" />
         <label htmlFor="inputContrastColor">Contrast Color: </label>
         <input id="inputContrastColor" name="inputContrastColor" className="inputField" type="text" />
         <button type="submit">ADD COLOR</button>
      </form>
   );
}

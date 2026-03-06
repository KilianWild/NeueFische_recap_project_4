import "./InputForm.css";

export default function InputForm({}) {
   const customColor = {
      id: "",
      role: "",
      hex: "",
      contrastText: "",
   };
   return (
      <form
         className="inputForm"
         onSubmit={(event) => {
            event.preventDefault();

            customColor.role = event.target.elements.inputRole.value;
            customColor.hex = event.target.elements.inputHexColor.value;
            customColor.contrastText = event.target.elements.inputContrastColor.value;
            console.log(customColor);
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

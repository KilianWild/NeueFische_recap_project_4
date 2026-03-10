export default function ColorInput() {
   return (
      <>
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
      </>
   );
}

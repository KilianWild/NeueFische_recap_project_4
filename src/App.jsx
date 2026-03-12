import { initialColors, customColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import CreateCard from "./Components/CreateCard/CreateCard";
import InputForm from "./Components/InputForm/InputForm";
import { useEffect } from "react";

import useLocalStorageState from "use-local-storage-state";

console.log("customColors ", customColors);

function App() {
   const fetchCue = [];

   const [stateCustomColors, setStateCustomColors] = useLocalStorageState("CustomColors", {
      defaultValue: [],
   });
   const [stateInitialColors, setStateInitialColors] = useLocalStorageState("InitialColors", {
      defaultValue: [],
   });
   const [stateColorCheck, setStateColorCheck] = useLocalStorageState("ColorCheck", {
      defaultValue: [],
   });

   useEffect(() => {
      setStateCustomColors([]);
      setStateInitialColors(initialColors);

      async function checkColorContrast(colorToCheck) {
         /*const response = await fetch("https://www.aremycolorsaccessible.com/api/are-they", {
                  method: "POST",
                  body: JSON.stringify({ colors: [colorToCheck.hex, colorToCheck.contrastText] }),
                  headers: {
                     "Content-Type": "application/json",
                  },
               });
*/

         function hexColorToDigitOnly(hexCode) {
            return hexCode.slice(1);
         }

         const response = await fetch(
            `https://webaim.org/resources/contrastchecker/?fcolor=${hexColorToDigitOnly(colorToCheck.hex)}&bcolor=${hexColorToDigitOnly(colorToCheck.contrastText)}&api`,
         );
         const colorCheckReult = await response.json();

         setStateInitialColors((prev) =>
            prev.map((color) =>
               color.id === colorToCheck.id
                  ? {
                       ...color,
                       colorsCheck:
                          "ratio: " + colorCheckReult.ratio + " - " + "AA: " + colorCheckReult.AA + " - " + "AAA: " + colorCheckReult.AAA,
                    }
                  : color,
            ),
         );
      }

      async function checkMutlibleColors(colorArray) {
         for (let i = 0; i < stateInitialColors.length; i++) {
            await checkColorContrast(colorArray[i], colorArray);
         }
      }

      checkMutlibleColors(stateInitialColors);
   }, []);

   return (
      <>
         <h1>Theme Creator</h1>

         <InputForm
            customColors={stateCustomColors}
            setCustomColor={setStateCustomColors}
            formType="New Color"
            stateColorCheck={stateColorCheck}
            setStateColorCheck={setStateColorCheck}
         />

         {stateCustomColors.map((color, index) => {
            return (
               <CreateCard
                  key={color.id}
                  colorsObject={color}
                  colorsObjectIndex={index}
                  colorsArray={stateCustomColors}
                  setCustomColor={setStateCustomColors}
                  stateColorCheck={stateColorCheck}
                  setStateColorCheck={setStateColorCheck}
               />
            );
         })}

         {stateInitialColors.map((color, index) => {
            return (
               <CreateCard
                  key={color.id}
                  colorsObject={color}
                  colorsObjectIndex={index}
                  colorsArray={stateInitialColors}
                  setCustomColor={setStateInitialColors}
                  stateColorCheck={stateColorCheck}
                  setStateColorCheck={setStateColorCheck}
               />
            );
         })}
      </>
   );
}
export default App;

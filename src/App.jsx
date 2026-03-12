import { initialColors } from "./lib/colors";
import "./App.css";
import CreateCard from "./Components/CreateCard/CreateCard";
import InputForm from "./Components/InputForm/InputForm";
import { useEffect, useState } from "react";

import useLocalStorageState from "use-local-storage-state";

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

   const [stateContrasCheckInProgress, setStateContrasCheckInProgress] = useState(false);

   useEffect(() => {
      setStateCustomColors([]);
      setStateInitialColors(initialColors);

      async function checkColorContrast(colorToCheck) {
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
         } catch (error) {
            console.error("Error sending data:", error);
         }

         setStateInitialColors((prev) =>
            prev.map((color) =>
               color.id === colorToCheck.id
                  ? {
                       ...color,
                       colorsCheck:
                          "ratio: " +
                          colorCheckReult.ratio +
                          " - " +
                          "AA: " +
                          colorCheckReult.AA +
                          " - " +
                          "AAA: " +
                          colorCheckReult.AAA,
                    }
                  : color,
            ),
         );
      }

      async function checkMutlibleColors(colorArray) {
         setStateContrasCheckInProgress(true);
         for (let i = 0; i < stateInitialColors.length; i++) {
            await checkColorContrast(colorArray[i], colorArray);
         }

         setStateContrasCheckInProgress(false);
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
            contrasCheckInProgress={stateContrasCheckInProgress}
            setContrasCheckInProgress={setStateContrasCheckInProgress}
         />

         {stateCustomColors.map((color) => {
            return (
               <CreateCard
                  key={color.id}
                  colorsObject={color}
                  colorsArray={stateCustomColors}
                  setCustomColor={setStateCustomColors}
                  contrasCheckInProgress={stateContrasCheckInProgress}
                  setContrasCheckInProgress={setStateContrasCheckInProgress}
               />
            );
         })}

         {stateInitialColors.map((color) => {
            return (
               <CreateCard
                  key={color.id}
                  colorsObject={color}
                  colorsArray={stateInitialColors}
                  setCustomColor={setStateInitialColors}
                  contrasCheckInProgress={stateContrasCheckInProgress}
                  setContrasCheckInProgress={setStateContrasCheckInProgress}
               />
            );
         })}
      </>
   );
}
export default App;

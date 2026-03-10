import { initialColors, customColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import CreateCard from "./Components/CreateCard/CreateCard";
import InputForm from "./Components/InputForm/InputForm";
import { useEffect, useState } from "react";

import useLocalStorageState from "use-local-storage-state";

console.log("customColors ", customColors);

function App() {
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
      setStateInitialColors(initialColors);
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

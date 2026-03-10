import { useEffect, useState } from "react";
import ColorInput from "../ColorInput/ColorInput";
import InputForm from "../../Components/InputForm/InputForm";

export default function CreateCard({ colorsObject, colorsArray, setCustomColor, stateColorCheck, setStateColorCheck }) {
   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
   const [showColorEdit, setShowColorEdit] = useState(false);
   const [showColorCopied, setShowColorCopied] = useState(false);

   async function writeClipboardText(text) {
      try {
         await navigator.clipboard.writeText(text);
      } catch (error) {
         console.error(error.message);
      }
   }

   useEffect(() => {
      let timer;
      if (showColorCopied) {
         timer = setTimeout(() => {
            setShowColorCopied(false);
         }, 3000);
      }

      return () => clearTimeout(timer);
   }, [showColorCopied]);
   return (
      <section className="color-card" style={{ backgroundColor: colorsObject.hex }}>
         <p className="color-card-headline">{colorsObject.hex}</p>
         {!showColorCopied && (
            <button
               onClick={() => {
                  writeClipboardText(colorsObject.hex);
                  setShowColorCopied(true);
               }}
            >
               COPY
            </button>
         )}
         {showColorCopied && <button>SUCCESSFULLY COPIED</button>}
         <p className="color-card-hex">{colorsObject.role}</p>
         <p>{colorsObject.contrastText}</p>
         {!showDeleteConfirmation && !showColorEdit && (
            <>
               <button
                  onClick={() => {
                     setShowDeleteConfirmation(true);
                  }}
               >
                  DELETE
               </button>

               <button
                  onClick={() => {
                     setShowColorEdit(true);
                  }}
               >
                  EDIT
               </button>
            </>
         )}
         {showColorEdit && (
            <>
               <InputForm
                  formType="Update Color"
                  setShowColorEdit={setShowColorEdit}
                  currentColor={colorsObject}
                  customColors={colorsArray}
                  setCustomColor={setCustomColor}
               />

               <button
                  onClick={() => {
                     setShowColorEdit(false);
                  }}
               >
                  CANCEL
               </button>
            </>
         )}
         {showDeleteConfirmation && (
            <>
               <span>Are you sure?</span>
               <button
                  onClick={() => {
                     setShowDeleteConfirmation(false);
                  }}
               >
                  CANCEL
               </button>
               <button
                  onClick={() => {
                     const newColorArray = colorsArray.filter((color) => color.id !== colorsObject.id);
                     setCustomColor(newColorArray);
                     setShowDeleteConfirmation(false);
                  }}
               >
                  DELETE
               </button>
            </>
         )}
      </section>
   );
}

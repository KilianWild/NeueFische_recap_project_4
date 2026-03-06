import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import CreateCard from "./Components/CreateCard/CreateCard";
import InputForm from "./Components/InputForm/InputForm";

function App() {
   return (
      <>
         <h1>Theme Creator</h1>

         <InputForm />

         {initialColors.map((color, index) => {
            console.log("initialColors", initialColors);
            console.log("index", index);
            return <CreateCard key={initialColors.id} colorsObject={initialColors} colorsObjectIndex={index} />;
         })}
      </>
   );
}
export default App;

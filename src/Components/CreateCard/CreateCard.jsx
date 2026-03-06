export default function CreateCard({ colorsObject, colorsObjectIndex }) {
   console.log("colorsObject[colorsObjectIndex]", colorsObject[colorsObjectIndex]);
   return (
      <section className="color-card" style={{ backgroundColor: colorsObject[colorsObjectIndex].hex }}>
         <p className="color-card-headline">{colorsObject[colorsObjectIndex].hex}</p>
         <p className="color-card-hex">{colorsObject[colorsObjectIndex].role}</p>
         <p>{colorsObject[colorsObjectIndex].contrastText}</p>
      </section>
   );
}

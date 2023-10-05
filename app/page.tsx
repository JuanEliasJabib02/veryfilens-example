"use client";
import { useState } from "react";
import EditScreen from "./_screens/EditScreen";
import LensScreen from "./_screens/LensScreen";

export default function Home() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  console.log("img", image);

  const [text, setText] = useState("TEXTO DE PRUEBA 1");

  const testClick = () => {
    setText("texto de prueba 2");
  };

  return (
    <main>
      {/*       {isEditing ? (
        <EditScreen image={image} setIsEditing={setIsEditing} />
      ) : (
        <LensScreen setImage={setImage} setIsEditing={setIsEditing} />
      )} */}
      <button className="bg-red-800 p-5" onClick={testClick}>
        CLICKEAME
      </button>
      {text} ---- FROM NEXTJS
    </main>
  );
}

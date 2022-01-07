import butterfly from "./img/butterfly.png";
import longFlower from "./img/long-flower.png";
import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [shiftAside, setShiftAside] = useState(0);
  const [shiftDown, setShiftDown] = useState(15);
  const [vertical, setVertical] = useState(250);
  const [horizontal, setHorizontal] = useState(0);
  const [fadeAway, setFadeAway] = useState(1);

  const timeFrame = 12;

  /* -------------------- BUTTERFLY FLUTTERING -------------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      moveSprite();
    }, timeFrame); //12
    return () => clearInterval(interval);
  });

  const moveSprite = () => {
    shiftAside > -542 ? setShiftAside(shiftAside - 62) : setShiftAside(16);
  };

  /* -------------------- BUTTERFLY LOSING COLOR -------------------- */
  useEffect(() => {
    fading();
  }, [horizontal, vertical]);

  const fading = () => {
    setFadeAway(fadeAway - 0.005);
  };

  useEffect(() => {
    if (horizontal > -560 && horizontal < -536 && vertical > 426 && vertical < 448) {
      unfading();
    }
  })

  const unfading = () => {
    setFadeAway(1.5);
  }

  /* -------------------- BUTTERFLY CONTROL -------------------- */
  window.onkeydown = moveButterfly;

  function moveButterfly(e) {
    e = e || window.event;

    if (e.keyCode === 38) {//up
      fadeAway <= 0 ? setVertical(vertical - 2) : setVertical(vertical - 6);
    } else if (e.keyCode === 40) {//down
      fadeAway <= 0 ? setVertical(vertical + 2) : setVertical(vertical + 6);
    } else if (e.keyCode === 37) {//left
      setShiftDown(15);
      fadeAway <= 0
        ? setHorizontal(horizontal - 2)
        : setHorizontal(horizontal - 6);
    } else if (e.keyCode === 39) {//right
      fadeAway <= 0
        ? setHorizontal(horizontal + 2)
        : setHorizontal(horizontal + 6);
      setShiftDown(-45);
    }
  }

  // setTimeout(() => {
  //   const flower = document.getElementById("longFlower");
  //   const flowerRect = flower.getBoundingClientRect();
  //   console.log("width", flowerRect.width)
  //   console.log("height", flowerRect.height)
  //   console.log("left", flowerRect.left)
  //   console.log("right", flowerRect.right)
  //   console.log("top", flowerRect.top)
  //   console.log("bottom", flowerRect.bottom)
  //   console.log("x", flowerRect.x)
  //   console.log("y", flowerRect.y)
  // }, 500)

  // function printMousePos(event) {
  //   // console.log(event);
  //  document.body.textContent =
  //  "clientX: " + event.x +
  //  " - clientY: " + event.y;      //COOOOOOL!!!!!
  // }

  // document.addEventListener("click", printMousePos);

  

  /* -------------------- OUTPUT -------------------- */
  return (
    <div className="main">
      {/* <p>horizontal: {horizontal}</p> */}
      {/* <p>vertical: {vertical}</p> */}
      <figure
        style={{
          position: "relative",
          top: `${vertical}px`,
          left: `${horizontal}px`,
          border: `1px rgb(255, 255, 255, ${fadeAway}) solid`,
          borderRadius: "50%",
          width: "70px",
          height: "70px",
          overflow: "hidden",
        }}
      >
        <img
          style={{
            filter: `saturate(${fadeAway})`,
            position: "relative",
            left: `${shiftAside}px`,
            top: `${shiftDown}px`,
            width: "600px",
          }}
          src={butterfly}
          alt="butterfly"
        />
      </figure>
      <figure
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "200px",
          position: "fixed",
          zIndex: "-1",
          left: "0",
          bottom: "-20px",
        }}
      >
        <figcaption
          style={{
            visibility: fadeAway <= 0 ? "visible" : "hidden",
          }}
        >
          {/* <span className="pointer">{element}</span> */}
        </figcaption>
        <img
          id="longFlower"
          src={longFlower}
          alt="pink flower"
          style={{
            width: "100%",
            // outline: "1px black solid",
          }}
        />
      </figure>
    </div>
  );
}

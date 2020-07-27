import React, { useState } from "react";
import * as Ui from "./styles";

export const Content = (props) => {
  const [image, setImage] = useState<any>();
  return (
    <Ui.Content>
      <button
        onClick={async () => {
          const res = await fetch("https://source.unsplash.com/random/800x600");
          setImage(res.url);
        }}
      >
        GENERATE RANDOM IMAGE
      </button>
      <img src={image} alt="random image" />
    </Ui.Content>
  );
};

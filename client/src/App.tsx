import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "./theme";

import * as Ui from "./styles";

export const App = (props) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <MainComponent sidebar={TOOLS}>
          <Content />
        </MainComponent>
      </ThemeProvider>
    </>
  );
};

interface IMainComponentProps {
  header?: React.ReactNode;
  sidebar?: IToolBar;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const MainComponent = (props: IMainComponentProps) => {
  return (
    <>
      <Ui.StyledMainContainer>
        <Ui.StyledHeader> {props.header || "HEADER FILLER"}</Ui.StyledHeader>
        <Ui.StyledSiderbar>
          {props.sidebar?.tools.map((tool) => (
            <Tool name={tool.name} children={tool.children} expanded={true} />
          )) || "SIDEBAR FILLER"}
        </Ui.StyledSiderbar>
        <Ui.StyledContent>
          {props.children || "CONTENT FILLER"}
        </Ui.StyledContent>
        <Ui.StyledFooter> {props.header || "FOOTER FILLER"}</Ui.StyledFooter>
      </Ui.StyledMainContainer>
    </>
  );
};

type TTransitionStates = "entering" | "entered" | "exiting" | "exited";

interface ITool {
  name: string;
  children?: ITool[];
}

interface IToolBar {
  tools: ITool[];
}

const TOOLS: IToolBar = {
  tools: [
    {
      name: "file",
      children: [
        { name: "new file" },
        { name: "save" },
        { name: "save as" },
        { name: "exit" },
      ],
    },
    {
      name: "edit",
      children: [
        { name: "undo" },
        { name: "redo" },
        { name: "cut" },
        { name: "copy" },
        { name: "paste" },
      ],
    },
    {
      name: "view",
      children: [
        { name: "appearance" },
        { name: "search" },
        { name: "run" },
        { name: "filter" },
      ],
    },
  ],
};

const Tool = (props: ITool & { expanded: boolean }) => {
  const [expanded, setExpanded] = useState<boolean>(props.expanded);

  return (
    <Ui.StyledToolContainer>
      <Ui.StyledTool
        expanded={props.expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <Arrow
          direction={expanded ? "down" : "right"}
          visibility={props.children ? "visible" : "hidden"}
        />
        <div>{props.name}</div>
      </Ui.StyledTool>

      {props.children?.map((child) => (
        <Tool name={child.name} children={child.children} expanded={expanded} />
      ))}
    </Ui.StyledToolContainer>
  );
};

const Arrow = (props: {
  direction: "left" | "down" | "right" | "up";
  visibility: "visible" | "hidden";
}) => {
  return (
    <Ui.StyledArrow
      rotate={ROTATIONS[props.direction]}
      visibility={props.visibility}
    ></Ui.StyledArrow>
  );
};

const ROTATIONS = {
  up: "270",
  left: "180",
  down: "90",
  right: "0",
};

const Content = (props) => {
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

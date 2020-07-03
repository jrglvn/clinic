import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "./theme";
import { ReactComponent as RightArrow } from "./assets/icons/arrow_right.svg";
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

const StyledMainContainer = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-columns: 200px auto;
  grid-template-rows: 40px auto 40px;
  grid-gap: 2px;
  * {
    background-color: ${(props) => props.theme.colors.white};
  }
  color: black;
`;

const StyledHeader = styled.div`
  grid-column: span 2;
`;
const StyledFooter = styled.div`
  grid-column: span 2;
`;
const StyledSiderbar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0.5rem 0;
`;

const StyledContent = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

interface IMainComponentProps {
  header?: React.ReactNode;
  sidebar?: IToolBar;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const MainComponent = (props: IMainComponentProps) => {
  return (
    <>
      <StyledMainContainer>
        <StyledHeader> {props.header || "HEADER FILLER"}</StyledHeader>
        <StyledSiderbar>
          {props.sidebar?.tools.map((tool) => (
            <Tool name={tool.name} children={tool.children} expanded={true} />
          )) || "SIDEBAR FILLER"}
        </StyledSiderbar>
        <StyledContent>{props.children || "CONTENT FILLER"}</StyledContent>
        <StyledFooter> {props.header || "FOOTER FILLER"}</StyledFooter>
      </StyledMainContainer>
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
    <StyledToolContainer>
      <StyledTool
        expanded={props.expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <Arrow
          direction={expanded ? "down" : "right"}
          visibility={props.children ? "visible" : "hidden"}
        />
        <div>{props.name}</div>
      </StyledTool>

      {props.children?.map((child) => (
        <Tool name={child.name} children={child.children} expanded={expanded} />
      ))}
    </StyledToolContainer>
  );
};

const StyledToolContainer = styled.div<{}>`
  padding-left: 0.5rem;
  overflow: hidden;
`;
const transitionStyles = {
  entering: { height: 0 },
  entered: { height: "100%" },
  exiting: { height: "100%" },
  exited: { height: 0 },
};

const StyledTool = styled.div<{ expanded: boolean }>`
  display: flex;
  align-items: center;
  height: ${(props) => (props.expanded ? "20px" : "0px")};
  user-select: none;
  cursor: pointer;
  transition: all 0.2s;
  & > * {
    margin: 0 0.125rem;
  }
`;

const StyledArrow = styled(RightArrow)<{ rotate: string; visibility: string }>`
  width: 0.5rem;
  height: 0.5rem;
  fill: ${(props) => props.theme.colors.green};
  transform: rotate(${(props) => props.rotate}deg);
  visibility: ${(props) => props.visibility};
  transition: all 0.2s;
`;

const Arrow = (props: {
  direction: "left" | "down" | "right" | "up";
  visibility: "visible" | "hidden";
}) => {
  return (
    <StyledArrow
      rotate={ROTATIONS[props.direction]}
      visibility={props.visibility}
    ></StyledArrow>
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

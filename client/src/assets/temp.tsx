import React, { useState } from "react";
// import * as Ui from "../components/common/styles";
// interface ITool {
//   name: string;
//   children?: ITool[];
// }

// interface IToolBar {
//   tools: ITool[];
// }

// const TOOLS: IToolBar = {
//   tools: [
//     {
//       name: "file",
//       children: [
//         { name: "new file" },
//         { name: "save" },
//         { name: "save as" },
//         { name: "exit" },
//       ],
//     },
//     {
//       name: "edit",
//       children: [
//         { name: "undo" },
//         { name: "redo" },
//         { name: "cut" },
//         { name: "copy" },
//         { name: "paste" },
//       ],
//     },
//     {
//       name: "view",
//       children: [
//         { name: "appearance" },
//         { name: "search" },
//         { name: "run" },
//         { name: "filter" },
//       ],
//     },
//   ],
// };

// const Tool = (props: ITool & { expanded: boolean }) => {
//   const [expanded, setExpanded] = useState<boolean>(props.expanded);

//   return (
//     <Ui.StyledToolContainer>
//       <Ui.StyledTool
//         expanded={props.expanded}
//         onClick={() => setExpanded(!expanded)}
//       >
//         <Arrow
//           direction={expanded ? "down" : "right"}
//           visibility={props.children ? "visible" : "hidden"}
//         />
//         <div>{props.name}</div>
//       </Ui.StyledTool>

//       {props.children?.map((child) => (
//         <Tool name={child.name} children={child.children} expanded={expanded} />
//       ))}
//     </Ui.StyledToolContainer>
//   );
// };

// const Arrow = (props: {
//   direction: "left" | "down" | "right" | "up";
//   visibility: "visible" | "hidden";
// }) => {
//   return (
//     <Ui.StyledArrow
//       rotate={ROTATIONS[props.direction]}
//       visibility={props.visibility}
//     ></Ui.StyledArrow>
//   );
// };

// const ROTATIONS = {
//   up: "270",
//   left: "180",
//   down: "90",
//   right: "0",
// };

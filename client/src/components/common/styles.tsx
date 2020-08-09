import styled from "styled-components";
import { ReactComponent as RightArrow } from "../../assets/icons/arrow_right.svg";
import { Form as FormikForm } from "formik";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 0;
    padding: 0;
    border: 0;
    outline: none;
    margin: 1rem;
    background-color: ${(props) => props.theme.colors.green};
    color: white;
    padding: 1rem;
    border-radius: 99px;
    cursor: pointer;
    :hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 4px 0 ${(props) => props.theme.colors.gray};
    }
    transition: 0.1s;
  }

  & img {
  }
`;

export const StyledToolContainer = styled.div<{}>`
  padding-left: 0.5rem;
  overflow: hidden;
`;

export const StyledTool = styled.div<{ expanded: boolean }>`
  display: flex;
  align-items: center;
  height: ${(props) => (props.expanded ? "20px" : "0px")};
  user-select: none;
  cursor: pointer;
  & > * {
    margin: 0 0.125rem;
  }
  :hover {
    transform: translateX(2px);
  }
  transition: all 0.2s;
`;

export const StyledArrow = styled(RightArrow)<{
  rotate: string;
  visibility: string;
}>`
  width: 0.5rem;
  height: 0.5rem;
  fill: ${(props) => props.theme.colors.green};
  transform: rotate(${(props) => props.rotate}deg);
  visibility: ${(props) => props.visibility};
  transition: all 0.2s;
`;

export const MainContainer = styled.div`
  margin: 0 auto;
  display: grid;
  width: 70vw;
  height: 100vh;
  grid-template-columns: 160px auto 160px;
  grid-template-rows: 80px auto 40px;
  grid-gap: 2px;
  background-color: white;
`;

export const HeaderContainer = styled.div`
  grid-column: 1/-1;
  overflow: hidden;
`;
export const FooterContainer = styled.div`
  grid-column: 1/-1;
  overflow: hidden;
`;
export const LeftSidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-shadow: 4px 0 4px 0 lightgray;
  margin-top: 4rem;
  width: 100%;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  & > div {
    padding: 1rem;
    cursor: pointer;
    transition: 0.25s;
  }

  & > div[is-active="true"] {
    background-color: #eee;
    transition: 0.25s;
  }
`;
export const RightSidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 0.5rem;
  box-shadow: -4px 0 4px 0 lightgray;
  width: 100%;
  margin-top: 4rem;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  & div {
    padding: 1rem;
  }
`;

export const ContentContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const Header = styled(FlexColumn)`
  padding: 0.5rem;
`;

export const UsersContainer = styled(FlexColumn)`
  justify-content: start;
  overflow-y: auto;
  padding: 0 0.5rem;
  padding-top: 4rem;
`;
export const UsersGrid = styled.div`
  display: grid;
  width: 80%;
  margin: 0.5rem 0;
  grid-template-columns: repeat(4, 1fr);
  box-shadow: 0 0 4px 0 gray;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 8px 0 ${(props) => props.theme.colors.color5};
  }

  & > div {
    padding: 0.5rem;
  }
  transition: 0.1s;
`;

export const ClientsContainer = styled(FlexColumn)`
  justify-content: start;
  overflow-y: auto;
  padding: 0 0.5rem;
  padding-top: 4rem;
`;

export const NewClient = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 0.5rem 0;
  box-shadow: 0 0 4px 0 gray;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 8px 0 ${(props) => props.theme.colors.color5};
  }

  padding: 0.5rem;

  transition: 0.1s;
`;

export const ClientsGrid = styled.div`
  display: grid;
  width: 80%;
  margin: 0.5rem 0;

  grid-template-columns: repeat(4, 1fr);
  box-shadow: 0 0 4px 0 gray;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 8px 0 ${(props) => props.theme.colors.color5};
  }

  & > div {
    padding: 0.5rem;
  }
  transition: 0.1s;
`;

export const AppointmentsContainer = styled(FlexColumn)`
  justify-content: start;
  overflow-y: auto;
  padding: 0 0.5rem;
  padding-top: 4rem;
`;

export const AppointmentsGrid = styled.div`
  display: grid;
  width: 80%;
  margin: 0.5rem 0;

  grid-template-columns: repeat(5, 1fr);
  box-shadow: 0 0 4px 0 gray;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 8px 0 ${(props) => props.theme.colors.color5};
  }

  & > div {
    padding: 0.5rem;
  }
  transition: 0.1s;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  outline: 0;
  margin: 0;
  padding: 0;
  backdrop-filter: blur(1px);
  cursor: default;
  display: grid;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  width: 400px;
  background: white;
  border: 4px solid ${(props) => props.theme.colors.primary};
`;

export const AppointmentDetails = styled(FlexColumn)``;

export const Form = styled(FormikForm)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  & label:not(:first-child),
  button {
    margin-top: 1rem;
  }
  & input {
    width: 100%;
  }
`;

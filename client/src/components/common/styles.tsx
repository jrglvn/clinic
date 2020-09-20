import styled from "styled-components";
import { ReactComponent as RightArrow } from "../../assets/icons/arrow_right.svg";
import { Form as FormikForm, Field as FormikField } from "formik";

export const Flex = styled.div`
  display: flex;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const MainContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  gap: 0.5rem;
  & > div {
    background: #eee;
    padding: 0.5rem;
  }
`;

export const HeaderContainer = styled.div`
  overflow: hidden;
  grid-area: header;
`;
export const SidebarContainer = styled(FlexColumn)`
  grid-area: sidebar;
  align-items: stretch;
  padding: 0 !important;

  & > div {
    padding: 1rem;
    cursor: pointer;
  }

  & > div[is-active="true"] {
    background-color: #ddd;
  }
  transition: 0.25s;
`;

export const ContentContainer = styled(FlexColumn)`
  grid-area: content;
  overflow-y: auto;
`;
export const FooterContainer = styled.div`
  overflow: hidden;
  grid-area: footer;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const Header = styled(FlexColumn)``;

export const UsersGrid = styled.div`
  display: grid;

  margin: 0.5rem 0;
  grid-template-columns: repeat(4, 1fr) 40px;
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

export const NewItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0.5rem 0;
  box-shadow: 0 0 4px 0 gray;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.bs_primary};
  font-size: 1.25rem;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 8px 0 ${(props) => props.theme.colors.bs_primary};
  }
  padding: 0.5rem;
  transition: 0.2s;
`;

export const ClientsGrid = styled.div`
  display: grid;

  margin: 0.5rem 0;
  grid-template-columns: 1fr 1.5fr 1.5fr 1fr 40px;
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

export const AppointmentsGrid = styled.div`
  display: grid;
  margin: 0.5rem 0;
  grid-template-columns: repeat(5, 1fr) 40px;
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
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  backdrop-filter: blur(1px);
  cursor: default;
  display: flex;
`;

export const ModalContainer = styled.div`
  margin: auto auto;
  width: 400px;
  box-shadow: 0 0 20px 2px ${(props) => props.theme.colors.bs_primary};
  max-height: 90vh;
  overflow-y: auto;
  background: white;
  outline: none;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  background: #eee;
  color: ${(props) => props.theme.colors.bs_danger};
  & > svg {
    cursor: pointer;
  }
`;

export const ModalContent = styled.div``;

export const AppointmentDetails = styled(FlexColumn)``;

export const Form = styled(FormikForm)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  & label:not(:first-child),
  & button {
    margin-top: 1rem;
  }

  & input {
    width: 100%;
  }
`;

export const Field = styled(FormikField)`
  width: 40px;
`;

export const DeleteContainer = styled(Flex)<{ showDeleteIcon: boolean }>`
  transform: ${(props) => (props.showDeleteIcon ? "scale(1)" : "scale(0)")};
  transition: 0.1s;
  color: ${(props) => props.theme.colors.bs_danger};
  margin: 0;
  font-size: 1.25rem;
  transition: 0.2s;
`;

export const Checkbox = styled.label`
  display: flex;
  align-items: center;
  margin: 0.25rem !important;
  & input {
    width: 1rem;
  }
`;

export const MyCheckboxField = styled(FlexColumn)`
  align-items: start;
  margin-top: 1rem;
`;

export const CategoriesGrid = styled.div`
  display: grid;

  margin: 0.5rem 0;
  grid-template-columns: 1fr 40px;
  box-shadow: 0 0 4px 0 gray;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 8px 0 ${(props) => props.theme.colors.bs_inverse};
  }
  & > div {
    padding: 0.5rem;
  }
  transition: 0.1s;
`;

export const Button = styled.button<{ buttonStyle: "new" | "change" }>`
  background: ${(props) =>
    props.buttonStyle === "new" && props.theme.colors.bs_new};
  background: ${(props) =>
    props.buttonStyle === "change" && props.theme.colors.bs_warning};
  color: ${(props) => props.buttonStyle === "change" && "black"};
`;

export const Error = styled.div`
  color: ${(props) => props.theme.colors.bs_danger};
  font-style: italic;
`;

export const WeekInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: stretch;
  grid-gap: 0.5rem;
  & > div {
    border-radius: 4px;

    box-shadow: 0 0 4px 0 gray;
  }

  & div {
    text-align: center;
  }

  & div[is-selected="true"] {
    background: gray;
  }

  user-select: none;
`;

export const WeekSelector = styled(Flex)`
  font-size: 1.25rem;
  box-shadow: 0 0 4px 0 gray;
  border-radius: 4px;
  justify-content: center;

  & > svg {
    cursor: pointer;
    fill: ${(props) => props.theme.colors.bs_primary};
  }

  & > svg:last-child {
    fill: ${(props) => props.theme.colors.bs_primary};
  }

  & > div {
    text-align: center;
  }
  margin: 0.5rem 0;
  padding: 0.5rem;
  user-select: none;
  & * {
    margin: 0 0.5rem;
  }
`;

export const FooterDetails = styled.div<any>`
  width: 60ch;
  max-height: ${(props) => (props.expanded ? "200px" : 0)};
  overflow: hidden;
  transition: all 0.5s;
`;

import styled from "styled-components";
import { ReactComponent as RightArrow } from "../../assets/icons/arrow_right.svg";
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
  width: 60vw;
  height: 100vh;
  grid-template-columns: 200px auto;
  grid-template-rows: 100px auto 100px;
  grid-gap: 2px;
  background-color: white;
  box-shadow: 0 0 8px 0 gray;
`;

export const HeaderContainer = styled.div`
  grid-column: 1/-1;
  overflow: hidden;
`;
export const FooterContainer = styled.div`
  grid-column: 1/-1;
  overflow: hidden;
`;
export const SiderbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
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

export const Header = styled(Flex)`
  padding: 1rem;
`;

export const UsersGrid = styled.div`
  width: 100%;
  display: grid;
  background-color: #eee;
  grid-template-columns: repeat(4, 1fr);
  & > div {
    padding: 1rem 0.5rem;
  }
`;

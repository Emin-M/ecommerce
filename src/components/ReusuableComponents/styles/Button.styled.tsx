import styled from "styled-components";

export const StyledButton = styled.button`
  outline: none;
  border: 1px solid #2dd06e;
  border-radius: 8px;
  width: 156px;
  height: 48px;

  img {
    margin-right: 10px;
  }

  @media (max-width: 350px) {
    width: 106px;
  }
`;

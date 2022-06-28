import styled from "styled-components";

export const AdvertisementContainer = styled.div`
  margin-bottom: 100px;
  margin-top: 64px;

  > div {
    display: flex;
    gap: 32px;
  }

  img {
    width: 554px;
    height: 280px;
    cursor: pointer;
  }

  @media (max-width: 1200px) {
    img {
      width: 467px;
    }
  }

  @media (max-width: 960px) {
    img {
      width: 344px;
      height: 200px;
    }
  }

  @media (max-width: 650px) {
    > div {
      flex-direction: column;
      gap: 24px;
    }

    img {
      width: 100%;
      height: 155px;
    }
  }
`;

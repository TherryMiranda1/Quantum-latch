import { Header } from "@/components/ui";
import { DEVICE_BREAKPOINTS } from "@/constants/devices";
import styled from "styled-components";

interface Props {
  title?: string;
  logo?: string;
  description?: string;
}
export const FooterBrand = ({ title, logo, description }: Props) => {
  return (
    <BrandStyled>
      {logo && <img src={logo} />}
      {title && <Header componentType="h2" text={title} />}
      {description && <p>{description}</p>}
    </BrandStyled>
  );
};

export const FooterBottom = ({ title }: Props) => {
  return (
    <FooterBottomStyled>
      {title} Copyright © 2024. All Rights Reserved.
    </FooterBottomStyled>
  );
};

const BrandStyled = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  flex-wrap: wrap;
  img {
    width: 40px;
  }
  @media screen and (max-width: ${DEVICE_BREAKPOINTS.md}) {
    width: 100%;
  }
`;
  
const FooterBottomStyled = styled.p`
  font-size: 14px;
`;

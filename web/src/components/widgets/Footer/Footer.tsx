import { DEVICE_BREAKPOINTS } from "@/constants/devices";
import { Link } from "@tanstack/react-router";
import styled from "styled-components";

interface FooterLink {
  title: string;
  url: string;
}

interface Props {
  links: FooterLink[];
  footerCTA?: React.ReactNode;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
}

export const Footer = ({
  links,
  topContent,
  bottomContent,
  footerCTA,
}: Props) => {
  return (
    <FooterStyled>
      <LinksArea>
        {topContent && topContent}
        <LinksStyled>
          {links.slice(0, 3).map((link) => (
            <FooterLink key={link.title} to={link.url}>
              {link.title}
            </FooterLink>
          ))}
        </LinksStyled>
        <LinksStyled>
          {links.slice(3, 10).map((link) => (
            <FooterLink key={link.title} to={link.url}>
              {link.title}
            </FooterLink>
          ))}
        </LinksStyled>
      </LinksArea>
      {footerCTA && footerCTA}
      {bottomContent && bottomContent}
    </FooterStyled>
  );
};

const FooterStyled = styled.footer`
  width: 100%;
  background: var(--bg-100);
  border-top: 1px solid var(--bg-300);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px;
  box-sizing: border-box;
`;

const LinksArea = styled.section`
  display: flex;
  width: 100%;
  max-width: ${DEVICE_BREAKPOINTS.lg};
  margin: auto;
  padding: 32px;
  gap: 16px;
  justify-content: space-between;
  box-sizing: border-box;
  flex-wrap: wrap;
`;
const LinksStyled = styled.section`
  display: flex;
  gap: 8px;
  flex-direction: column;
  flex-wrap: wrap;
`;
const FooterLink = styled(Link)`
  font-size: 14px;
  color: var(--text-200);

  &:hover {
    text-decoration: underline var(--text-200);
  }
`;

import { Header, Section } from "@/components";
import { Banner } from "@/components/ui/banner/Banner";
import { FeatureCard } from "@/components/ui/card/FeatureCard";
import { WrapList } from "@/components/ui/List/WrapList";
import { FEATURES } from "@/translations/features";
import { dashboard } from "@/translations/translations";
import styled, { css } from "styled-components";
import { DEVICE_BREAKPOINTS } from "@/constants/devices";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import { useNavigate } from "@tanstack/react-router";
import { STATISTICS } from "@/translations/statistics";
import { Statistics } from "@/components/widgets/Statistics/Statistics";
import { BRAND } from "@/assets/brand";
import { Timeline } from "@/components/widgets/Timeline/Timeline";
import { DEMO_DATA } from "./../components/widgets/Timeline/demo";
import { FaArrowRight } from "react-icons/fa";

export const Landing = () => {
  const navigate = useNavigate();
  const {
    user: { currentUser, isMember },
    ui: { setShowLoginModal },
  } = useGlobalContext();

  const bannerProps = isMember
    ? {
        buttonOnClick: () => navigate({ to: "/app" }),
      }
    : {
        buttonOnClick: currentUser
          ? () => navigate({ to: "/product" })
          : () => setShowLoginModal(true),
      };
  return (
    <>
      <Banner
        title={dashboard.banner.title}
        highlightTitle={dashboard.banner.higlightTitle}
        description={dashboard.banner.description}
        buttonText={dashboard.banner.buttonText}
        image={BRAND.banner2}
        buttonIcon={<FaArrowRight />}
        {...bannerProps}
      />
      <LandingSection>
        <Header componentType="h2" text="Como funciona?" />
        <Timeline data={DEMO_DATA} />
      </LandingSection>
      <LandingSection>
        <ImageAbsolute src="https://res.cloudinary.com/dzkcloud/image/upload/v1732626439/quantum/photo_2024-11-26_12-59-56_ocy8iy.jpg" />
        <Header componentType="h2" text={STATISTICS.title} />
        <Statistics statistics={STATISTICS.currentList} />
      </LandingSection>

      <LandingSection>
        <Header componentType="h2" text="Que ofrece Quantum" />

        <ImageRelative src="https://res.cloudinary.com/dzkcloud/image/upload/v1732626439/quantum/photo_2024-11-26_12-59-52_tj4slw.jpg" />

        <WrapList>
          {FEATURES.map((item) => (
            <FeatureCard
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </WrapList>
      </LandingSection>
    </>
  );
};

const ImageAbsolute = styled.img`
  position: absolute;
  z-index: 0;

  max-height: ${DEVICE_BREAKPOINTS.xs};
  opacity: 0.7;

  mask-image: radial-gradient(
    #000000 10%,
    rgba(0, 0, 0, 0.7) 50%,
    transparent 70%
  );
  @media screen and (min-width: ${DEVICE_BREAKPOINTS.md}) {
    left: 0px;
    top: 0px;
  }
`;

const ImageRelative = styled.img`
  z-index: 0;
  width: ${DEVICE_BREAKPOINTS.xs};
  max-width: ${DEVICE_BREAKPOINTS.xs};
  opacity: 0.9;

  mask-image: radial-gradient(
    #000000 10%,
    rgba(0, 0, 0, 0.7) 50%,
    transparent 70%
  );
  @media screen and (max-width: ${DEVICE_BREAKPOINTS.sm}) {
   display: none;
  }
`;

const commonStyles = css`
  padding: 48px 16px;
  position: relative;
  overflow-x: hidden;

  h2 {
    font-size: 32px;
  }
  > * {
    z-index: 1;
    max-width: ${DEVICE_BREAKPOINTS.lg};
    margin: auto;
  }
`;

const LandingSection = styled(Section)`
  background: var(--bg-100);

  ${commonStyles}
`;

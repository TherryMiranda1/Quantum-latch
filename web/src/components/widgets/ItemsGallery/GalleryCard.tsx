import styled from "styled-components";
import { Header, Link } from "../../ui";
import { BRAND } from "@/assets/brand";
import { Repository } from "@/types/Repository";
import { formatSlugToText } from "@/utils/formatSlugToText";

interface Props {
  post: Repository;
  onSelect?: (post: Repository) => void;
  selectedItem?: Repository | null;
}

export const GalleryCard = ({ post, onSelect, selectedItem }: Props) => {
  const isSelected = selectedItem?._id === post._id;

  const isPrompt = false;

  return (
    <GalleryCardStyled
      onClick={() => onSelect?.(post)}
      $isSelected={isSelected}
    >
      <GalleryCardImageStyled
        src={post.image || BRAND.banner2}
        $isPrompt={isPrompt}
      />
      <ContentStyled $isPrompt={isPrompt}>
        <Header componentType="h4" text={formatSlugToText(post.title)} />
        {post.url && <Link href={post.url} text={post.title} />}
      </ContentStyled>
    </GalleryCardStyled>
  );
};

const GalleryCardStyled = styled.button<{ $isSelected: boolean }>`
  position: relative;
  background: var(--bg-50);
  box-sizing: border-box;

  gap: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: var(--card-radius);
  border: ${({ $isSelected }) =>
    $isSelected ? "1px solid var(--bg-300)" : "1px solid var(--bg-300);"};
  width: 100%;
  transition: all 0.3s ease-in-out;
`;
const GalleryCardImageStyled = styled.img<{ $isPrompt?: boolean }>`
  height: 80px;
  border-radius: var(--small-radius);
  object-fit: cover;
  object-position: center;
  mask-image: radial-gradient(
    #000000 10%,
    rgba(0, 0, 0, 0.7) 50%,
    transparent 70%
  );
`;

const ContentStyled = styled.section<{ $isPrompt?: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  gap: 8px;
  width: 100%;
  a {
    align-self: flex-start;
    color: var(--text-200);
    font-size: 12px;
  }
`;

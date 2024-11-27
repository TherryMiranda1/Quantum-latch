import { Repository } from "@/types/Repository";
import styled from "styled-components";
import { GalleryCard } from "./GalleryCard";

interface Props {
  items: Repository[];
  onSelect?: (item: Repository) => void;
  selectedItem?: Repository | null;
}

export const ItemsGallery = ({ items, onSelect, selectedItem }: Props) => {
  return (
    <GalleryStyled>
      {items.map((item) => (
        <GalleryCard
          key={item._id}
          post={item}
          onSelect={onSelect}
          selectedItem={selectedItem}
        />
      ))}
    </GalleryStyled>
  );
};

const GalleryStyled = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

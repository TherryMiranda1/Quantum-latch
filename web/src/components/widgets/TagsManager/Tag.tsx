/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components";
import { TagsVariant, TagType } from "./TagsManager";
import { DEVICE_BREAKPOINTS } from "../../../constants/devices";

interface Props<T> {
  variant?: "ROW" | "COLUMN" | "WRAP";
  tag: TagType<T>;
  isSelected: boolean;
  onSelect: (item: T) => void;
}

export const Tag = <_, T>({
  tag,
  isSelected,
  onSelect,
  variant = "ROW",
}: Props<T>) => {
  return (
    <TagStyled
      $variant={variant}
      onClick={() => onSelect(tag)}
      $isSelected={isSelected}
    >
      {tag.title}
      {tag.icon}
    </TagStyled>
  );
};

const TagStyled = styled.button<{
  $isSelected: boolean;
  $variant: TagsVariant;
}>`
  background: ${({ $isSelected, $variant }) =>
    !$isSelected
      ? "transparent"
      : $variant === "ROW" || $variant === "WRAP"
        ? "var(--primary-100)"
        : "var(--bg-000)"};
  display: flex;
  border: ${({ $variant }) =>
    $variant === "ROW" || $variant === "WRAP" ? "var(--border)" : "none"};
  padding: ${({ $variant }) => ($variant === "ROW" ? "4px 8px" : "12px 8px")};
  flex-direction: ${({ $variant }) =>
    $variant === "ROW" ? "row" : "column-reverse"};
  border-radius: var(--small-radius);
  width: ${({ $variant }) => ($variant === "ROW" ? "auto" : "100%")};
  width: ${({ $variant }) => ($variant === "WRAP" ? "calc(50% - 4px)" : "")};
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${({ $isSelected }) => !$isSelected && "var(--bg-50)"};
  }
  &:focus {
    border-color: ${({ $variant }) =>
      $variant === "ROW" || $variant === "WRAP"
        ? "var(--primary-100)"
        : "var(--bg-50)"};
  }
  svg {
    font-size: ${({ $variant }) => ($variant === "ROW" ? "32px" : "36px")};
  }

  @media screen and (max-width: ${DEVICE_BREAKPOINTS.xs}) {
    font-size: ${({ $variant }) => ($variant === "ROW" ? "14px" : "12px")};

    svg {
      font-size: ${({ $variant }) => ($variant === "ROW" ? "32px" : "28px")};
    }
  }
`;

import { Section, Button } from "../../ui";
import styled from "styled-components";
import { OriginalImageType } from "@/context/GlobalContext/types";
import { useImageUploading } from "@/hooks/useImageUploading";

interface Props {
  value?: OriginalImageType;
  onChange?: (e: OriginalImageType | null) => void;
  height?: number;
}

export const InputDrop = ({ onChange, value, height = 300 }: Props) => {
  const { fileInputRef, handleDrop, handleDragOver, handleFileInputChange } =
    useImageUploading({ value, onChange });

  return (
    <DraggingAreaStyled
      $height={height}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Section>
        <p>Arrastra y suelta una imagen aquí</p>
        <Button onClick={() => fileInputRef?.current?.click?.()}>
          Subir imagen
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />
      </Section>
    </DraggingAreaStyled>
  );
};

const DraggingAreaStyled = styled.section<{ $height: number }>`
  position: relative;
  border-radius: var(--card-radius);
  border: 2px dashed var(--text-100);
  transition: border 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  height: ${(props) => props.$height}px;
`;

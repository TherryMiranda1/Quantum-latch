import { useState } from "react";
import { Button, Card, EmptyState, Header, Section, TextArea } from "../../ui";
import { TagsManager } from "../TagsManager/TagsManager";

import { FEEDBACK_TYPE } from "@/context/GlobalContext/GlobalContext.constants";

import { Text } from "@/components/ui/text/Text";
import styled, { css } from "styled-components";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { ICON_SIZES } from "@/constants/sizes";
import { Feedback } from "@/types/Feedback";
import { createFeedbackRequest } from "@/infra/api/feedback";
import { useNavigate } from "@tanstack/react-router";
import { Animated } from "@/components/ui/animated/Animated";

const EMPTY_DRAFT = {
  title: "",
  feeling: "",
  category: "",
};

interface Props {
  previousDraft?: Feedback;
  isEdit?: boolean;
}

export const FeedbackForm = ({ previousDraft = EMPTY_DRAFT }: Props) => {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<Feedback>(previousDraft);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = !draft.feeling || !draft.title || !draft.category;

  const handleSubmit = async () => {
    setIsLoading(true);
    const result = await createFeedbackRequest({ feedback: draft });

    if (result) {
      setDraft(EMPTY_DRAFT);
      setIsSuccess(true);
    }
    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <Animated>
        <EmptyState
          image={
            "https://res.cloudinary.com/dzkcloud/image/upload/v1732235325/peakflow/rb_18058_1_x857sm.png"
          }
          title={"Hemos recibido tu feedback"}
          description="Tu opinion es muy importante y nos ayuda a mejorar, muchas gracias!"
          buttonText="Volver al inicio"
          buttonOnClick={() => navigate({ to: "/" })}
        />
      </Animated>
    );
  }

  return (
    <Section>
      <Card>
        <Header text={"Tu opinion nos importa"} componentType="h2" />
        <Text text="Como ha sido tu experiencia?" />
        <RowStyled>
          <PositiveButton
            $isSelected={draft.feeling === "positive"}
            onClick={() => setDraft({ ...draft, feeling: "positive" })}
          >
            <AiFillLike size={ICON_SIZES.md} />
          </PositiveButton>
          <NegativeButton
            $isSelected={draft.feeling === "negative"}
            onClick={() => setDraft({ ...draft, feeling: "negative" })}
          >
            <AiFillDislike size={ICON_SIZES.md} />
          </NegativeButton>
        </RowStyled>
        <Text text="Categoría" />
        <TagsManager
          variant="WRAP"
          data={FEEDBACK_TYPE}
          currentTag={{ title: draft.category, id: draft.category }}
          onSelect={(value) => setDraft({ ...draft, category: value.id })}
        />
        <Text text="Cuentanos mas en detalle" />
        <TextArea
          placeholder="Tu feedback nos ayuda a mejorar"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e as string })}
        />

        {isError && <p>error</p>}
        <Button
          disabled={isDisabled || isLoading}
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Enviar feedback
        </Button>
      </Card>
    </Section>
  );
};

const RowStyled = styled.div`
  display: flex;
  gap: 8px;
  padding-bottom: 24px;
`;

const commonStyles = css`
  background: var(--bg-100);
  width: calc(50% - 4px);
  padding: 16px 12px;
  border: 2px solid transparent;
  border-radius: var(--card-radius);
  outline: none;
  &:focus {
    outline: none;
  }
`;

const PositiveButton = styled.button<{ $isSelected: boolean }>`
  ${commonStyles}
  border-color: ${({ $isSelected }) => $isSelected && "var(--success)"};
  svg {
    color: ${({ $isSelected }) => $isSelected && "var(--success)"};
  }
`;

const NegativeButton = styled.button<{ $isSelected: boolean }>`
  ${commonStyles}
  border-color: ${({ $isSelected }) => $isSelected && "var(--error)"};
  svg {
    color: ${({ $isSelected }) => $isSelected && "var(--error)"};
  }
`;

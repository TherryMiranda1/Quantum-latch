import { useEffect } from "react";
import { EmptyState, LoadingState } from "../components";

import { ItemsGallery } from "../components/widgets/ItemsGallery/ItemsGallery";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import { TagTypeBase } from "@/components/widgets/TagsManager/TagsManager";
import { Repository } from "@/types/Repository";

interface Props {
  onSelect?: (item: Repository) => void;
  selectedItem?: Repository | null;
  filterBy?: TagTypeBase | null;
}

export const GalleryView = ({ onSelect, selectedItem }: Props) => {
  const {
    repositories: {
      userRepositories: { data, isLoading, isError, call },
    },
  } = useGlobalContext();

  useEffect(() => {
    call({});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredData = data;

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Algo ha salido mal"
        description="Parece que ha ocurrido un error"
        buttonText="Reintentar"
        buttonOnClick={() => call({})}
      />
    );
  }

  if (filteredData?.length === 0) {
    return (
      <EmptyState
        title="Esto esta muy vacio"
        description="No se encontraron elementos para mostrar"
      />
    );
  }

  return (
    <>
      {filteredData && (
        <ItemsGallery
          items={filteredData}
          selectedItem={selectedItem}
          onSelect={onSelect}
        />
      )}
    </>
  );
};

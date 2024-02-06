import { useLocation } from "react-router-dom";

// performance - valor do retorno fica salvo / permite referenciar objeto a fim de faczer comparação e saber se foi modificabo (atribuição)
import { useMemo } from "react";

export function useQuery() {
    const {search} = useLocation()

    return useMemo(() => new URLSearchParams(search), [search]) // useMemo recebe array de dependências
}
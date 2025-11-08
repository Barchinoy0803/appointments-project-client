import { useSearchParams } from "react-router-dom"

export const useParamsHook = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const setParam = (key: string, value: string | number) => {
        if (
            typeof key === "string" &&
            (typeof value === "string" || typeof value === "number")
        ) {
            searchParams.set(key, value.toString());
            setSearchParams(searchParams);
        }
    }

    const getParam = (key: string): string | null => {
        if (typeof key === "string") {
            return searchParams.get(key);
        }
        return null;
    };

    return { setParam, getParam }
}
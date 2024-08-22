import { useQuery } from "@tanstack/react-query";
export type Universities = {
    country: string;
    domains: string[];
    web_pages: string[];
    name: string;
    alpha_two_code: string;
};
const fetchUniversities = async () => {
    const response = await fetch(
        "http://universities.hipolabs.com/search?name=middle"
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

export const useUniversities = () => {
    return useQuery({
        queryKey: ["universities"],
        queryFn: fetchUniversities,
    });
};

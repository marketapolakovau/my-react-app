import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export type Products = {
    id: number;
    name: string;
    category: string;
    quantity: number;
    price: number;

    imageUrl: string;
    additionalImages: string[];
    description: string;
};
const fetchProducts = async () => {
    const response = await fetch("http://localhost:3000/");

    return response.json();
};

export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });
};

const fetchProductDetail = async (productId: number) => {
    const response = await fetch(`http://localhost:3000/product/${productId}`);

    return response.json();
};

export const useProductDetail = (productId: number) => {
    return useQuery({
        queryKey: ["productDetail", productId],
        queryFn: () => fetchProductDetail(productId),
        enabled: !!productId,
    });
};

const updateProduct = async (product: {
    id: number;
    name: string;
    category: string;
    quantity: number;
    price: number;
}) => {
    const response = await fetch(
        `http://localhost:3000/product/${product.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        }
    );

    return response.json();
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProduct,
        onSuccess: (data) => {
            queryClient.setQueryData(["products", data.id], data);
            queryClient.invalidateQueries({
                queryKey: ["products"],
                exact: true,
            });
        },
        onError: (error) => {
            console.error("Error:", error);
        },
    });
};

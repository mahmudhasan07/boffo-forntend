/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetCategoriesQuery } from "@/redux/api/category/categoryApi";

export const useFormattedCategories = () => {
    const { data, error, isLoading } = useGetCategoriesQuery(undefined);

    const formattedData = data?.data?.reduce((acc: any, category: any) => {
        const existingCategory = acc.find((item: any) => item.name === category.gender);

        const child = {
            id: category.id,
            name: category.name,
            slug: category.name.toLowerCase().replace(/\s+/g, "-"),
            types: ["clothing"],
        };

        if (existingCategory) {
            existingCategory.children.push(child);
        } else {
            acc.push({
                id: `cat-${category.gender.toLowerCase()}`,
                name: category.gender,
                slug: category.gender.toLowerCase(),
                children: [child],
                featured: {
                    title: `${category.gender} Fashion Collection`,
                    image:
                        "https://d3j1z37yk0dbyk.cloudfront.net/media/images/257708__4_5__20250201073832272_width_1024.jpg",
                    href: `/products&${category.gender.toLowerCase()}`,
                },
            });
        }

        return acc;
    }, []);

    return { data: formattedData, error, isLoading };
};

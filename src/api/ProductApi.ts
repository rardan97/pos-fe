import axios from "axios";
import { REST_API_BASE_URL } from "@/config";
import type { AddProductDto, EditProductDto, Product } from "@/interface/Product.interface";

export const api = axios.create({
    baseURL: REST_API_BASE_URL,
    withCredentials: true
});

export async function getListProduct(token: string) : Promise<Product[]>{
    try{
        const response = await api.get<Product[]>(`${REST_API_BASE_URL}/product/getProductListAll`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("checckk");
        console.log(response);
        return response.data;
    }catch(error){
        console.error("Error during user fetch:", error);
        throw new Error("Failed to fetch users");
    }
}

export async function addProduct(token: string, data: AddProductDto) : Promise<Product>{
    console.log(data);
    const productPayLoad = {
        productName: data.productName,
        productDescription: data.productDescription,
        productPrice: data.productPrice,
        productStock: data.productStock,
        productCategoryId: data.productCategoryId
    }

    const formData = new FormData();
    formData.append("product", new Blob([JSON.stringify(productPayLoad)], {
        type: "application/json"
    }));

    if (data.productImage) {
      formData.append("productImage", data.productImage);
    }

    try{
        const response = await api.post<Product>(`${REST_API_BASE_URL}/product/addProduct`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }, 
        });
        return response.data;
    }catch(error){
        console.error("Error during user fetch:", error);
        throw new Error("Failed to fetch users");
    }
}

export async function getProductValueById(token: string, id : number) : Promise<Product>{
    try{
        const response = await api.get<Product>(`${REST_API_BASE_URL}/product/getProductFindById/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch(error){
        console.error("Error during user fetch:", error);
        throw new Error("Failed to fetch users");
    }
}

export async function editProduct(token: string, id : number, data: EditProductDto) : Promise<Product>{

    console.log("Image Product : "+data.productImage);
    const productPayLoad = {
        productName: data.productName,
        productDescription: data.productDescription,
        productPrice: data.productPrice,
        productStock: data.productStock,
        // productImage: data.productImage,
        productCategoryId: data.productCategoryId
    }

    const formData = new FormData();
    formData.append("product", new Blob([JSON.stringify(productPayLoad)], {
        type: "application/json"
    }));

    if (data.productImage) {
      formData.append("productImage", data.productImage);
    }

    console.log("formData image: "+formData.get("productImage"));

    try{
        const response = await api.put<Product>(`${REST_API_BASE_URL}/product/updateProduct/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }, 
        });
        return response.data;
    }catch(error){
        console.error("Error during user fetch:", error);
        throw new Error("Failed to fetch users");
    }
}




export async function getLoadImageProduct(token: string, filename : File | string) : Promise<Blob>{
    try{
        const response = await api.get<Blob>(`${REST_API_BASE_URL}/product/images/${filename}`, {
            responseType:'blob',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch(error){
        console.error("Error during user fetch:", error);
        throw new Error("Failed to fetch users");
    }
}

export async function delProductValueById(token: string, id : number) : Promise<string>{
    try{
        const response = await api.delete<string>(`${REST_API_BASE_URL}/product/deleteProductById/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("test delete");
        console.log(response);
        return response.data;
    }catch(error){
        console.error("Error during user fetch:", error);
        throw new Error("Failed to fetch users");
    }
}
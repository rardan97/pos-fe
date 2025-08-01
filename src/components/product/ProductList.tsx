import { useCallback, useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

import type { Product } from "@/interface/Product.interface";
import { CardAction, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getListProduct } from "@/api/ProductApi";
import ProductAdd from "./ProductAdd";
import ProductEdit from "./ProductEdit";
import ProductDelete from "./ProductDelete";


export default function ProductList() {
    const hasFetched = useRef(false);
    const [productData, setProductData] = useState<Product[]>([]);

    const getListAllProduct = useCallback(async (): Promise<void> => {
        const token = localStorage.getItem("accessToken");
        console.log("accessToken : "+token);
        if (!token){
            return;
        }
        try {
            const response = await getListProduct(token);   
            console.log("Success processing data");
            setProductData(response);
        } catch (error) {
            console.log("Failed processing data", error);
            throw error;
        }
    }, []);

    useEffect(() => {
        console.log(hasFetched);
        if (!hasFetched.current) {
            getListAllProduct();
            hasFetched.current = true; // Cegah request kedua
        }
    }, [getListAllProduct]);

    return (
        <>
        <div>
                <CardHeader>
                    <CardTitle>Data Product</CardTitle>
                    <CardAction><ProductAdd onSuccess={getListAllProduct}/></CardAction>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">Product ID</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Product Desk</TableHead>
                            <TableHead>Product Price</TableHead>
                            <TableHead>Product Category</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productData
                                .filter((product) => product.productId !== null && product.productId !== undefined)
                                .map((product) => (
                            <TableRow key={product.productId}>
                            <TableCell className="font-medium">{product.productId}</TableCell>
                            <TableCell>{product.productName}</TableCell>
                            <TableCell>{product.productDescription}</TableCell>
                            <TableCell>{product.productPrice}</TableCell>
                            <TableCell>{product.productCategory.categoryName}</TableCell>
                            <TableCell className="text-right ">
                                <ProductEdit onSuccess={getListAllProduct} idProduct={product.productId as number} />
                                <ProductDelete onSuccess={getListAllProduct} idProduct={product.productId as number} /> 
                            </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </div>
        </>
    );
}
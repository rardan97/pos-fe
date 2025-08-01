import ProductList from "@/components/product/ProductList";
import { Card } from "@/components/ui/card";



export default function Product() {
    return (
        <>
        <Card className="m-9 p-9">
                 <ProductList />
            </Card>
           
        </>
    );
}

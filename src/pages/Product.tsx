import { CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";



export default function Product() {
    return (
        <>
            <div>
                <div>
                    <CardHeader>
                        <CardTitle>Product</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                        <CardAction>Add Petugas</CardAction>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead className="w-[100px]">Category ID</TableHead>
                                <TableHead>Category Name</TableHead>
                                <TableHead>Category Desk</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell className="text-right">$250.00</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </div>
            </div>
        </>
    );
}

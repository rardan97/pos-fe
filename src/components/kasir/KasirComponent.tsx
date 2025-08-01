import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import type { Product } from "@/interface/Product.interface";
import { getListProduct, getLoadImageProduct } from "@/api/ProductApi";


interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface ProductWithImageUrl extends Product {
  imageUrl: string;
}


export default function KasirComponent() {


  const hasFetched = useRef(false);
  const [productData, setProductData] = useState<ProductWithImageUrl[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const getListAllProduct = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await getListProduct(token);

      // Load image URLs secara paralel
      const productsWithImages: ProductWithImageUrl[] = await Promise.all(
        response.map(async (product: Product) => {
          let imageUrl = "/placeholder.png";
          if (product.productImage) {
            try {
              const imageBlob = await getLoadImageProduct(token, product.productImage);
              imageUrl = URL.createObjectURL(imageBlob);
            } catch (error) {
              console.warn("Gagal load image untuk product:", product.productId);
               console.error("Failed processing data", error);
            }
          }
          return { ...product, imageUrl };
        })
      );

      setProductData(productsWithImages);
    } catch (error) {
      console.error("Failed processing data", error);
    }
  }, []);

  useEffect(() => {
    if (!hasFetched.current) {
      getListAllProduct();
      hasFetched.current = true;
    }

    return () => {
      // Cleanup URL.createObjectURL to prevent memory leak
      productData.forEach((product) => {
        if (product.imageUrl.startsWith("blob:")) {
          URL.revokeObjectURL(product.imageUrl);
        }
      });
    };
  }, [getListAllProduct, productData]);

  const makanan = productData.filter((item) => item.productCategory.categoryName === "makanan");
  const minuman = productData.filter((item) => item.productCategory.categoryName === "minuman");

  const handleAddToCart = (item: ProductWithImageUrl) => {
    setCart((prevCart) => {
      const exists = prevCart.find((cartItem) => cartItem.id === item.productId);
      if (exists) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.productId ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
        );
      }
      return [
        ...prevCart,
        {
          id: item.productId,
          name: item.productName,
          price: Number(item.productPrice),
          qty: 1,
        },
      ];
    });
  };

  const handleIncreaseQty = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const handleDecrease = (id: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const handleDelete = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="w-full p-9">
      <h1 className="text-2xl font-bold mb-6">Halaman Kasir</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Menu */}
        <div className="w-full lg:w-1/1 space-y-6">
          {/* Makanan */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Makanan</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {makanan.map((item) => (
                <Card
                  key={item.productId}
                  className="p-3 flex flex-col justify-between hover:shadow-sm transition"
                >
                  <div>
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium">{item.productName}</p>
                    <p className="text-xs text-muted-foreground">
                      Rp{Number(item.productPrice).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-3 text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Tambah
                  </button>
                </Card>
              ))}
            </div>
          </div>

          {/* Minuman */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Minuman</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {minuman.map((item) => (
                <Card
                  key={item.productId}
                  className="p-3 flex flex-col justify-between hover:shadow-sm transition"
                >
                  <div>
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium">{item.productName}</p>
                    <p className="text-xs text-muted-foreground">
                      Rp{Number(item.productPrice).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-3 text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Tambah
                  </button>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Checkout */}
        <Card className="w-full lg:w-1/4 p-4">
          <h2 className="text-lg font-semibold mb-3">Checkout</h2>
          <div className="space-y-2 text-sm">
            {cart.length === 0 ? (
              <p className="text-muted-foreground">
                Belum ada item yang ditambahkan.
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 border-b pb-1"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <div className="flex items-center gap-1 mt-1">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="px-2 py-0.5 bg-gray-200 text-xs rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="text-xs w-6 text-center">{item.qty}</span>
                      <button
                        onClick={() => handleIncreaseQty(item.id)}
                        className="px-2 py-0.5 bg-gray-200 text-xs rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="ml-2 text-xs text-red-500 hover:underline"
                        title="Hapus item"
                      >
                        delete
                      </button>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">
                    Rp{(item.price * item.qty).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>

          <hr className="my-3" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>Rp{total.toLocaleString()}</span>
          </div>
          <button
            disabled={cart.length === 0}
            className="mt-4 px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Bayar Sekarang
          </button>
        </Card>
      </div>
    </div>
  );
}
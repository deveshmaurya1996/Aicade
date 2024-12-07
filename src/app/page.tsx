"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/types";
import SearchBar from "@/components/SearchBar";
import SidebarFilter from "@/components/SidebarFilter";

const MainPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (filters.color && filters.color.length > 0) {
      filtered = filtered.filter((product) =>
        filters.color.includes(product.color)
      );
    }

    if (filters.gender && filters.gender.length > 0) {
      filtered = filtered.filter((product) =>
        filters.gender.includes(product.gender)
      );
    }

    if (filters.type && filters.type.length > 0) {
      filtered = filtered.filter((product) =>
        filters.type.includes(product.type)
      );
    }

    if (filters.price && filters.price.length > 0) {
      filtered = filtered.filter((product) => {
        return filters.price.some((priceRange) => {
          if (priceRange === "0-250")
            return product.price >= 0 && product.price <= 250;
          if (priceRange === "251-450")
            return product.price > 250 && product.price <= 450;
          if (priceRange === "451+") return product.price > 450;
          return false;
        });
      });
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 w-screen h-screen">
        <div className="w-12 h-12 border-4 border-gray-500 border-solid border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-20">Error: {error}</p>;
  }

  const handleSearch = (query: string) => {
    const searchResults = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(searchResults);
  };

  return (
    <div className="container mx-auto">
      <div className="min-h-screen flex">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <div
          className={`fixed sm:top-16 h-screen bg-gray-100 w-64 p-4 z-20 transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:block`}
        >
          <SidebarFilter onFilter={setFilters} />
        </div>

        <div
          className={`lg:col-span-1 p-4 pb-2 mt-16 lg:ml-[250px] lg:w-[calc(100%-250px)] w-full`}
        >
          <SearchBar
            onSearch={handleSearch}
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-600 mt-10">
                No products match your search.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

import { create } from "zustand";

type SellerProductState = {
    products: SellerProduct[] | null;
    setProducts: (products: SellerProduct[] | null) => void;
    addProduct: (stores: Store[] | null) => void;
    
    updateProduct: (store: Store) => void;
    
    deleteProduct: (store: Store) => void;
    
};

export const useSellerProducts = create<SellerProductState>((set) => ({
    products: null,
    setProducts: (products) => set({ products }),
    addProduct: (()=>{}),
    updateProduct: (()=>{

    }),
    deleteProduct: ((storeId) => {

    }),
}));

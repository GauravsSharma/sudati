import api from "@/lib/axios";


import { useUserStore } from "@/stores/user.store";
import { useMutation, useQuery } from "@tanstack/react-query";

// ------------------------
// Define User type
// Make sure this matches the API response exactly
// ------------------------

interface User {
  id: string;
  name: string;
  phone: string;
  type: "buyer" | "seller"| null;
}

interface User {
  _id: string;
  fullName: string | null;
  email: string | null;
  phone: string;
  address: string[];          // array of address IDs or strings
  isAdmin: boolean;
  userType: "seller" | "customer";
  createdAt: string;          // ISO date string
  updatedAt: string;          // ISO date string
  __v: number;
}
interface Store {
  _id: string;
  name: string;
  description: string;
  address: string;

}
interface Product{
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}
interface SellerProduct{
  _id: string;
  title: string;
  isActive: boolean;
  stock: number;
  price: number;
  thumbnail: {
    public_id: string;
    url: string;
  };
}

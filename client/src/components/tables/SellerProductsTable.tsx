"use client";

import React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { DotSquareIcon, MoreVertical } from "lucide-react";
import ActionMenu from "../dropdown/ActionMenu";
import ProductImageDialog from "../models/AddImages";
import DeleteProductDialog from "../models/DeleteProduct";



interface Props {
    data: SellerProduct[];
}

const SellerProductsTable = ({ data }: Props) => {
    const [isUploadDialogOpen, setIsUploadDialogOpen] = React.useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [productId, setProductId] = React.useState<string>("");
    const productName = data.find(product => product._id === productId)?.title || "";
    const columns: ColumnDef<SellerProduct>[] = [
        {
            header: "Image",
            cell: ({ row }) => (
                <div className="flex items-center justify-center">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group">
                        <Image
                            src={row?.original?.thumbnail?.url || "https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"}
                            alt={row.original.title}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "title",
            header: "Product Name",
            cell: ({ row }) => (
                <div className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                    {row.original.title}
                </div>
            ),
        },
        {
            accessorKey: "stock",
            header: "Stock",
            cell: ({ getValue }) => {
                const stock = getValue<number>();
                return (
                    <div className="flex items-center gap-2">
                        <span className={`font-bold ${stock < 10 ? 'text-red-600' : stock < 50 ? 'text-amber-600' : 'text-emerald-600'}`}>
                            {stock}
                        </span>
                        <span className="text-xs text-gray-500">units</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ getValue }) => (
                <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ₹{getValue<number>()?.toLocaleString() || 500}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "isActive",
            header: "Status",
            cell: ({ getValue }) =>
                getValue<boolean>() ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200 shadow-sm">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        Active
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200 shadow-sm">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        Inactive
                    </span>
                ),
        },
        {
            accessorKey: "Action",
            header: "Action",
            cell: ({ row }) => <ActionMenu product={row.original} setIsUploadDialogOpen={setIsUploadDialogOpen} setProductId={setProductId}
            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            />,
        }
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className=" min-h-screen">
            <div className="w-full">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
                        Product Inventory
                    </h1>
                    <p className="text-gray-600">Manage your product listings and stock levels</p>
                </div>

                {/* Table Container */}
                <div className="rounded-2xl  border border-gray-200/50 bg-white/80 backdrop-blur-sm overflow-hidden relative z-0">
                    {/* Table Wrapper for Horizontal Scroll */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id} className="bg-gradient-to-r from-gray-50 via-blue-50/50 to-purple-50/50 border-b-2 border-gray-200 ">
                                        {headerGroup.headers.map((header) => (
                                            <th
                                                key={header.id}
                                                className="px-6 py-5 text-left font-bold text-sm tracking-wide text-gray-700 uppercase"
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {table.getRowModel().rows.map((row, idx) => (
                                    <tr
                                        key={row.id}
                                        className="  hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200 group"
                                        style={{
                                            animation: `fadeIn 0.3s ease-out ${idx * 0.05}s both`
                                        }}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-6 py-5">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>

                            {data.length === 0 && (
                                <tfoot>
                                    <tr className="relative ">
                                        <td
                                            colSpan={columns.length}
                                            className="text-center relative z-10 py-12 "
                                        >
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                    </svg>
                                                </div>
                                                <p className="text-gray-500 font-medium">No Products Found</p>
                                                <p className="text-gray-400 text-sm">Add your first product to get started</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>
                </div>

                {/* Footer Stats */}
                {data.length > 0 && (
                    <div className="mt-6 flex items-center justify-between text-sm text-gray-600 px-2">
                        <p>Showing <span className="font-semibold text-gray-900">{data.length}</span> products</p>
                        <p className="text-gray-500">Total inventory value: <span className="font-bold text-gray-900">₹{data.reduce((sum, item) => sum + (item.price * item.stock), 0).toLocaleString()}</span></p>
                    </div>
                )}
            </div>
               <ProductImageDialog productId={productId} isOpen={isUploadDialogOpen} setIsOpen={setIsUploadDialogOpen}  />
               <DeleteProductDialog isOpen={isDeleteDialogOpen} setIsOpen={setIsDeleteDialogOpen} productId={productId} productName={productName} />
            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
};

export default SellerProductsTable;
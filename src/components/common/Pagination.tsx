import React from "react";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";

interface PaginationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   setCurrentPage,
                                                   totalItems,
                                                   itemsPerPage
                                               }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getPagination = () => {
        const pages: (number | string)[] = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="flex flex-col items-center mt-8 space-y-4">
            <div className="flex items-center space-x-2">
                <button
                    className={`w-9 h-9 flex items-center justify-center rounded-lg transition ${
                        currentPage === 1
                            ? "bg-primary-900 text-secondary-500 cursor-not-allowed"
                            : "bg-primary-700 text-white hover:bg-highlight"
                    }`}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <AiOutlineLeft className="w-5 h-5"/>
                </button>

                {getPagination().map((page, index) =>
                    page === "..." ? (
                        <span key={index} className="px-2 text-secondary-400">...</span>
                    ) : (
                        <button
                            key={index}
                            className={`w-9 h-9 rounded-lg font-medium transition ${
                                currentPage === page
                                    ? "bg-highlight text-white shadow-md"
                                    : "bg-primary-700 text-secondary-400 hover:bg-primary-600"
                            }`}
                            onClick={() => setCurrentPage(Number(page))}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    className={`w-9 h-9 flex items-center justify-center rounded-lg transition ${
                        currentPage === totalPages
                            ? "bg-primary-900 text-secondary-500 cursor-not-allowed"
                            : "bg-primary-700 text-white hover:bg-highlight"
                    }`}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <AiOutlineRight className="w-5 h-5"/>
                </button>
            </div>
        </div>
    );
};

export default Pagination;

import React from "react";

export function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const pagesPerGroup = 5;
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
  return (
    <div className="flex flex-col items-center mt-8">
      {/* Page Info */}
      <h2 className="text-lg font-semibold mb-4">
        Page {currentPage} of {totalPages}
      </h2>
      {totalPages > 1 && (
        <>
          <div className="flex space-x-2">
            {currentPage > 2 && (
              <button
                onClick={() => setCurrentPage(1)}
                className="px-4 py-2 rounded bg-gray-500 text-gray-200 hover:bg-gray-900 disabled:opacity-50"
              >
                First
              </button>
            )}

            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded bg-gray-500 text-gray-200 hover:bg-gray-900 disabled:opacity-50"
            >
              Prev
            </button>

            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded font-semibold ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "bg-gray-500 text-gray-200 hover:bg-gray-900 hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded bg-gray-500 text-gray-200 hover:bg-gray-900 disabled:opacity-50"
            >
              Next
            </button>
            {currentPage < totalPages - 1 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="px-4 py-2 rounded bg-gray-500 text-gray-200 hover:bg-gray-900 disabled:opacity-50"
              >
                Last
              </button>
            )}
          </div>

          <input
          className="mt-4 px- py-1 border rounded bg-gray-200 text-black w-36 text-center"
            type="number"
            placeholder="Go to page..."
            min={1}
            max={totalPages}
            onChange={(e) => {
              const page = Number(e.target.value);
              if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
              }
            }}
            
          />
        </>
      )}
    </div>
  );
}

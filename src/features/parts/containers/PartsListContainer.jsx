// Container component that handles data fetching, business logic, and state management
// file: src/features/parts/containers/PartsListContainer.jsx

import { useGetPartsQuery } from "../partsApiSlice";
import { useState, useMemo, useCallback } from "react";
import useAuth from "hooks/useAuth";
import PartsList from "components/parts/PartsList";
import OutletLoadingPage from "components/layout/OutletLoadingPage";

const PartsListContainer = () => {
  const { isManager, isAdmin, isEmployee } = useAuth();

  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Part Number Ascending");
  const [typeFilter, setTypeFilter] = useState("All");

  // Data fetching
  const {
    data: parts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPartsQuery(undefined, {
    pollingInterval: 1500000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  // Sorting logic
  const sortParts = useCallback((partsArray, sortType) => {
    const sortedArray = [...partsArray];

    const sortFunctions = {
      "Part Number Ascending": (a, b) =>
        a.partNumber.localeCompare(b.partNumber, "en", { numeric: true }),
      "Part Number Descending": (a, b) =>
        b.partNumber.localeCompare(a.partNumber, "en", { numeric: true }),
      "Part Name Ascending": (a, b) =>
        a.name.localeCompare(b.name, "en", { numeric: true }),
      "Part Name Descending": (a, b) =>
        b.name.localeCompare(a.name, "en", { numeric: true }),
      "Part Type Ascending": (a, b) =>
        a.type.localeCompare(b.type, "en", { numeric: true }),
      "Part Type Descending": (a, b) =>
        b.type.localeCompare(a.type, "en", { numeric: true }),
      "Part Description Ascending": (a, b) =>
        a.description.localeCompare(b.description, "en", { numeric: true }),
      "Part Description Descending": (a, b) =>
        b.description.localeCompare(a.description, "en", { numeric: true }),
      "Create Date Ascending": (a, b) =>
        a.createdAt.localeCompare(b.createdAt, "en", { numeric: true }),
      "Create Date Descending": (a, b) =>
        b.createdAt.localeCompare(a.createdAt, "en", { numeric: true }),
      "Stock Qty Ascending": (a, b) =>
        a.qty
          .toString()
          .localeCompare(b.qty.toString(), "en", { numeric: true }),
      "Stock Qty Descending": (a, b) =>
        b.qty
          .toString()
          .localeCompare(a.qty.toString(), "en", { numeric: true }),
      "Backorder Ascending": (a, b) =>
        a.backOrder
          .toString()
          .localeCompare(b.backOrder.toString(), "en", { numeric: true }),
      "Backorder Descending": (a, b) =>
        b.backOrder
          .toString()
          .localeCompare(a.backOrder.toString(), "en", { numeric: true }),
    };

    const sortFn = sortFunctions[sortType];
    return sortFn ? sortedArray.sort(sortFn) : sortedArray;
  }, []);

  // Filtering and processing logic
  const processedParts = useMemo(() => {
    if (!isSuccess || !parts?.entities) return [];

    // Convert entities object to array
    const partsArray = Object.values(parts.entities);

    // Apply filters
    let filtered = partsArray;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (part) =>
          part.partNumber?.toLowerCase().includes(query) ||
          part.name?.toLowerCase().includes(query) ||
          part.description?.toLowerCase().includes(query) ||
          part.type?.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((part) => {
        if (statusFilter === "In Stock") return part.qty > 0;
        if (statusFilter === "Out of Stock") return part.qty === 0;
        if (statusFilter === "On Backorder") return part.backOrder > 0;
        return true;
      });
    }

    // Type filter
    if (typeFilter !== "All") {
      filtered = filtered.filter((part) => part.type === typeFilter);
    }

    // Apply sorting
    return sortParts(filtered, sortOption);
  }, [
    parts,
    isSuccess,
    searchQuery,
    statusFilter,
    typeFilter,
    sortOption,
    sortParts,
  ]);

  // Event handlers
  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  const handleStatusChange = useCallback((status) => {
    setStatusFilter(status);
  }, []);

  const handleSortChange = useCallback((sort) => {
    setSortOption(sort);
  }, []);

  const handleTypeChange = useCallback((type) => {
    setTypeFilter(type);
  }, []);

  // Loading state
  if (isLoading) {
    return <OutletLoadingPage />;
  }

  // Error state
  if (isError) {
    return (
      <div className="error-container">
        <p className="errmsg">
          {error?.data?.message || "Failed to load parts"}
        </p>
      </div>
    );
  }

  // Success state - render presentational component
  return (
    <PartsList
      parts={processedParts}
      searchQuery={searchQuery}
      statusFilter={statusFilter}
      sortOption={sortOption}
      typeFilter={typeFilter}
      onSearchChange={handleSearchChange}
      onStatusChange={handleStatusChange}
      onSortChange={handleSortChange}
      onTypeChange={handleTypeChange}
      canAddParts={isManager || isAdmin || isEmployee}
    />
  );
};

export default PartsListContainer;

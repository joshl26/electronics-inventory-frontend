/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, screen, act } from "@testing-library/react";
import PartsPage from "./PartsPage";
import PartsList from "components/features/parts/PartsList";

// Mock OutletLoadingPage to render "Loading..."
jest.mock("components/pages/OutletLoadingPage", () => () => (
  <div>Loading...</div>
));

// Mock PartsList to isolate testing
jest.mock("components/features/parts/PartsList", () =>
  jest.fn(() => <div>PartsList</div>)
);

// Mock useGetPartsQuery hook
const mockUseGetPartsQuery = jest.fn();

// Mock useAuth hook
const mockUseAuth = jest.fn();

jest.mock("components/features/parts/partsApiSlice", () => ({
  useGetPartsQuery: () => mockUseGetPartsQuery(),
}));

jest.mock("hooks/useAuth", () => () => mockUseAuth());

describe("PartsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state when isLoading is true", async () => {
    mockUseGetPartsQuery.mockReturnValue({
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: null,
      data: null,
    });
    mockUseAuth.mockReturnValue({
      isManager: false,
      isAdmin: false,
      isEmployee: false,
    });

    await act(async () => {
      render(<PartsPage />);
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state when isError is true", async () => {
    const errorMessage = "Network error";
    mockUseGetPartsQuery.mockReturnValue({
      isLoading: false,
      isSuccess: false,
      isError: true,
      error: { data: { message: errorMessage } },
      data: null,
    });
    mockUseAuth.mockReturnValue({
      isManager: false,
      isAdmin: false,
      isEmployee: false,
    });

    await act(async () => {
      render(<PartsPage />);
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("renders error state with default message if error message missing", async () => {
    mockUseGetPartsQuery.mockReturnValue({
      isLoading: false,
      isSuccess: false,
      isError: true,
      error: {},
      data: null,
    });
    mockUseAuth.mockReturnValue({
      isManager: false,
      isAdmin: false,
      isEmployee: false,
    });

    await act(async () => {
      render(<PartsPage />);
    });

    expect(screen.getByText("Failed to load parts")).toBeInTheDocument();
  });

  it("renders PartsList with correct props on success", async () => {
    const partsData = {
      entities: {
        1: {
          id: "1",
          partNumber: "123",
          name: "Part A",
          description: "Desc A",
          type: "Type1",
          qty: 10,
          backOrder: 0,
          createdAt: "2023-01-01",
        },
        2: {
          id: "2",
          partNumber: "456",
          name: "Part B",
          description: "Desc B",
          type: "Type2",
          qty: 0,
          backOrder: 5,
          createdAt: "2023-02-01",
        },
      },
    };

    mockUseGetPartsQuery.mockReturnValue({
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
      data: partsData,
    });

    // Test different auth roles for canAddParts
    const authRoles = [
      { isManager: true, isAdmin: false, isEmployee: false, expected: true },
      { isManager: false, isAdmin: true, isEmployee: false, expected: true },
      { isManager: false, isAdmin: false, isEmployee: true, expected: true },
      { isManager: false, isAdmin: false, isEmployee: false, expected: false },
    ];

    for (const { isManager, isAdmin, isEmployee, expected } of authRoles) {
      mockUseAuth.mockReturnValue({ isManager, isAdmin, isEmployee });

      await act(async () => {
        render(<PartsPage />);
      });

      expect(PartsList).toHaveBeenCalledWith(
        expect.objectContaining({
          parts: expect.any(Array),
          searchQuery: "",
          statusFilter: "All",
          sortOption: "Part Number Ascending",
          typeFilter: "All",
          onSearchChange: expect.any(Function),
          onStatusChange: expect.any(Function),
          onSortChange: expect.any(Function),
          onTypeChange: expect.any(Function),
          canAddParts: expected,
        }),
        {}
      );

      PartsList.mockClear();
    }
  });
});

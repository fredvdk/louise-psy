import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AccountForm } from "./account-form";
import { createClient } from "@/lib/supabase/client";
import { SetupProps } from "@/types/reservatie";

vi.mock("@/lib/supabase/client");

// --------------------
// Mock Factory
// --------------------

function setupMockSupabase({
  profileData = {
    full_name: "John Doe",
    mobile: "1234567890",
    avatar_url: "https://example.com/avatar.jpg",
  },
  profileError = null,
  upsertError = null,
}: SetupProps = {}) {
  const queryBuilder = {
    select: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({
          data: profileData,
          error: profileError,
        }),
      }),
    }),
    upsert: vi.fn().mockResolvedValue({
      error: upsertError,
    }),
  };

  const client = {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: "123", email: "test@example.com" } },
        error: null,
      }),
    },
    from: vi.fn(() => queryBuilder),
  };

  vi.mocked(createClient).mockReturnValue(
    client as unknown as ReturnType<typeof createClient>
  );

  return { client, queryBuilder };
}

// --------------------
// Helpers
// --------------------

async function renderForm() {
  render(<AccountForm />);
  await screen.findByDisplayValue("John Doe"); // wait until loaded
}

// --------------------
// Tests
// --------------------

describe("AccountForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all fields with fetched data", async () => {
    setupMockSupabase();

    await renderForm();

    expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("https://example.com/avatar.jpg")
    ).toBeInTheDocument();
  });

  it("disables the email field", async () => {
    setupMockSupabase();

    await renderForm();

    const emailInput = screen.getByDisplayValue(
      "test@example.com"
    ) as HTMLInputElement;

    expect(emailInput).toBeDisabled();
  });

  it("updates input when user types", async () => {
    const user = userEvent.setup();
    setupMockSupabase();

    await renderForm();

    const nameInput = screen.getByDisplayValue("John Doe") as HTMLInputElement;

    await user.clear(nameInput);
    await user.type(nameInput, "Jane Doe");

    expect(nameInput.value).toBe("Jane Doe");
  });

  it("submits updated data", async () => {
    const user = userEvent.setup();
    const { queryBuilder } = setupMockSupabase();

    await renderForm();

    const nameInput = screen.getByDisplayValue("John Doe") as HTMLInputElement;

    await user.clear(nameInput);
    await user.type(nameInput, "Jane Doe");

    await user.click(
      screen.getByRole("button", { name: /save changes/i })
    );

    expect(queryBuilder.upsert).toHaveBeenCalledWith({
      id: "123",
      full_name: "Jane Doe",
      mobile: "1234567890",
      avatar_url: "https://example.com/avatar.jpg",
    });
  });

  it("shows error message on submission failure", async () => {
    const user = userEvent.setup();

    setupMockSupabase({
      upsertError: { message: "Database error" },
    });

    await renderForm();

    await user.click(
      screen.getByRole("button", { name: /save changes/i })
    );

    expect(
      await screen.findByText(/database error/i)
    ).toBeInTheDocument();
  });

  it("shows success message after successful update", async () => {
    const user = userEvent.setup();

    setupMockSupabase();

    await renderForm();

    await user.click(
      screen.getByRole("button", { name: /save changes/i })
    );

    expect(
      await screen.findByText(/account updated successfully/i)
    ).toBeInTheDocument();
  });
});
import UserData from '@/components/adminData';
import { render, screen } from "@testing-library/react"
import { describe, test, expect, vi, beforeEach } from "vitest"
import * as supabaseServer from "@/lib/supabase/server"

vi.mock('@/lib/supabase/server');
vi.mock('./navbar', () => ({
    Navbar: () => <div data-testid="navbar">Navbar</div>
}));
vi.mock('./reservatielijst', () => ({
    default: () => <div data-testid="reservatielijst">ReservatieLijst</div>
}));

const createMockClient = (role: string) => ({
    auth: {
        getUser: vi.fn().mockResolvedValue({
            data: { user: { id: 'test-user-id' } }
        })
    },
    from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                    data: { role }
                })
            })
        })
    })
});

describe('Admin data', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('shows error when user is not admin', async () => {
        vi.spyOn(supabaseServer, 'createClient').mockResolvedValue(createMockClient('user') as never);

        render(await UserData());
        expect(screen.getByText("You do not have access to this page.")).toBeInTheDocument();
    });

    test('shows admin panel when user is admin', async () => {
        vi.spyOn(supabaseServer, 'createClient').mockResolvedValue(createMockClient('admin') as never);

        render(await UserData());
        expect(screen.getByText(/Admin data - Pending to be comfirmed/)).toBeInTheDocument();
        expect(screen.getByTestId('reservatielijst')).toBeInTheDocument();
    });
})
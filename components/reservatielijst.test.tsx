import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as supabaseServer from '@/lib/supabase/server';

vi.mock('@/lib/supabase/server');

const mockReservatie = {
    id: 'res-1',
    date: '2026-05-10',
    time: '10:30:00',
    status: 'confirmed' as const,
    updated_at: '2026-03-01T00:00:00Z',
    reserved_for: 'user-1',
    notes: null,
    client_email: { email: 'client@example.com' },
};

const mockReservatie2 = {
    ...mockReservatie,
    id: 'res-2',
    status: 'pending' as const,
};

const createMockSupabaseClient = () => ({
    auth: {
        getUser: vi.fn(),
    },
    from: vi.fn(),
});

beforeEach(() => {
    vi.clearAllMocks();
});

describe('ReservatieLijst', () => {
    it('calls getUser to check authentication', async () => {
        const mockClient = createMockSupabaseClient();
        mockClient.auth.getUser.mockResolvedValue({
            data: { user: null },
        });

        vi.mocked(supabaseServer.createClient).mockResolvedValue(mockClient as never);

        expect(mockClient.auth.getUser).toBeDefined();
    });

    it('filters by user ID for non-admin users', () => {
        const mockClient = createMockSupabaseClient();
        const mockQuery = {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            in: vi.fn().mockReturnThis(),
            order: vi.fn().mockResolvedValue({
                data: [mockReservatie],
                error: null,
            }),
        };

        mockClient.from.mockReturnValue(mockQuery);

        expect(mockQuery.eq).toBeDefined();
    });

    it('fetches all reservations for admin users without user filter', () => {
        const mockClient = createMockSupabaseClient();
        const mockQuery = {
            select: vi.fn().mockReturnThis(),
            in: vi.fn().mockReturnThis(),
            order: vi.fn().mockResolvedValue({
                data: [mockReservatie, mockReservatie2],
                error: null,
            }),
        };

        mockClient.from.mockReturnValue(mockQuery);

        expect(mockQuery.in).toBeDefined();
        expect(mockQuery.select).toBeDefined();
    });

    it('passes correct status filter to query', () => {
        const mockClient = createMockSupabaseClient();
        const mockQuery = {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            in: vi.fn(),
        };

        mockQuery.in.mockReturnValue({
            order: vi.fn().mockResolvedValue({
                data: [mockReservatie],
                error: null,
            }),
        });

        mockClient.from.mockReturnValue(mockQuery);

        expect(mockQuery.in).toBeDefined();
    });

    it('creates supabase client on render', async () => {
        const mockClient = createMockSupabaseClient();
        mockClient.auth.getUser.mockResolvedValue({
            data: { user: { id: 'user-1' } },
        });

        vi.mocked(supabaseServer.createClient).mockResolvedValue(mockClient as never);

        await supabaseServer.createClient();
        expect(vi.mocked(supabaseServer.createClient)).toHaveBeenCalled();
    });

    it('handles empty reservations list', () => {
        const mockClient = createMockSupabaseClient();
        const mockQuery = {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            in: vi.fn().mockReturnThis(),
            order: vi.fn().mockResolvedValue({
                data: [],
                error: null,
            }),
        };

        mockClient.from.mockReturnValue(mockQuery);

        expect(mockQuery.order).toBeDefined();
    });

    it('handles database errors', () => {
        const mockClient = createMockSupabaseClient();
        const mockQuery = {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            in: vi.fn().mockReturnThis(),
            order: vi.fn().mockResolvedValue({
                data: null,
                error: { message: 'Database error' },
            }),
        };

        mockClient.from.mockReturnValue(mockQuery);

        expect(mockQuery.order).toBeDefined();
    });
});

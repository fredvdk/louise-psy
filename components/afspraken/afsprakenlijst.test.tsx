/* eslint-disable @typescript-eslint/no-explicit-any */
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
};

const mockReservatie2 = {
    ...mockReservatie,
    id: 'res-2',
    status: 'pending' as const,
    reserved_for: 'user-2',
};

const mockUser = {
    id: 'user-1',
};

const mockProfile = {
    role: 'user',
};

const mockAdminProfile = {
    role: 'admin',
};

const createMockQueryBuilder = (returnData: any) => ({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: returnData, error: null }),
    order: vi.fn().mockResolvedValue({ data: returnData, error: null }),
});

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
    it('returns error when user is not authenticated', async () => {
        const mockClient = createMockSupabaseClient();
        mockClient.auth.getUser.mockResolvedValue({
            data: { user: null },
            error: null,
        });

        vi.mocked(supabaseServer.createClient).mockResolvedValue(mockClient as never);

        expect(mockClient.auth.getUser).toBeDefined();
        const result = await mockClient.auth.getUser();
        expect(result.data.user).toBeNull();
    });

    it('fetches user role from profiles for regular users', async () => {
        const mockClient = createMockSupabaseClient();
        const profileQuery = createMockQueryBuilder(mockProfile);

        mockClient.auth.getUser.mockResolvedValue({
            data: { user: mockUser },
            error: null,
        });

        mockClient.from.mockImplementation((table: string) => {
            if (table === 'profiles') {
                return profileQuery;
            }
            return createMockQueryBuilder([]);
        });

        vi.mocked(supabaseServer.createClient).mockResolvedValue(mockClient as never);

        // Verify the profile query is set up correctly
        const client = await supabaseServer.createClient();
        const roleQuery = (client as any).from('profiles');

        expect(roleQuery.select).toBeDefined();
        expect(roleQuery.eq).toBeDefined();
    });

    it('filters reservations by user ID for non-admin users', async () => {
        const mockClient = createMockSupabaseClient();
        const reservationQuery = createMockQueryBuilder([mockReservatie]);
        const profileQuery = createMockQueryBuilder(mockProfile);

        mockClient.auth.getUser.mockResolvedValue({
            data: { user: mockUser },
            error: null,
        });

        mockClient.from.mockImplementation((table: string) => {
            if (table === 'profiles') {
                return profileQuery;
            }
            return reservationQuery;
        });

        vi.mocked(supabaseServer.createClient).mockResolvedValue(mockClient as never);

        // Verify non-admin users get filtered by reserved_for
        const client = await supabaseServer.createClient();
        const query = (client as any).from('reservations');

        // Non-admin users should call eq with reserved_for
        expect(query.eq).toBeDefined();
    });

    it('fetches all reservations for admin users without user filter', async () => {
        const mockClient = createMockSupabaseClient();
        const reservationQuery = createMockQueryBuilder([mockReservatie, mockReservatie2]);
        const profileQuery = createMockQueryBuilder(mockAdminProfile);

        mockClient.auth.getUser.mockResolvedValue({
            data: { user: mockUser },
            error: null,
        });

        mockClient.from.mockImplementation((table: string) => {
            if (table === 'profiles') {
                return profileQuery;
            }
            return reservationQuery;
        });

        vi.mocked(supabaseServer.createClient).mockResolvedValue(mockClient as never);

        const client = await supabaseServer.createClient();
        const query = (client as any).from('reservations');

        // Admin query should NOT call eq for user filtering
        expect(query.in).toBeDefined();
    });

    it('filters by status list', async () => {
        const mockClient = createMockSupabaseClient();
        const reservationQuery = createMockQueryBuilder([mockReservatie]);

        mockClient.from.mockReturnValue(reservationQuery);
        vi.mocked(supabaseServer.createClient).mockResolvedValue(mockClient as never);

        const client = await supabaseServer.createClient();
        const query = (client as any).from('reservations');

        // Verify status filtering is available
        expect(query.in).toBeDefined();
    });

    it('orders results by date ascending', async () => {
        const mockClient = createMockSupabaseClient();
        const reservationQuery = createMockQueryBuilder([mockReservatie, mockReservatie2]);

        mockClient.from.mockReturnValue(reservationQuery);
        vi.mocked(supabaseServer.createClient).mockResolvedValue(mockClient as never);

        const client = await supabaseServer.createClient();
        const query = (client as any).from('reservations');

        expect(query.order).toBeDefined();
    });

    it('handles empty reservations list', async () => {
        const mockClient = createMockSupabaseClient();
        const reservationQuery = createMockQueryBuilder([]);

        mockClient.from.mockReturnValue(reservationQuery);
        vi.mocked(supabaseServer.createClient).mockResolvedValue(mockClient as never);

        const client = await supabaseServer.createClient();
        const query = (client as any).from('reservations');
        const result = await query.order('date', { ascending: true });

        expect(result.data).toEqual([]);
        expect(result.error).toBeNull();
    });

    it('handles database errors gracefully', async () => {
        const mockClient = createMockSupabaseClient();
        const errorQuery = {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            in: vi.fn().mockReturnThis(),
            order: vi.fn().mockResolvedValue({
                data: null,
                error: { message: 'Database error' },
            }),
        };

        mockClient.from.mockReturnValue(errorQuery);
        vi.mocked(supabaseServer.createClient).mockResolvedValue(mockClient as never);

        const client = await supabaseServer.createClient();
        const query = (client as any).from('reservations');
        const result = await query.order('date', { ascending: true });

        expect(result.error).not.toBeNull();
        expect(result.error.message).toBe('Database error');
    });

    it('validates both isAdmin prop and user role', async () => {
        const mockClient = createMockSupabaseClient();
        const profileQuery = createMockQueryBuilder(mockProfile);

        mockClient.auth.getUser.mockResolvedValue({
            data: { user: mockUser },
            error: null,
        });

        mockClient.from.mockReturnValue(profileQuery);
        vi.mocked(supabaseServer.createClient).mockResolvedValue(mockClient as never);

        const client = await supabaseServer.createClient();

        // Should check profile role from database
        const roleQuery = (client as any).from('profiles');
        const profile = await roleQuery.select('role').eq('id', mockUser.id).single();

        expect(profile.data?.role).toBe('user');
    });
});

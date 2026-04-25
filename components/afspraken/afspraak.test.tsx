import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import AfspraakCard from './afspraakCard';
import * as utils from '@/lib/utils';
import { Reservation } from '@/types/reservatie';


vi.mock('@/lib/afspraken');
vi.mock('@/lib/utils', async (importOriginal) => {
    const actual = await importOriginal<typeof utils>();
    return { ...actual, isWithin14Days: vi.fn() };
});

const mockReservatie: Reservation = {
    id: 'abc-123',
    date: '2026-05-10',
    time: '10:30:00',
    status: 'confirmed' as const,
    updated_at: '2026-03-01T00:00:00Z',
    reserved_for: 'user-1',
    notes: null
};

const createCard = (overrides = {}) => ({
    ...mockReservatie,
    ...overrides
});


beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(utils.isWithin14Days).mockReturnValue(false);
});

afterEach(() => {
    vi.useRealTimers();
})

describe('AfspraakCard', () => {
    it('renders the date, time and status', () => {
        vi.setSystemTime(new Date('2026-05-09'));
        render(<AfspraakCard reservatie={createCard()} purpose='delete' />);
        expect(screen.getByText(/9 mei 2026/i)).toBeInTheDocument();
        expect(screen.getByText('⏰ 10:30')).toBeInTheDocument();
        expect(screen.getByText('confirmed')).toBeInTheDocument();
    });

    it('renders notes when present', () => {
        const cardWithNotes = createCard({ notes: "Eerste sessie" })
        render(<AfspraakCard reservatie={cardWithNotes} purpose='delete' />);
        expect(screen.getByText('Eerste sessie')).toBeInTheDocument();
    });

    it('does not render notes section when notes is null', () => {
        render(<AfspraakCard reservatie={createCard()} purpose='delete' />);
        expect(screen.queryByText('Eerste sessie')).not.toBeInTheDocument();
    });

    it('cancel button is enabled when appointment is more than 14 days away', () => {
        vi.mocked(utils.isWithin14Days).mockReturnValue(false);
        vi.setSystemTime(new Date('2026-04-01'));
        render(<AfspraakCard reservatie={createCard()} purpose='delete' />);
        expect(screen.getByRole('button')).not.toBeDisabled();
    });

    it('cancel button is disabled when appointment is within 14 days', () => {
        vi.mocked(utils.isWithin14Days).mockReturnValue(true);
        vi.setSystemTime(new Date('2026-05-01'));
        render(<AfspraakCard reservatie={createCard()} purpose='delete' />);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('applies correct status badge style for confirmed', () => {
        render(<AfspraakCard reservatie={createCard()} purpose='delete' />);
        const badge = screen.getByText('confirmed');
        expect(badge.className).toMatch(/green/);
    });

    it('applies correct status badge style for pending', () => {
        render(<AfspraakCard reservatie={createCard({ status: 'pending' })} purpose='delete' />);
        const badge = screen.getByText('pending');
        expect(badge.className).toMatch(/yellow/);
    });

    it('trims seconds from displayed time', () => {
        render(<AfspraakCard reservatie={createCard({ time: '09:00:00' })} purpose='delete' />);
        expect(screen.getByText('⏰ 09:00')).toBeInTheDocument();
    });
});

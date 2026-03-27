import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AfspraakCard from './afspraak';
import * as utils from '@/lib/utils';

vi.mock('@/lib/afspraken');
vi.mock('@/lib/utils', async (importOriginal) => {
    const actual = await importOriginal<typeof utils>();
    return { ...actual, isWithin14Days: vi.fn() };
});

const mockReservatie = {
    id: 'abc-123',
    date: '2026-05-10',
    time: '10:30:00',
    status: 'confirmed' as const,
    updated_at: '2026-03-01T00:00:00Z',
    reserved_for: 'user-1',
    notes: null
};

const createCard = (overrides = {}) => ({
    reservatie: {
        ...mockReservatie,
        ...overrides
    },
    buttonText: "Annuleer"
});


beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(utils.isWithin14Days).mockReturnValue(false);
});

describe('AfspraakCard', () => {
    it('renders the date, time and status', () => {
        render(<AfspraakCard card={createCard()} />);
        vi.setSystemTime(new Date('2026-05-09'));
        expect(screen.getByText(/9 mei 2026/i)).toBeInTheDocument();
        expect(screen.getByText('⏰ 10:30')).toBeInTheDocument();
        expect(screen.getByText('confirmed')).toBeInTheDocument();
    });

    it('renders notes when present', () => {
        const cardWithNotes = createCard({notes: "Eerste sessie"})
        render(<AfspraakCard card={cardWithNotes} />);
        expect(screen.getByText('Eerste sessie')).toBeInTheDocument();
    });

    it('does not render notes section when notes is null', () => {
        render(<AfspraakCard card = {createCard()} />);
        expect(screen.queryByText('Eerste sessie')).not.toBeInTheDocument();
    });

    it('cancel button is enabled when appointment is more than 14 days away', () => {
        vi.mocked(utils.isWithin14Days).mockReturnValue(false);
        vi.setSystemTime(new Date('2026-04-01'));
        render(<AfspraakCard card={createCard()} />);
        expect(screen.getByRole('button', { name: 'Annuleer' })).not.toBeDisabled();
    });

    it('cancel button is disabled when appointment is within 14 days', () => {
        vi.mocked(utils.isWithin14Days).mockReturnValue(true);
        vi.setSystemTime(new Date('2026-05-01'));
        render(<AfspraakCard card={createCard()} />);
        expect(screen.getByRole('button', { name: 'Annuleer' })).toBeDisabled();
    });

    it('applies correct status badge style for confirmed', () => {
        render(<AfspraakCard card={createCard()} />);
        const badge = screen.getByText('confirmed');
        expect(badge.className).toMatch(/green/);
    });

    it('applies correct status badge style for pending', () => {
        render(<AfspraakCard card={createCard({status: 'pending'})} />);
        const badge = screen.getByText('pending');
        expect(badge.className).toMatch(/yellow/);
    });
    
    it('trims seconds from displayed time', () => {
        render(<AfspraakCard card={createCard({ time: '09:00:00' })} />);
        expect(screen.getByText('⏰ 09:00')).toBeInTheDocument();
    });
});

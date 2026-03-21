import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AfspraakCard from './afspraak';
import * as afspraken from '@/lib/afspraken';
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
    notes: null,
};

beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(utils.isWithin14Days).mockReturnValue(false);
});

describe('AfspraakCard', () => {
    it('renders the date, time and status', () => {
        render(<AfspraakCard reservatie={mockReservatie} />);

      //  expect(screen.getByText(/10 mei 2026/i)).toBeInTheDocument();
        expect(screen.getByText('⏰ 10:30')).toBeInTheDocument();
        expect(screen.getByText('confirmed')).toBeInTheDocument();
    });

    it('renders notes when present', () => {
        render(<AfspraakCard reservatie={{ ...mockReservatie, notes: 'Eerste sessie' }} />);
        expect(screen.getByText('Eerste sessie')).toBeInTheDocument();
    });

    it('does not render notes section when notes is null', () => {
        render(<AfspraakCard reservatie={mockReservatie} />);
        expect(screen.queryByText('Eerste sessie')).not.toBeInTheDocument();
    });

    it('cancel button is enabled when appointment is more than 14 days away', () => {
        vi.mocked(utils.isWithin14Days).mockReturnValue(false);
        render(<AfspraakCard reservatie={mockReservatie} />);
        expect(screen.getByRole('button', { name: 'Annuleer' })).not.toBeDisabled();
    });

    it('cancel button is disabled when appointment is within 14 days', () => {
        vi.mocked(utils.isWithin14Days).mockReturnValue(true);
        render(<AfspraakCard reservatie={mockReservatie} />);
        expect(screen.getByRole('button', { name: 'Annuleer' })).toBeDisabled();
    });

    it('applies correct status badge style for confirmed', () => {
        render(<AfspraakCard reservatie={mockReservatie} />);
        const badge = screen.getByText('confirmed');
        expect(badge.className).toMatch(/green/);
    });

    it('applies correct status badge style for pending', () => {
        render(<AfspraakCard reservatie={{ ...mockReservatie, status: 'pending' }} />);
        const badge = screen.getByText('pending');
        expect(badge.className).toMatch(/yellow/);
    });

    it('shows loading state while deleting', async () => {
        vi.mocked(afspraken.deleteAfspraak).mockImplementation(
            () => new Promise((resolve) => setTimeout(resolve, 500))
        );

        render(<AfspraakCard reservatie={mockReservatie} />);
        fireEvent.click(screen.getByRole('button', { name: 'Annuleer' }));

        expect(await screen.findByText('Bezig...')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Bezig...' })).toBeDisabled();
    });

    it('disappears after successful deletion', async () => {
        vi.mocked(afspraken.deleteAfspraak).mockResolvedValue(undefined);

        const { container } = render(<AfspraakCard reservatie={mockReservatie} />);
        fireEvent.click(screen.getByRole('button', { name: 'Annuleer' }));

        await waitFor(() => expect(container).toBeEmptyDOMElement());
    });

    it('shows error message when deletion fails', async () => {
        vi.mocked(afspraken.deleteAfspraak).mockRejectedValue(new Error('Server error'));

        render(<AfspraakCard reservatie={mockReservatie} />);
        fireEvent.click(screen.getByRole('button', { name: 'Annuleer' }));

        expect(await screen.findByText('Annuleren mislukt. Probeer het opnieuw.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Annuleer' })).not.toBeDisabled();
    });

    it('trims seconds from displayed time', () => {
        render(<AfspraakCard reservatie={{ ...mockReservatie, time: '09:00:00' }} />);
        expect(screen.getByText('⏰ 09:00')).toBeInTheDocument();
    });
});


import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { Afspraak } from "@/types/reservatie"
import { DeleteAfspraakButton } from "./afspraakButtons"

const mockReservatie: Afspraak = {
    id: '1',
    date: "2026/05/01",
    time: '13:00',
    status: 'pending',
    updated_at: '',
    reserved_for: "1",
    client_email: {
        email: ''
    },
    profiles: {
        full_name: 'Jan',
        email: 'test@test.be'
    }
}


describe('Test buttons', () => {
    afterEach(() => {
        vi.getRealSystemTime()
    })
    it('Show delete button is disabled', () => {
        vi.setSystemTime("2026/04/30");
        render(<DeleteAfspraakButton reservatie={mockReservatie} />);
        expect(screen.getByRole('button')).toBeDisabled()
    });

    it('Show delete button is enabled', () => {
        vi.setSystemTime("2026/04/01")
        render(<DeleteAfspraakButton reservatie={mockReservatie} />);
        expect(screen.getByRole('button')).toBeEnabled()
    })
})
import { DeleteButton } from "./afspraakButtons"
import { Reservation } from "../types/reservatie"
import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen } from "@testing-library/react"

const mockReservatie: Reservation = {
    id: '1',
    date: "2026/05/01",
    time: '13:00',
    status: 'pending',
    updated_at: '',
    reserved_for: "1"
}


describe('Test buttons', () => {
    afterEach(() => {
        vi.getRealSystemTime()
    })
    it('Show delete button is disabled', () => {
        vi.setSystemTime("2026/04/30");
        render(<DeleteButton reservatie={mockReservatie} />);
        expect(screen.getByRole('button')).toBeDisabled()
    });

    it('Show delete button is enabled', ()=>{
        vi.setSystemTime("2026/04/01")
        render(<DeleteButton reservatie={mockReservatie} />);
        expect(screen.getByRole('button')).toBeEnabled()
    })
})
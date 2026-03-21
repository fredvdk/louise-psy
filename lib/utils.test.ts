// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { isWithin14Days } from './utils';

function daysFromNow(days: number): Date {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d;
}

describe('isWithin14Days', () => {
    it('returns true for a date in the past', () => {
        expect(isWithin14Days(daysFromNow(-1))).toBe(true);
    });

    it('returns true for today', () => {
        expect(isWithin14Days(new Date())).toBe(true);
    });

    it('returns true for a date exactly 14 days from now', () => {
        expect(isWithin14Days(daysFromNow(14))).toBe(true);
    });

    it('returns true for a date within 14 days', () => {
        expect(isWithin14Days(daysFromNow(7))).toBe(true);
    });

    it('returns false for a date 15 days from now', () => {
        expect(isWithin14Days(daysFromNow(15))).toBe(false);
    });

    it('returns false for a date far in the future', () => {
        expect(isWithin14Days(daysFromNow(365))).toBe(false);
    });
});

'use client'

import { useState, useMemo } from 'react';
import { formatDate } from '@/lib/utils';
import { Afspraak } from '@/types/reservatie';
import { Button } from '../ui/button';
import { ConfirmButton, DeleteAfspraakButton } from './afspraakButtons';
import { ConfirmationModal } from '../ui/confirmation-modal';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { createFreeAfspraakAction, confirmAllPendingAction } from '@/actions/afspraken';


const getStatusClasses = (status: string) => {
    const baseClasses = 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold';

    const statusClasses: Record<string, string> = {
        free: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-900',
        confirmed: 'bg-blue-100 text-blue-900',
    };

    return `${baseClasses} ${statusClasses[status] || 'bg-slate-100 text-slate-700'}`;
};

const AdminAfsprakenLijst = ({ afspraken = [] }: { afspraken?: Afspraak[] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [sortBy, setSortBy] = useState<'date' | 'client' | 'status'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [openAddSlot, setOpenAddSlot] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isConfirmingAll, setIsConfirmingAll] = useState(false);
    const [showConfirmAllModal, setShowConfirmAllModal] = useState(false);

    const filteredAndSorted = useMemo(() => {
        let result = [...afspraken];

        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter((a) =>
                (a.profiles?.full_name || '').toLowerCase().includes(term) ||
                (a.profiles?.email || '').toLowerCase().includes(term) ||
                (a.notes || '').toLowerCase().includes(term)
            );
        }

        // Filter by status
        if (statusFilter) {
            result = result.filter((a) => a.status === statusFilter);
        }

        // Sort
        result.sort((a, b) => {
            let aVal: string | number;
            let bVal: string | number;

            if (sortBy === 'client') {
                aVal = (a.profiles?.full_name || a.profiles?.email || '').toLowerCase();
                bVal = (b.profiles?.full_name || b.profiles?.email || '').toLowerCase();
            } else if (sortBy === 'status') {
                aVal = a.status.toLowerCase();
                bVal = b.status.toLowerCase();
            } else {
                aVal = new Date(a.date).getTime();
                bVal = new Date(b.date).getTime();
            }

            const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return result;
    }, [afspraken, searchTerm, statusFilter, sortBy, sortOrder]);

    const statuses = Array.from(new Set(afspraken.map((a) => a.status))).filter(Boolean);

    const toggleSort = (column: 'date' | 'client' | 'status') => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const handleAddFreeSlot = async () => {
        if (!selectedDate || !selectedTime) {
            setError('Selecteer zowel datum als tijd');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const dateTime = new Date(`${selectedDate}T${selectedTime}`);
            await createFreeAfspraakAction(dateTime);
            setOpenAddSlot(false);
            setSelectedDate('');
            setSelectedTime('');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Kan beschikbare slot niet toevoegen';
            setError(message);
            console.error('Add free slot failed:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmAllPending = async () => {
        setIsConfirmingAll(true);

        try {
            await confirmAllPendingAction();
        } catch (err) {
            console.error('Confirm all failed:', err);
        } finally {
            setIsConfirmingAll(false);
        }
    };

    return (
        <section className="p-4 text-gray-900">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                    <Button onClick={() => setShowConfirmAllModal(true)} disabled={isConfirmingAll}>
                        {isConfirmingAll ? 'Bevestigen...' : 'Bevestig alle pending afspraken'}
                    </Button>
                    <Button onClick={() => setOpenAddSlot(true)}>
                        Free slots toevoegen
                    </Button>
                </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="Zoeken op client of hulpvraag..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 min-w-[200px] px-3 py-2 border border-slate-200 rounded text-sm"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-slate-200 rounded text-sm bg-white"
                >
                    <option value="">Alle statussen</option>
                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>

            <div className="overflow-x-auto bg-white border border-slate-200 rounded-lg">
                <table className="w-full border-collapse min-w-[760px]">
                    <thead>
                        <tr className="bg-slate-50 text-left border-b border-slate-200">
                            <th
                                className="p-4 text-xs text-slate-700 cursor-pointer select-none"
                                onClick={() => toggleSort('client')}
                            >
                                Client {sortBy === 'client' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th
                                className="p-4 text-xs text-slate-700 cursor-pointer select-none"
                                onClick={() => toggleSort('date')}
                            >
                                Datum / Tijd {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th
                                className="p-4 text-xs text-slate-700 cursor-pointer select-none"
                                onClick={() => toggleSort('status')}
                            >
                                Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="p-4 text-xs text-slate-700">Hulpvraag</th>
                            <th className="p-4 text-xs text-slate-700">Acties</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSorted.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-6 text-center text-slate-500">
                                    Geen afspraken gevonden.
                                </td>
                            </tr>
                        ) : (
                            filteredAndSorted.map((afspraak) => (
                                <tr key={afspraak.id} className="border-b border-slate-200">
                                    <td className="p-4 align-top font-semibold">{afspraak.profiles?.full_name || afspraak.profiles?.email || '-'}</td>
                                    <td className="p-4 align-top">
                                        <div>{formatDate(new Date(afspraak.date))}</div>
                                        <div className="mt-1 text-slate-500">{afspraak.time.slice(0, -3)}</div>
                                    </td>
                                    <td className="p-4 align-top">
                                        <span className={getStatusClasses(afspraak.status)}>
                                            {afspraak.status}
                                        </span>
                                    </td>
                                    <td className="p-4 align-top text-slate-700">{afspraak.notes || '-'}</td>
                                    <td className="p-4 align-top">
                                        <DeleteAfspraakButton afspraak={afspraak} admin={true} />
                                        {afspraak.status == 'pending' &&
                                            <ConfirmButton afspraak={afspraak} />}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <ConfirmationModal
                open={showConfirmAllModal}
                onOpenChange={setShowConfirmAllModal}
                title="Alle afspraken bevestigen"
                description="Weet u zeker dat u alle openstaande afspraken wilt bevestigen? Deze actie kan niet ongedaan worden gemaakt."
                confirmText="Alles bevestigen"
                cancelText="Annuleren"
                onConfirm={handleConfirmAllPending}
                isLoading={isConfirmingAll}
            />

            <Dialog open={openAddSlot} onOpenChange={setOpenAddSlot}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Free slot toevoegen</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Datum</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-3 py-2 border border-slate-200 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Tijd</label>
                            <input
                                type="time"
                                value={selectedTime}
                                step={900}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpenAddSlot(false)}
                        >
                            Annuleren
                        </Button>
                        <Button
                            onClick={handleAddFreeSlot}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Toevoegen...' : 'Toevoegen'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default AdminAfsprakenLijst;

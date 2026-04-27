'use client'

import { useState, useMemo } from 'react';
import { formatDate } from '@/lib/utils';
import { Afspraak } from '@/types/reservatie';
import { Button } from '../ui/button';
import { ConfirmButton, DeleteButton } from './afspraakButtons';


const getStatusStyles = (status: string) => {
    const baseStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.35rem 0.75rem',
        borderRadius: '999px',
        fontSize: '0.85rem',
        fontWeight: 600,
    };

    const statusStyles: Record<string, Record<string, string>> = {
        free: { backgroundColor: '#dcfce7', color: '#166534' },
        pending: { backgroundColor: '#fef3c7', color: '#92400e' },
        confirmed: { backgroundColor: '#dbeafe', color: '#0c4a6e' },
    };

    return { ...baseStyles, ...(statusStyles[status] || { backgroundColor: '#f1f5f9', color: '#334155' }) };
};

const AdminAfsprakenLijst = ({ afspraken = [] }: { afspraken?: Afspraak[] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [sortBy, setSortBy] = useState<'date' | 'client' | 'status'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const filteredAndSorted = useMemo(() => {
        let result = [...afspraken];

        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter((a) =>
                (a.profiles?.full_name || '').toLowerCase().includes(term) ||
                (a.client_email?.email || '').toLowerCase().includes(term) ||
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
                aVal = (a.profiles?.full_name || a.client_email?.email || '').toLowerCase();
                bVal = (b.profiles?.full_name || b.client_email?.email || '').toLowerCase();
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

    return (
        <section style={{ padding: '1rem', fontFamily: 'Inter, system-ui, sans-serif', color: '#111' }}>
            <div
                style={{
                    marginBottom: '1rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                }}
            >
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button>
                        Bevestig alle pending afspraken
                    </Button>
                    <Button>
                        Free slots toevoegen
                    </Button>
                </div>
            </div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder="Zoeken op client of hulpvraag..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        flex: '1',
                        minWidth: '200px',
                        padding: '0.5rem 0.75rem',
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                    }}
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{
                        padding: '0.5rem 0.75rem',
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        backgroundColor: '#fff',
                    }}
                >
                    <option value="">Alle statussen</option>
                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ overflowX: 'auto', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                            <th
                                style={{ padding: '1rem', fontSize: '0.85rem', color: '#334155', cursor: 'pointer', userSelect: 'none' }}
                                onClick={() => toggleSort('client')}
                            >
                                Client {sortBy === 'client' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th
                                style={{ padding: '1rem', fontSize: '0.85rem', color: '#334155', cursor: 'pointer', userSelect: 'none' }}
                                onClick={() => toggleSort('date')}
                            >
                                Datum / Tijd {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th
                                style={{ padding: '1rem', fontSize: '0.85rem', color: '#334155', cursor: 'pointer', userSelect: 'none' }}
                                onClick={() => toggleSort('status')}
                            >
                                Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#334155' }}>Hulpvraag</th>
                            <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#334155' }}>Acties</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSorted.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>
                                    Geen afspraken gevonden.
                                </td>
                            </tr>
                        ) : (
                            filteredAndSorted.map((afspraak) => (
                                <tr key={afspraak.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: 600 }}>{afspraak.profiles?.full_name || afspraak.client_email?.email || '-'}</td>
                                    <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                                        <div>{formatDate(new Date(afspraak.date))}</div>
                                        <div style={{ marginTop: '0.25rem', color: '#64748b' }}>{afspraak.time.slice(0,-3)}</div>
                                    </td>
                                    <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                                        <span style={getStatusStyles(afspraak.status)}>
                                            {afspraak.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', verticalAlign: 'top', color: '#334155' }}>{afspraak.notes || '-'}</td>
                                    <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                                        <DeleteButton reservatie={afspraak} admin= {true} />
                                        {afspraak.status == 'pending' && 
                                        <ConfirmButton reservatie={afspraak} />}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AdminAfsprakenLijst;

'use client'

import { formatDate } from '@/lib/utils';
import { Afspraak } from '@/types/reservatie';
import { Button } from '../ui/button';


const AdminAfsprakenLijst = ({afspraken = []}: {afspraken?: Afspraak[]}) => {
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
                <Button>
                    Bevestig alle pending afspraken
                </Button>
                <Button>
                    Free slots toevoegen
                </Button>
            </div>

            <div style={{ overflowX: 'auto', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                            <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#334155' }}>Client</th>
                            <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#334155' }}>Datum / Tijd</th>
                            <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#334155' }}>Status</th>
                            <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#334155' }}>Opmerkingen</th>
                            <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#334155' }}>Acties</th>
                        </tr>
                    </thead>
                    <tbody>
                        {afspraken.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>
                                    Geen afspraken gevonden.
                                </td>
                            </tr>
                        ) : (
                            afspraken.map((afspraak) => (
                                <tr key={afspraak.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: 600 }}>Klant</td>
                                    <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                                        <div>{formatDate(new Date(afspraak.date))}</div>
                                        <div style={{ marginTop: '0.25rem', color: '#64748b' }}>{afspraak.time}</div>
                                    </td>
                                    <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                                        <span
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.35rem',
                                                padding: '0.35rem 0.75rem',
                                                borderRadius: '999px',
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {afspraak.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', verticalAlign: 'top', color: '#334155' }}>{afspraak.notes || '-'}</td>
                                    <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                                        <button
                                            type="button"
                                            onClick={() => (console.log("clicked"))}
                                            style={{
                                                padding: '0.55rem 0.9rem',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '0.65rem',
                                                backgroundColor: '#fff',
                                                color: '#111827',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Verwijder
                                        </button>
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

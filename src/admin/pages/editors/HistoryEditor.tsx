// src/admin/pages/editors/HistoryEditor.tsx
import { useState, useEffect } from 'react';
import { showToast } from '../../components/Toast';
import ConfirmModal from '../../components/ConfirmModal';

interface TimelineEntry { year: string; title: string; description: string; significance?: string; }
interface Quote { text: string; author: string; designation: string; }
interface Highlight { label: string; value: string; }

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (section: string, data: any) => void;
}

export default function HistoryEditor({ data, onSave }: Props) {
  const [overview, setOverview] = useState('');
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [deleteIdx, setDeleteIdx] = useState<{ section: string; idx: number } | null>(null);

  useEffect(() => {
    if (data.history) {
      setOverview(data.history.overview || '');
      setParagraphs(data.history.paragraphs || []);
      setTimeline(data.history.timeline || []);
      setQuotes(data.history.quotes || []);
      setHighlights(data.history.highlights || []);
    }
  }, [data]);

  const handleSave = () => {
    onSave('history', { overview, paragraphs, timeline, quotes, highlights });
    showToast('History saved', 'success');
  };

  // Paragraph helpers
  const updateParagraph = (idx: number, val: string) => {
    const next = [...paragraphs]; next[idx] = val; setParagraphs(next);
  };
  const addParagraph = () => setParagraphs([...paragraphs, '']);
  const removeParagraph = (idx: number) => setParagraphs(paragraphs.filter((_, i) => i !== idx));

  // Timeline helpers
  const updateTimeline = (idx: number, field: keyof TimelineEntry, val: string) => {
    const next = [...timeline]; next[idx] = { ...next[idx], [field]: val }; setTimeline(next);
  };
  const addTimeline = () => setTimeline([...timeline, { year: '', title: '', description: '', significance: '' }]);
  const removeTimeline = (idx: number) => setTimeline(timeline.filter((_, i) => i !== idx));

  // Quote helpers
  const updateQuote = (idx: number, field: keyof Quote, val: string) => {
    const next = [...quotes]; next[idx] = { ...next[idx], [field]: val }; setQuotes(next);
  };
  const addQuote = () => setQuotes([...quotes, { text: '', author: '', designation: '' }]);
  const removeQuote = (idx: number) => setQuotes(quotes.filter((_, i) => i !== idx));

  // Highlight helpers
  const updateHighlight = (idx: number, field: keyof Highlight, val: string) => {
    const next = [...highlights]; next[idx] = { ...next[idx], [field]: val }; setHighlights(next);
  };
  const addHighlight = () => setHighlights([...highlights, { label: '', value: '' }]);
  const removeHighlight = (idx: number) => setHighlights(highlights.filter((_, i) => i !== idx));

  const confirmDelete = () => {
    if (!deleteIdx) return;
    const { section, idx } = deleteIdx;
    if (section === 'paragraph') removeParagraph(idx);
    else if (section === 'timeline') removeTimeline(idx);
    else if (section === 'quote') removeQuote(idx);
    else if (section === 'highlight') removeHighlight(idx);
    setDeleteIdx(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', fontWeight: 700, color: '#d4a017' }}>
          History & Heritage
        </h3>
        <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={handleSave}>💾 Save All</button>
      </div>

      {/* Overview */}
      <div className="admin-card" style={{ marginBottom: '1.25rem' }}>
        <label className="admin-label">Overview</label>
        <textarea className="admin-textarea" style={{ minHeight: 120 }} value={overview} onChange={e => setOverview(e.target.value)} placeholder="Main overview paragraph..." />
      </div>

      {/* Paragraphs */}
      <div className="admin-card" style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <label className="admin-label" style={{ marginBottom: 0 }}>History Paragraphs ({paragraphs.length})</label>
          <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={addParagraph}>+ Add</button>
        </div>
        {paragraphs.map((p, i) => (
          <div key={i} className="admin-list-item">
            <div className="admin-list-item-header">
              <span className="admin-list-item-title">Paragraph {i + 1}</span>
              <button className="admin-btn admin-btn-danger admin-btn-xs" onClick={() => setDeleteIdx({ section: 'paragraph', idx: i })}>✕</button>
            </div>
            <textarea className="admin-textarea" value={p} onChange={e => updateParagraph(i, e.target.value)} style={{ minHeight: 80 }} />
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="admin-card" style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <label className="admin-label" style={{ marginBottom: 0 }}>Timeline Entries ({timeline.length})</label>
          <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={addTimeline}>+ Add</button>
        </div>
        {timeline.map((t, i) => (
          <div key={i} className="admin-list-item">
            <div className="admin-list-item-header">
              <span className="admin-list-item-title">{t.year || 'New Entry'} — {t.title || 'Untitled'}</span>
              <button className="admin-btn admin-btn-danger admin-btn-xs" onClick={() => setDeleteIdx({ section: 'timeline', idx: i })}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input className="admin-input" value={t.year} onChange={e => updateTimeline(i, 'year', e.target.value)} placeholder="Year" />
              <input className="admin-input" value={t.title} onChange={e => updateTimeline(i, 'title', e.target.value)} placeholder="Title" />
            </div>
            <textarea className="admin-textarea" value={t.description} onChange={e => updateTimeline(i, 'description', e.target.value)} placeholder="Description" style={{ minHeight: 60 }} />
            <input className="admin-input" value={t.significance || ''} onChange={e => updateTimeline(i, 'significance', e.target.value)} placeholder="Significance (optional)" style={{ marginTop: '0.5rem' }} />
          </div>
        ))}
      </div>

      {/* Quotes */}
      <div className="admin-card" style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <label className="admin-label" style={{ marginBottom: 0 }}>Quotes ({quotes.length})</label>
          <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={addQuote}>+ Add</button>
        </div>
        {quotes.map((q, i) => (
          <div key={i} className="admin-list-item">
            <div className="admin-list-item-header">
              <span className="admin-list-item-title">{q.author || 'New Quote'}</span>
              <button className="admin-btn admin-btn-danger admin-btn-xs" onClick={() => setDeleteIdx({ section: 'quote', idx: i })}>✕</button>
            </div>
            <textarea className="admin-textarea" value={q.text} onChange={e => updateQuote(i, 'text', e.target.value)} placeholder="Quote text" style={{ minHeight: 60 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input className="admin-input" value={q.author} onChange={e => updateQuote(i, 'author', e.target.value)} placeholder="Author" />
              <input className="admin-input" value={q.designation} onChange={e => updateQuote(i, 'designation', e.target.value)} placeholder="Designation" />
            </div>
          </div>
        ))}
      </div>

      {/* Highlights */}
      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <label className="admin-label" style={{ marginBottom: 0 }}>Stat Highlights ({highlights.length})</label>
          <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={addHighlight}>+ Add</button>
        </div>
        {highlights.map((h, i) => (
          <div key={i} className="admin-list-item">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px auto', gap: '0.5rem', alignItems: 'center' }}>
              <input className="admin-input" value={h.label} onChange={e => updateHighlight(i, 'label', e.target.value)} placeholder="Label (e.g., Battle Honours)" />
              <input className="admin-input" value={h.value} onChange={e => updateHighlight(i, 'value', e.target.value)} placeholder="Value" />
              <button className="admin-btn admin-btn-danger admin-btn-xs" onClick={() => setDeleteIdx({ section: 'highlight', idx: i })}>✕</button>
            </div>
          </div>
        ))}
      </div>

      {deleteIdx && (
        <ConfirmModal
          title="Delete Item"
          message="Are you sure you want to remove this item?"
          confirmLabel="Delete"
          confirmDanger
          onConfirm={confirmDelete}
          onCancel={() => setDeleteIdx(null)}
        />
      )}
    </div>
  );
}

import React from 'react';

interface SectionDotNavProps {
  active: string;
  sections: { id: string; label: string }[];
}

const SectionDotNav: React.FC<SectionDotNavProps> = ({ active, sections }) => (
  <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3" aria-label="Section navigation">
    {sections.map((d) => {
      const isActive = active === d.id;
      return (
        <a
          key={d.id}
          href={`#${d.id}`}
          className="group flex items-center gap-3 justify-end"
          title={d.label}
        >
          <span
            className="text-xs font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: 'var(--forest)' }}
          >
            {d.label}
          </span>
          <span
            className="block w-2 h-2 rounded-full transition-all"
            style={{
              background: isActive ? 'var(--terracotta)' : 'var(--line-strong)',
              transform: isActive ? 'scale(1.5)' : 'scale(1)',
            }}
          />
        </a>
      );
    })}
  </div>
);

export default SectionDotNav;

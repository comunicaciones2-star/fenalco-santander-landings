'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

export interface ProgramTab {
  readonly id: string;
  readonly label: string;
  readonly panel: ReactNode;
}

interface ProgramTabsProps {
  readonly tabs: readonly ProgramTab[];
  readonly className?: string;
}

export function ProgramTabs({ tabs, className = '' }: ProgramTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    const nextIndex = (index + tabs.length) % tabs.length;
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      focusTab(activeIndex + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusTab(activeIndex - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusTab(tabs.length - 1);
    }
  };

  return (
    <div className={className}>
      <div role="tablist" className="flex flex-wrap gap-3">
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={handleKeyDown}
              className={`rounded-full px-5 py-2 font-display text-sm font-semibold transition-colors ${
                isActive ? 'bg-lilac-400 text-navy-900' : 'border border-current/30'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== activeIndex}
          className="mt-8"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}

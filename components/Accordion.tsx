'use client';

import { useId, useState, type KeyboardEvent, type ReactNode } from 'react';

export interface AccordionItem {
  readonly id: string;
  readonly trigger: ReactNode;
  readonly content: ReactNode;
}

interface AccordionProps {
  readonly items: readonly AccordionItem[];
  readonly defaultOpenId?: string;
  readonly className?: string;
}

export function Accordion({ items, defaultOpenId, className = '' }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? items[0]?.id ?? null);
  const baseId = useId();

  const focusTrigger = (index: number) => {
    const el = document.getElementById(`${baseId}-trigger-${index}`);
    el?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusTrigger((index + 1) % items.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusTrigger((index - 1 + items.length) % items.length);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusTrigger(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusTrigger(items.length - 1);
    }
  };

  return (
    <div className={className}>
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.id} className="border-b border-current/10">
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-display font-semibold"
              >
                {item.trigger}
                <span aria-hidden="true" className="shrink-0 text-lilac-400">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="pb-6"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
